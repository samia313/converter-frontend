/**
 * File storage service.
 *
 * IMPORTANT: This application does not currently have a persistent storage
 * provider wired into this service. Never fabricate a URL or return a zeroed
 * buffer: either would make uploads appear successful while losing file bytes.
 *
 * Replace this fail-closed implementation with a configured persistent
 * provider (for example, Vercel Blob or the conversion worker's storage
 * pipeline) before enabling routes that depend on it.
 */

export type StoredFileType = 'input' | 'output';

class StorageService {
  private readonly MAX_FILE_SIZE = 500 * 1024 * 1024;

  async uploadFile(
    _conversionId: string,
    _fileType: StoredFileType,
    _fileName: string,
    buffer: Buffer,
    _mimeType: string
  ): Promise<string> {
    if (buffer.length === 0) {
      throw new Error('Cannot upload an empty file');
    }

    if (buffer.length > this.MAX_FILE_SIZE) {
      throw new Error('File size exceeds the maximum limit of 500MB');
    }

    // Fail closed until a real persistent storage provider is configured.
    throw new Error('Persistent file storage is not configured');
  }

  async getFile(
    _conversionId: string,
    _fileType: StoredFileType
  ): Promise<Buffer | null> {
    // Never return fabricated bytes for a file that was not retrieved.
    return null;
  }

  async verifyFile(
    _conversionId: string,
    _fileType: StoredFileType,
    _expectedChecksum: string
  ): Promise<boolean> {
    // Integrity cannot be verified without retrieving the original bytes.
    return false;
  }

  async deleteFile(_conversionId: string): Promise<boolean> {
    // No persistent provider is configured, so no deletion can be confirmed.
    return false;
  }

  async cleanup(): Promise<number> {
    // No persistent provider is configured, so no cleanup can be confirmed.
    return 0;
  }

  getStats() {
    return {
      fileCount: 0,
      totalSize: 0,
      totalSizeGB: '0.00',
      configured: false,
    };
  }
}

let storageService: StorageService | undefined;

export function getStorageService(): StorageService {
  if (!storageService) {
    storageService = new StorageService();
  }
  return storageService;
}
