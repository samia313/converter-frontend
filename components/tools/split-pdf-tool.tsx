'use client';

import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function SplitPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [splitPage, setSplitPage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const reset = () => {
    setSelectedFile(null);
    setSplitPage('');
    setDownloadUrl(null);
    setError(null);
  };

  const handleSplit = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      if (selectedFile.size > 50 * 1024 * 1024) {
        throw new Error('PDF exceeds the 50MB browser processing limit.');
      }

      const sourcePdf = await PDFDocument.load(
        await selectedFile.arrayBuffer(),
        { ignoreEncryption: true }
      );

      const pageCount = sourcePdf.getPageCount();

      if (pageCount < 2) {
        throw new Error('Split PDF requires at least 2 pages.');
      }

      const splitAt = splitPage.trim()
        ? Number(splitPage)
        : Math.ceil(pageCount / 2);

      if (
        !Number.isInteger(splitAt) ||
        splitAt < 1 ||
        splitAt >= pageCount
      ) {
        throw new Error(`Enter a split page from 1 to ${pageCount - 1}.`);
      }

      const firstPdf = await PDFDocument.create();
      const secondPdf = await PDFDocument.create();

      const firstPages = await firstPdf.copyPages(
        sourcePdf,
        Array.from({ length: splitAt }, (_, index) => index)
      );

      const secondPages = await secondPdf.copyPages(
        sourcePdf,
        Array.from(
          { length: pageCount - splitAt },
          (_, index) => splitAt + index
        )
      );

      firstPages.forEach((page) => firstPdf.addPage(page));
      secondPages.forEach((page) => secondPdf.addPage(page));

      const firstBytes = await firstPdf.save();
      const secondBytes = await secondPdf.save();

      const zip = new JSZip();
      const baseName = selectedFile.name
        .replace(/\.pdf$/i, '')
        .replace(/[\\/\r\n"]/g, '_')
        .slice(0, 120);

      zip.file(`${baseName}-part1.pdf`, firstBytes);
      zip.file(`${baseName}-part2.pdf`, secondBytes);

      const blob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      if (!blob.size) {
        throw new Error('Split produced an empty ZIP file.');
      }

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Split failed';
      setError(
        /encrypt|password/i.test(message)
          ? 'This PDF may be password-protected. Please unlock it first.'
          : message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = selectedFile.name.replace(/\.pdf$/i, '_split.zip');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <p role="heading" aria-level={2} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Split PDF
          </p>
          <p className="text-lg text-gray-600">
            Split a PDF into two parts or choose where the split occurs
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".pdf"
            onFileSelected={(files) => {
              setDownloadUrl(null);
              setError(null);
              setSplitPage('');
              setSelectedFile(files[0] || null);
            }}
            maxSize={50}
          />

          {selectedFile && (
            <div className="mt-6 rounded-lg border border-gray-200 p-4">
              <label htmlFor="split-page" className="block text-sm font-semibold text-gray-900 mb-2">
                Split after page (optional)
              </label>
              <input
                id="split-page"
                type="number"
                min="1"
                step="1"
                value={splitPage}
                onChange={(event) => {
                  setSplitPage(event.target.value);
                  setDownloadUrl(null);
                  setError(null);
                }}
                placeholder="Leave blank to split in the middle"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                inputMode="numeric"
              />
              <p className="mt-2 text-xs text-gray-500">
                For example, enter 5 to create pages 1–5 and 6–end as separate PDFs.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <button
              onClick={handleSplit}
              disabled={!selectedFile || isProcessing}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Splitting...' : 'Split PDF'}
            </button>
          ) : (
            <div className="text-center mt-8">
              <p className="text-green-600 font-semibold mb-4">
                Split completed! Download both parts as a ZIP file.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download ZIP
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
                  Split Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
