'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Heart, Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand & Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">PDFilio</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:support@pdfilio.com" className="hover:text-white transition">support@pdfilio.com</a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Worldwide Online</span>
              </div>
            </div>
          </div>

          {/* PDF Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Convert & Optimize</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compress-pdf" className="hover:text-red-600 transition">Compress PDF</Link></li>
              <li><Link href="/merge-pdf" className="hover:text-red-600 transition">Merge PDF</Link></li>
              <li><Link href="/pdf-to-word" className="hover:text-red-600 transition">PDF to Word</Link></li>
              <li><Link href="/word-to-pdf" className="hover:text-red-600 transition">Word to PDF</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition">View All Tools</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-red-600 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-red-600 transition">Contact</Link></li>
              <li><Link href="/affiliate" className="hover:text-red-600 transition">Affiliate Program</Link></li>
              <li><Link href="/referral" className="hover:text-red-600 transition">Referral Program</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/security" className="hover:text-red-600 transition">Security & Privacy</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition">Privacy Policy</Link></li>
              <li><Link href="/developers" className="hover:text-red-600 transition">API Documentation</Link></li>
            </ul>
          </div>

          {/* Social & Languages */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://twitter.com/pdfilio" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" title="Twitter">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="https://www.pdfilio.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" title="Website">
                <Globe className="w-5 h-5" />
              </a>
              <a href="mailto:support@pdfilio.com" className="hover:text-red-600 transition" title="Email">
                <Heart className="w-5 h-5" />
              </a>
            </div>
            <div>
              <p className="text-xs mb-2">Languages</p>
              <select className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                <option>English</option>
                <option>Urdu</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 PDFilio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-red-600 transition">Home</Link>
              <Link href="/sitemap-page" className="hover:text-red-600 transition">Sitemap</Link>
              <Link href="/security" className="hover:text-red-600 transition">Security</Link>
              <Link href="/contact" className="hover:text-red-600 transition">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
