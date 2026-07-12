/**
 * Caching utility for AI tools to optimize performance
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export interface CacheConfig {
  maxSize?: number; // Maximum cache size in items
  ttl?: number; // Default time to live in milliseconds
}

class AICache<T = any> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private config: Required<CacheConfig>;

  constructor(config: CacheConfig = {}) {
    this.config = {
      maxSize: config.maxSize || 100,
      ttl: config.ttl || 5 * 60 * 1000, // 5 minutes default
    };
  }

  /**
   * Generate cache key from parameters
   */
  private generateKey(params: Record<string, any>): string {
    return JSON.stringify(params);
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry<T>): boolean {
    const age = Date.now() - entry.timestamp;
    return age < entry.ttl;
  }

  /**
   * Clean expired entries
   */
  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (!this.isValid(entry)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get value from cache
   */
  get(params: Record<string, any>): T | null {
    this.cleanExpired();
    const key = this.generateKey(params);
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (!this.isValid(entry)) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set value in cache
   */
  set(params: Record<string, any>, data: T, ttl?: number): void {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.config.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    const key = this.generateKey(params);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.ttl,
    });
  }

  /**
   * Clear specific cache entry
   */
  delete(params: Record<string, any>): void {
    const key = this.generateKey(params);
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    this.cleanExpired();
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      percentage: (this.cache.size / this.config.maxSize) * 100,
    };
  }
}

// Global cache instances
const translationCache = new AICache({ maxSize: 50, ttl: 30 * 60 * 1000 }); // 30 minutes
const summarizeCache = new AICache({ maxSize: 50, ttl: 30 * 60 * 1000 });
const researchCache = new AICache({ maxSize: 50, ttl: 30 * 60 * 1000 });
const analyzeCache = new AICache({ maxSize: 50, ttl: 30 * 60 * 1000 });

/**
 * Get or create cached value
 */
export async function getCachedResult<T>(
  cache: AICache,
  params: Record<string, any>,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check cache first
  const cached = cache.get(params);
  if (cached !== null) {
    return cached;
  }

  // Fetch and cache
  const result = await fetcher();
  cache.set(params, result, ttl);
  return result;
}

/**
 * Translation cache
 */
export const translationCacheService = {
  get: (fileName: string, targetLanguage: string) =>
    translationCache.get({ fileName, targetLanguage }),
  set: (fileName: string, targetLanguage: string, result: any) =>
    translationCache.set({ fileName, targetLanguage }, result),
  clear: () => translationCache.clear(),
  getStats: () => translationCache.getStats(),
};

/**
 * Summarize cache
 */
export const summarizeCacheService = {
  get: (fileName: string, summaryLength: string) =>
    summarizeCache.get({ fileName, summaryLength }),
  set: (fileName: string, summaryLength: string, result: any) =>
    summarizeCache.set({ fileName, summaryLength }, result),
  clear: () => summarizeCache.clear(),
  getStats: () => summarizeCache.getStats(),
};

/**
 * Research cache
 */
export const researchCacheService = {
  get: (fileName: string, analysisType: string) =>
    researchCache.get({ fileName, analysisType }),
  set: (fileName: string, analysisType: string, result: any) =>
    researchCache.set({ fileName, analysisType }, result),
  clear: () => researchCache.clear(),
  getStats: () => researchCache.getStats(),
};

/**
 * Analyze cache
 */
export const analyzeCacheService = {
  get: (fileName: string, tone: string) => analyzeCache.get({ fileName, tone }),
  set: (fileName: string, tone: string, result: any) =>
    analyzeCache.set({ fileName, tone }, result),
  clear: () => analyzeCache.clear(),
  getStats: () => analyzeCache.getStats(),
};

/**
 * Clear all caches
 */
export function clearAllCaches(): void {
  translationCache.clear();
  summarizeCache.clear();
  researchCache.clear();
  analyzeCache.clear();
}

/**
 * Get all cache statistics
 */
export function getAllCacheStats() {
  return {
    translation: translationCacheService.getStats(),
    summarize: summarizeCacheService.getStats(),
    research: researchCacheService.getStats(),
    analyze: analyzeCacheService.getStats(),
  };
}
