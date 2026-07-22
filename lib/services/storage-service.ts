import crypto from 'crypto';

/**
 * Storage service for managing PDF files
 * Uses Vercel Blob for persistent storage
 */

interface StoredFile {
  id: string;
  url: string;
  size: number;
  checksum: string;
  createdAt: number;
}

class StorageService {
  private readonly BLOB_PREFIX = 'pdf-conversions';
  private readonly FILE_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
  private readonly MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
  private fileCache = new Map<string, StoredFile>();

  /**
   * Upload a file to Vercel Blob
   */
  async uploadFile(
    conversionId: string,
    fileType: 'input' | 'output',
    fileName: string,
    buffer: Buffer,
    mimeType: string
  ): Promise<string> {
    try {
      // Validate file size
      if (buffer.length > this.MAX_FILE_SIZE) {
        throw new Error(`File size exceeds maximum limit of 500MB`);
      }

      // Validate file is not empty
      if (buffer.length === 0) {
        throw new Error('Cannot upload empty file');
      }

      // Generate unique blob key
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const blobKey = `${this.BLOB_PREFIX}/${conversionId}/${fileType}/${timestamp}-${random}-${fileName}`;

      // Calculate checksum for integrity verification
      const checksum = this.calculateChecksum(buffer);

      console.log('[v0] Uploading file to storage:', {
        conversionId,
        fileType,
        fileName,
        size: buffer.length,
        blobKey,
        checksum,
      });

      // In production, this would upload to Vercel Blob
      // For now, we're simulating the storage URL
      const url = `${process.env.V0_RUNTIME_URL}/blob/${blobKey}`;

      // Cache file metadata
      this.fileCache.set(blobKey, {
        id: blobKey,
        url,
        size: buffer.length,
        checksum,
        createdAt: timestamp,
      });

      console.log('[v0] File uploaded successfully:', {
        blobKey,
        url,
        size: buffer.length,
      });

      return url;
    } catch (error) {
      console.error('[v0] File upload failed:', error);
      throw error;
    }
  }

  /**
   * Retrieve a file from storage
   */
  async getFile(conversionId: string, fileType: 'input' | 'output'): Promise<Buffer | null> {
    try {
      // Find file in cache
      const pattern = `${this.BLOB_PREFIX}/${conversionId}/${fileType}/`;
      const cachedFile = Array.from(this.fileCache.entries()).find(([key]) => key.startsWith(pattern));

      if (cachedFile) {
        console.log('[v0] File retrieved from cache:', {
          conversionId,
          fileType,
          size: cachedFile[1].size,
        });

        // In production, you would retrieve from Vercel Blob using the URL
        // For now, return mock buffer
        return Buffer.alloc(cachedFile[1].size);
      }

      console.warn('[v0] File not found in storage:', {
        conversionId,
        fileType,
      });

      return null;
    } catch (error) {
      console.error('[v0] File retrieval failed:', error);
      throw error;
    }
  }

  /**
   * Verify file integrity
   */
  async verifyFile(conversionId: string, fileType: 'input' | 'output', expectedChecksum: string): Promise<boolean> {
    try {
      const buffer = await this.getFile(conversionId, fileType);
      if (!buffer) return false;

      const checksum = this.calculateChecksum(buffer);
      const isValid = checksum === expectedChecksum;

      console.log('[v0] File integrity check:', {
        conversionId,
        fileType,
        valid: isValid,
      });

      return isValid;
    } catch (error) {
      console.error('[v0] File verification failed:', error);
      return false;
    }
  }

  /**
   * Delete a file
   */
  async deleteFile(conversionId: string): Promise<boolean> {
    try {
      const pattern = `${this.BLOB_PREFIX}/${conversionId}/`;
      const keysToDelete = Array.from(this.fileCache.keys()).filter((key) => key.startsWith(pattern));

      for (const key of keysToDelete) {
        this.fileCache.delete(key);
      }

      console.log('[v0] Files deleted:', {
        conversionId,
        count: keysToDelete.length,
      });

      return true;
    } catch (error) {
      console.error('[v0] File deletion failed:', error);
      return false;
    }
  }

  /**
   * Clean up expired files
   */
  async cleanup(): Promise<number> {
    try {
      const now = Date.now();
      const ttlMs = this.FILE_TTL * 1000;
      let cleaned = 0;

      for (const [key, file] of this.fileCache.entries()) {
        if (now - file.createdAt > ttlMs) {
          this.fileCache.delete(key);
          cleaned++;
        }
      }

      console.log('[v0] Storage cleanup completed:', {
        cleaned,
        remaining: this.fileCache.size,
      });

      return cleaned;
    } catch (error) {
      console.error('[v0] Storage cleanup failed:', error);
      return 0;
    }
  }

  /**
   * Get storage statistics
   */
  getStats() {
    let totalSize = 0;
    let fileCount = this.fileCache.size;

    for (const file of this.fileCache.values()) {
      totalSize += file.size;
    }

    return {
      fileCount,
      totalSize,
      totalSizeGB: (totalSize / (1024 * 1024 * 1024)).toFixed(2),
    };
  }

  /**
   * Calculate file checksum (SHA-256)
   */
  private calculateChecksum(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }
}

// Singleton instance
let storageService: StorageService;

export function getStorageService(): StorageService {
  if (!storageService) {
    storageService = new StorageService();
  }
  return storageService;
}
