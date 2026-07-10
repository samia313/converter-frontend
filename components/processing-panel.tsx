'use client';

import { useState, useEffect } from 'react';
import { Download, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingPanelProps {
  isProcessing: boolean;
  isComplete: boolean;
  error?: string | null;
  downloadUrl?: string | null;
  fileName?: string;
  onDownload?: () => void;
}

export default function ProcessingPanel({
  isProcessing,
  isComplete,
  error,
  downloadUrl,
  fileName = 'converted-file',
  onDownload,
}: ProcessingPanelProps) {
  if (!isProcessing && !isComplete && !error) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4">
        {isProcessing && (
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Processing your file...
            </h3>
            <p className="text-sm text-gray-600">
              This may take a few moments
            </p>
          </div>
        )}

        {isComplete && !error && (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Conversion Complete!
            </h3>
            {downloadUrl && (
              <button
                onClick={onDownload}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Download className="w-5 h-5" />
                Download {fileName}
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Conversion Failed
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
