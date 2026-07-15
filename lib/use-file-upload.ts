import { useState, useCallback } from 'react';

export interface UploadProgress {
  isLoading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
  fileName: string;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  onSuccess?: (data: Blob) => void;
  onError?: (error: string) => void;
  maxRetries?: number;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 60000; // 60 seconds
const DEFAULT_RETRIES = 3;

export function useFileUpload(apiEndpoint: string) {
  const [state, setState] = useState<UploadProgress>({
    isLoading: false,
    progress: 0,
    error: null,
    success: false,
    fileName: '',
  });

  const updateState = useCallback((updates: Partial<UploadProgress>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const upload = useCallback(
    async (files: FileList | File[], options: UploadOptions = {}) => {
      const {
        onProgress,
        onSuccess,
        onError,
        maxRetries = DEFAULT_RETRIES,
        timeout = DEFAULT_TIMEOUT,
      } = options;

      const fileArray = Array.from(files);

      if (fileArray.length === 0) {
        const error = 'No files selected';
        updateState({ error, success: false });
        onError?.(error);
        return;
      }

      // Validate files
      for (const file of fileArray) {
        if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
          const error = `"${file.name}" is not a PDF file`;
          updateState({ error, success: false });
          onError?.(error);
          return;
        }

        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
          const error = `"${file.name}" is ${(file.size / 1024 / 1024).toFixed(2)}MB - limit is 100MB`;
          updateState({ error, success: false });
          onError?.(error);
          return;
        }
      }

      updateState({
        isLoading: true,
        error: null,
        success: false,
        fileName: fileArray[0].name,
        progress: 0,
      });

      onProgress?.({
        isLoading: true,
        progress: 0,
        error: null,
        success: false,
        fileName: fileArray[0].name,
      });

      let lastError = '';
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const formData = new FormData();
          fileArray.forEach((file) => {
            if (fileArray.length > 1) {
              formData.append('files', file);
            } else {
              formData.append('file', file);
            }
          });

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);

          const progress = Math.min(10 + attempt * 20, 70);
          updateState({ progress });
          onProgress?.({
            isLoading: true,
            progress,
            error: null,
            success: false,
            fileName: fileArray[0].name,
          });

          const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
          }

          const blob = await response.blob();

          updateState({
            isLoading: false,
            progress: 100,
            error: null,
            success: true,
            fileName: fileArray[0].name,
          });

          onProgress?.({
            isLoading: false,
            progress: 100,
            error: null,
            success: true,
            fileName: fileArray[0].name,
          });

          onSuccess?.(blob);
          return blob;
        } catch (error) {
          lastError = error instanceof Error ? error.message : 'Upload failed';

          if (attempt < maxRetries) {
            const waitTime = Math.min(1000 * Math.pow(1.5, attempt - 1), 5000);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            const retryProgress = 10 + attempt * 20;
            updateState({ progress: retryProgress });
            onProgress?.({
              isLoading: true,
              progress: retryProgress,
              error: null,
              success: false,
              fileName: fileArray[0].name,
            });
          }
        }
      }

      const finalError =
        lastError || 'Upload failed after multiple attempts. Please try again.';
      updateState({
        isLoading: false,
        progress: 0,
        error: finalError,
        success: false,
      });

      onError?.(finalError);
    },
    [apiEndpoint, updateState]
  );

  const downloadFile = useCallback((blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      progress: 0,
      error: null,
      success: false,
      fileName: '',
    });
  }, []);

  return {
    ...state,
    upload,
    downloadFile,
    reset,
  };
}
