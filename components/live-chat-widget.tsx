'use client';

import { useState } from 'react';
import { MessageCircle, X, Mail } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    const subject = encodeURIComponent('PDFilio Support Request');
    const body = encodeURIComponent(message.trim() || 'Hello PDFilio Support, I need help.');
    window.location.href = `mailto:support@pdfilio.com?subject=${subject}&body=${body}`;
  };

  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)} aria-label="Open PDFilio support" className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center z-40 hover:scale-110" title="Open PDFilio support"><MessageCircle className="w-7 h-7" /></button>;
  }

  return <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
    <div className="bg-gradient-to-r from-blue-600 to-sky-700 text-white p-4 flex items-center justify-between">
      <div><h3 className="font-bold">PDFilio Support</h3><p className="text-xs text-blue-100">Send us your question by email</p></div>
      <button onClick={() => setIsOpen(false)} aria-label="Close support" className="p-1 hover:bg-blue-500 rounded"><X className="w-5 h-5" /></button>
    </div>
    <div className="p-4 space-y-3">
      <p className="text-sm text-gray-600">We’ll receive your message at <a className="text-blue-600 underline" href="mailto:support@pdfilio.com">support@pdfilio.com</a>.</p>
      <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Describe your question or issue..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={sendEmail} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"><Mail className="w-4 h-4" />Email Support</button>
    </div>
  </div>;
}
