'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download, Upload, Loader2, AlertCircle, Globe, Copy, RotateCcw } from 'lucide-react';

const LANGUAGES = [
  { code: 'ar', name: 'Arabic' },
  { code: 'de', name: 'German' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'hi', name: 'Hindi' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
];

interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  wordCount: number;
}

export default function AITranslatorEnhanced() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [targetLanguage, setTargetLanguage] = useState('es');

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a file');
    }
  };

  const handleTranslate = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file');
      return;
    }

    if (!targetLanguage) {
      setError('Please select a target language');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('targetLanguage', targetLanguage);

      setProgress(25);

      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      setProgress(75);
      const data = await response.json();
      const translatedText = data.translatedText || data.response || 'Could not translate';

      setResult({
        originalText: selectedFile.name,
        translatedText: translatedText,
        sourceLanguage: 'English',
        targetLanguage: LANGUAGES.find(l => l.code === targetLanguage)?.name || targetLanguage,
        wordCount: translatedText.split(/\s+/).length,
      });
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (!result) return;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.translatedText));
    element.setAttribute('download', `translated-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI PDF Translator</h1>
          </div>
          <p className="text-lg text-gray-600">Translate your PDF documents to 12+ languages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Upload PDF</h2>
                <FileUploader
                  accept=".pdf"
                  onFileSelected={handleFileSelect}
                  maxSize={100}
                />

                {selectedFile && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <>
                  <div className="border-t pt-4">
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Translate To
                    </label>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleTranslate}
                    disabled={!selectedFile || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isProcessing ? `Translating... ${progress}%` : 'Translate PDF'}
                  </button>

                  {selectedFile && (
                    <button
                      onClick={handleReset}
                      className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2"
                    >
                      Start Over
                    </button>
                  )}
                </>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Translation Result</h2>

              {!selectedFile ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No PDF selected</p>
                  <p className="text-sm text-gray-500">Upload a PDF to translate</p>
                </div>
              ) : isProcessing ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-3 animate-spin" />
                  <p className="text-gray-600 font-medium">Translating document...</p>
                  <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-bold">SOURCE</p>
                      <p className="font-bold text-gray-900 mt-1">{result.sourceLanguage}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-bold">TARGET</p>
                      <p className="font-bold text-gray-900 mt-1">{result.targetLanguage}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200 max-h-64 overflow-y-auto">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{result.translatedText}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(result.translatedText)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-semibold"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-blue-50 rounded-xl border-2 border-blue-200">
                  <Globe className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Ready to translate</p>
                  <p className="text-sm text-gray-500">Select a language and click "Translate PDF"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
