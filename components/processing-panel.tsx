'use client';

import { Download, Loader, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface ProcessingPanelProps {
  isProcessing: boolean;
  isComplete: boolean;
  error?: string | null;
  downloadUrl?: string | null;
  fileName?: string;
  onDownload?: () => void;
  onConvertAnother?: () => void;
}

export default function ProcessingPanel({
  isProcessing,
  isComplete,
  error,
  downloadUrl,
  fileName = 'converted-file',
  onDownload,
  onConvertAnother,
}: ProcessingPanelProps) {
  if (!isProcessing && !isComplete && !error) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="processing-panel-title"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl sm:p-8">
        {isProcessing && (
          <div className="text-center" aria-live="polite">
            <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-red-600" aria-hidden="true" />
            <h3 id="processing-panel-title" className="mb-2 text-lg font-semibold text-gray-900">
              Processing your file...
            </h3>
            <p className="text-sm text-gray-600">This may take a few moments</p>
          </div>
        )}

        {isComplete && !error && (
          <div className="text-center" aria-live="polite">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" aria-hidden="true" />
            <h3 id="processing-panel-title" className="mb-2 text-lg font-semibold text-gray-900">
              Conversion Complete!
            </h3>
            <p className="mb-5 text-sm text-gray-600">Your file is ready. Download it when you're ready.</p>
            {downloadUrl && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onDownload}
                  className="w-full rounded-lg bg-red-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                  aria-label={`Download ${fileName}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" aria-hidden="true" />
                    Download Your File
                  </span>
                </button>
                {onConvertAnother && (
                  <button
                    type="button"
                    onClick={onConvertAnother}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:w-auto sm:px-5"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Convert another file
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="text-center" aria-live="assertive">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-600" aria-hidden="true" />
            <h3 id="processing-panel-title" className="mb-2 text-lg font-semibold text-gray-900">
              Conversion Failed
            </h3>
            <p className="mb-4 text-sm text-gray-600">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
