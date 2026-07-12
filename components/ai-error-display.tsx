'use client';

import React from 'react';
import { AlertCircle, X, Info } from 'lucide-react';
import { ValidationError, ValidationErrorCode, getErrorMessage } from '@/lib/ai-validation';

interface AIErrorDisplayProps {
  error: ValidationError | string | null;
  onDismiss?: () => void;
  severity?: 'error' | 'warning' | 'info';
  showDetails?: boolean;
}

export function AIErrorDisplay({
  error,
  onDismiss,
  severity = 'error',
  showDetails = false,
}: AIErrorDisplayProps) {
  if (!error) return null;

  const isValidationError = typeof error === 'object';
  const message = isValidationError ? error.message : error;
  const details = isValidationError ? error.details : undefined;
  const code = isValidationError ? error.code : undefined;

  const bgColor =
    severity === 'error' ? 'bg-red-50' : severity === 'warning' ? 'bg-yellow-50' : 'bg-blue-50';
  const borderColor =
    severity === 'error' ? 'border-red-200' : severity === 'warning' ? 'border-yellow-200' : 'border-blue-200';
  const textColor =
    severity === 'error' ? 'text-red-700' : severity === 'warning' ? 'text-yellow-700' : 'text-blue-700';
  const iconColor =
    severity === 'error' ? 'text-red-600' : severity === 'warning' ? 'text-yellow-600' : 'text-blue-600';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 ${textColor}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="font-semibold text-sm">{message}</p>
          {showDetails && details && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs opacity-75 hover:opacity-100">
                More details
              </summary>
              <pre className="mt-2 text-xs overflow-auto bg-white bg-opacity-50 p-2 rounded border opacity-75">
                {JSON.stringify(details, null, 2)}
              </pre>
            </details>
          )}
          {code && (
            <p className="text-xs opacity-75 mt-1">Error code: {code}</p>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ${iconColor} hover:opacity-75 transition`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

interface AIErrorListProps {
  errors: ValidationError[];
  onDismiss?: () => void;
}

export function AIErrorList({ errors, onDismiss }: AIErrorListProps) {
  if (errors.length === 0) return null;

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <AIErrorDisplay
          key={`${error.code}-${index}`}
          error={error}
          onDismiss={onDismiss}
          severity="error"
        />
      ))}
    </div>
  );
}

interface AIErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface AIErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AIErrorBoundary extends React.Component<
  AIErrorBoundaryProps,
  AIErrorBoundaryState
> {
  constructor(props: AIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): AIErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-red-900 mb-2">Something went wrong</h2>
              <p className="text-red-700 text-sm mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold text-sm transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
