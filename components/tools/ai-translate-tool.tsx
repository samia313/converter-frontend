'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Globe, Download } from 'lucide-react';

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ko', name: 'Korean' },
];

export default function AITranslateTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('language', targetLanguage);

      const response = await fetch('/api/convert/ai-translate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText || 'Translation could not be completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (translatedText) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(translatedText));
      element.setAttribute('download', 'translated-document.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              AI PDF Translator
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Translate your documents to 12+ languages instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Upload Document
            </h3>

            <FileUploader
              accept=".pdf,.txt,.doc,.docx"
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              maxSize={50}
            />

            {/* Language Selection */}
            <div className="mt-8 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Translate To
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleTranslate}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Translating...' : 'Translate Document'}
            </button>
          </div>

          {/* Results */}
          {translatedText && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Translated Content
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {translatedText}
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                <Download className="w-4 h-4" />
                Download Translation
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
