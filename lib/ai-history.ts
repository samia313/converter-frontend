// Local storage keys
const HISTORY_KEY = 'ai-tools-history';
const MAX_HISTORY_ITEMS = 50;

export interface AIToolHistory {
  id: string;
  toolId: string;
  toolName: string;
  timestamp: number;
  fileName?: string;
  fileSize?: number;
  query?: string;
  summary?: string;
  duration: number; // in seconds
  status: 'success' | 'error';
  error?: string;
}

/**
 * Get all history items
 */
export function getHistory(): AIToolHistory[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
}

/**
 * Add history item
 */
export function addHistoryItem(item: Omit<AIToolHistory, 'id'>): AIToolHistory {
  const newItem: AIToolHistory = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  const history = getHistory();
  const updated = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to add history item:', error);
  }

  return newItem;
}

/**
 * Get history items for specific tool
 */
export function getToolHistory(toolId: string): AIToolHistory[] {
  return getHistory().filter((item) => item.toolId === toolId);
}

/**
 * Get recent history items
 */
export function getRecentHistory(limit: number = 10): AIToolHistory[] {
  return getHistory().slice(0, limit);
}

/**
 * Clear specific history item
 */
export function clearHistoryItem(id: string): void {
  const history = getHistory();
  const updated = history.filter((item) => item.id !== id);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to clear history item:', error);
  }
}

/**
 * Clear all history
 */
export function clearAllHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear all history:', error);
  }
}

/**
 * Get history statistics
 */
export function getHistoryStats() {
  const history = getHistory();

  if (history.length === 0) {
    return {
      totalItems: 0,
      successfulItems: 0,
      failedItems: 0,
      averageDuration: 0,
      lastUsed: null,
    };
  }

  const successful = history.filter((item) => item.status === 'success').length;
  const failed = history.filter((item) => item.status === 'error').length;
  const totalDuration = history.reduce((sum, item) => sum + item.duration, 0);

  return {
    totalItems: history.length,
    successfulItems: successful,
    failedItems: failed,
    averageDuration: totalDuration / history.length,
    lastUsed: history[0]?.timestamp || null,
  };
}

/**
 * Export history as JSON
 */
export function exportHistory(): string {
  const history = getHistory();
  return JSON.stringify(history, null, 2);
}

/**
 * Export history as CSV
 */
export function exportHistoryAsCSV(): string {
  const history = getHistory();
  
  const headers = ['Tool', 'File Name', 'File Size (MB)', 'Status', 'Duration (s)', 'Date'];
  const rows = history.map((item) => [
    item.toolName,
    item.fileName || 'N/A',
    item.fileSize ? (item.fileSize / 1024 / 1024).toFixed(2) : 'N/A',
    item.status,
    item.duration.toFixed(2),
    new Date(item.timestamp).toLocaleString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  
  return csv;
}

/**
 * Download history as file
 */
export function downloadHistory(format: 'json' | 'csv' = 'json'): void {
  const content = format === 'json' ? exportHistory() : exportHistoryAsCSV();
  const filename = `ai-tools-history.${format}`;
  const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
