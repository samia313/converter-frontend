'use client';

import React from 'react';
import { AppError, getErrorAction, createError } from '@/lib/error-messages';

interface ErrorDisplayProps {
  error: AppError | string;
  onDismiss?: () => void;
  onRetry?: () => void;
  showDetails?: boolean;
}

export function ErrorDisplay({
  error,
  onDismiss,
  onRetry,
  showDetails = false,
}: ErrorDisplayProps) {
  const appError = typeof error === 'string'
    ? createError('ERROR', error)
    : error;

  const action = getErrorAction(appError);
  const isRecoverable = appError.recoverable !== false;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">⚠️</div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Something went wrong</h3>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-red-500 hover:text-red-700 font-bold text-xl"
            >
              ×
            </button>
          )}
        </div>

        {/* Message */}
        <p className="text-sm text-red-700">{appError.message}</p>

        {/* Details */}
        {showDetails && appError.details && (
          <details className="text-xs text-red-600 bg-red-100 p-2 rounded">
            <summary className="cursor-pointer font-medium">Technical details</summary>
            <pre className="mt-2 overflow-auto">{appError.details}</pre>
          </details>
        )}

        {/* Action */}
        <div className="text-xs text-red-600 italic">{action}</div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          {isRecoverable && onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300 transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface ErrorToastProps {
  error: string;
  onClose?: () => void;
  autoClose?: number;
}

export function ErrorToast({ error, onClose, autoClose = 5000 }: ErrorToastProps) {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">❌</span>
          <p className="text-sm">{error}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="font-bold text-xl hover:text-red-900">
            ×
          </button>
        )}
      </div>
    </div>
  );
}

interface SuccessMessageProps {
  message: string;
  onDismiss?: () => void;
  autoClose?: number;
}

export function SuccessMessage({ message, onDismiss, autoClose = 5000 }: SuccessMessageProps) {
  React.useEffect(() => {
    if (autoClose && onDismiss) {
      const timer = setTimeout(onDismiss, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onDismiss]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">✅</span>
        <div className="flex-1">
          <p className="text-sm text-green-700 font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-green-500 hover:text-green-700 font-bold">
            ×
          </button>
        )}
      </div>
    </div>
  );
}

interface InfoMessageProps {
  message: string;
  onDismiss?: () => void;
}

export function InfoMessage({ message, onDismiss }: InfoMessageProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">ℹ️</span>
        <div className="flex-1">
          <p className="text-sm text-blue-700">{message}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-blue-500 hover:text-blue-700 font-bold">
            ×
          </button>
        )}
      </div>
    </div>
  );
}
