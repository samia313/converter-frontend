'use client';

import Link from 'next/link';
import { Mail, MapPin, Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-6">PDFilio</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2"><Mail className="w-4 h-4 mt-1 flex-shrink-0" /><a href="mailto:support@pdfilio.com" className="hover:text-white transition">support@pdfilio.com</a></div>
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 flex-shrink-0" /><span>Worldwide Online</span></div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Convert & Optimize</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compress-pdf">Compress PDF</Link></li><li><Link href="/merge-pdf">Merge PDF</Link></li><li><Link href="/pdf-to-word">PDF to Word</Link></li><li><Link href="/word-to-pdf">Word to PDF</Link></li><li><Link href="/">View All Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm"><li><Link href="/about">About Us</Link></li><li><Link href="/contact">Contact</Link></li><li><Link href="/affiliate">Affiliate Program</Link></li><li><Link href="/referral">Referral Program</Link></li></ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm"><li><Link href="/security">Security & Privacy</Link></li><li><Link href="/terms">Terms of Service</Link></li><li><Link href="/privacy">Privacy Policy</Link></li><li><Link href="/developers">API Documentation</Link></li></ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://twitter.com/pdfilio" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" title="Twitter"><Share2 className="w-5 h-5" /></a>
              <a href="https://pdfilio.com" className="hover:text-red-600 transition" title="Website"><Globe className="w-5 h-5" /></a>
              <a href="mailto:support@pdfilio.com" className="hover:text-red-600 transition" title="Email"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-xs mb-2">Languages</p><select className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded" defaultValue="English"><option>English</option><option>Urdu</option><option>Hindi</option></select>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8"><div className="flex flex-col md:flex-row justify-between items-center text-sm"><p className="text-gray-400 mb-4 md:mb-0">&copy; 2026 PDFilio. All rights reserved.</p><div className="flex gap-6"><Link href="/">Home</Link><Link href="/sitemap-page">Sitemap</Link><Link href="/security">Security</Link><Link href="/contact">Contact</Link></div></div></div>
      </div>
    </footer>
  );
}
