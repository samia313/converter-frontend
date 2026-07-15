'use client';

import { AlertCircle, RefreshCw, Download, Home } from 'lucide-react';
import Link from 'next/link';

interface ConversionErrorDisplayProps {
  error?: string;
  code?: string;
  onRetry?: () => void;
  isLoading?: boolean;
  details?: string;
}

const ERROR_SOLUTIONS: Record<string, string> = {
  NO_FILE: 'Please select a file to convert',
  INVALID_FILE_TYPE: 'The selected file type is not supported. Please try a different file',
  FILE_TOO_LARGE: 'Your file is too large. Please try a smaller file',
  CORRUPTED_FILE: 'The file appears to be corrupted. Try uploading a different file',
  PROCESSING_FAILED: 'The conversion process encountered an error. Please try again',
  CONVERSION_TIMEOUT: 'The conversion took too long. Try with a smaller file',
  RATE_LIMITED: 'You are making requests too quickly. Please wait a moment before trying again',
  INTERNAL_ERROR: 'An unexpected error occurred. Our team has been notified. Please try again later',
};

export function ConversionErrorDisplay({
  error,
  code,
  onRetry,
  isLoading,
  details,
}: ConversionErrorDisplayProps) {
  const displayMessage = error || 'An error occurred during conversion';
  const solution = code ? ERROR_SOLUTIONS[code] : ERROR_SOLUTIONS.INTERNAL_ERROR;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
        {/* Error Icon */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          
          <div className="flex-1">
            {/* Error Title */}
            <h3 className="text-lg font-semibold text-red-900 mb-1">
              Conversion Failed
            </h3>

            {/* Error Message */}
            <p className="text-red-800 text-sm mb-3">
              {displayMessage}
            </p>

            {/* Solution */}
            <p className="text-red-700 text-xs bg-red-100 rounded px-3 py-2">
              {solution}
            </p>

            {/* Technical Details (development only) */}
            {details && process.env.NODE_ENV === 'development' && (
              <details className="mt-3">
                <summary className="text-xs text-red-600 cursor-pointer hover:text-red-700">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded border border-red-200 overflow-auto max-h-40 text-red-800">
                  {details}
                </pre>
              </details>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-red-200">
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              {isLoading ? 'Retrying...' : 'Try Again'}
            </button>
          )}
          
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <h4 className="font-semibold mb-2">Need Help?</h4>
        <ul className="space-y-1 text-xs">
          <li>• Ensure your file is not corrupted</li>
          <li>• Try with a smaller file size</li>
          <li>• Use a supported file format</li>
          <li>• Clear your browser cache and try again</li>
        </ul>
      </div>
    </div>
  );
}

export function UploadingState() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-spin" style={{
              animation: 'spin 1s linear infinite',
            }} />
          </div>
          <p className="text-blue-900 font-medium">Processing your file...</p>
        </div>
        <p className="text-blue-700 text-xs mt-2">
          This may take a few moments depending on file size
        </p>
      </div>
    </div>
  );
}

export function SuccessState({
  filename,
  onDownload,
  onConvertAnother,
}: {
  filename: string;
  onDownload: () => void;
  onConvertAnother: () => void;
}) {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-green-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900">
              Conversion Successful
            </h3>
            <p className="text-green-800 text-sm mt-1">
              Your file is ready to download
            </p>
            <p className="text-green-700 text-xs mt-2 font-mono break-all">
              {filename}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-green-200">
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          
          <button
            onClick={onConvertAnother}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Convert Another
          </button>
        </div>
      </div>
    </div>
  );
}
