'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Merge, Scissors, RotateCw, Trash2, Zap, FileDown, FileUp, Grid, Image, Code, Edit, Stamp, Hash, Eye, Crop, Lock, Unlock, PenTool, ScanText, Sparkles, MessageCircle } from 'lucide-react';
import { animationVariants } from '@/lib/animations';

const allTools = [
  { name: 'Merge PDF', id: 'merge', href: '/merge-pdf', icon: Merge, color: 'bg-green-500', description: 'Combine multiple PDFs' },
  { name: 'Split PDF', id: 'split', href: '/split-pdf', icon: Scissors, color: 'bg-green-500', description: 'Extract pages' },
  { name: 'Rotate PDF', id: 'rotate-pdf', href: '/rotate-pdf', icon: RotateCw, color: 'bg-green-500', description: 'Change orientation' },
  { name: 'Remove Pages', id: 'remove-pages', href: '/remove-pages', icon: Trash2, color: 'bg-green-500', description: 'Delete unwanted pages' },
  { name: 'Compress PDF', id: 'compress', href: '/compress-pdf', icon: Zap, color: 'bg-orange-500', description: 'Reduce file size' },
  { name: 'Word to PDF', id: 'word-to-pdf', href: '/word-to-pdf', icon: FileUp, color: 'bg-blue-500', description: 'From documents' },
  { name: 'Excel to PDF', id: 'excel-to-pdf', href: '/excel-to-pdf', icon: Grid, color: 'bg-blue-500', description: 'From spreadsheets' },
  { name: 'PowerPoint to PDF', id: 'powerpoint-to-pdf', href: '/powerpoint-to-pdf', icon: FileUp, color: 'bg-blue-500', description: 'From presentations' },
  { name: 'JPG to PDF', id: 'jpg-to-pdf', href: '/jpg-to-pdf', icon: Image, color: 'bg-blue-500', description: 'From images' },
  { name: 'HTML to PDF', id: 'html-to-pdf', href: '/html-to-pdf', icon: Code, color: 'bg-blue-500', description: 'From web pages' },
  { name: 'Image to PDF', id: 'image-to-pdf', href: '/image-to-pdf', icon: Image, color: 'bg-blue-500', description: 'Convert images to PDF' },
  { name: 'PDF to Word', id: 'pdf-to-word', href: '/pdf-to-word', icon: FileDown, color: 'bg-indigo-500', description: 'To documents' },
  { name: 'PDF to Excel', id: 'pdf-to-excel', href: '/pdf-to-excel', icon: Grid, color: 'bg-indigo-500', description: 'To spreadsheets' },
  { name: 'PDF to PowerPoint', id: 'pdf-to-powerpoint', href: '/pdf-to-powerpoint', icon: FileUp, color: 'bg-indigo-500', description: 'To presentations' },
  { name: 'PDF to JPG', id: 'pdf-to-jpg', href: '/pdf-to-jpg', icon: Image, color: 'bg-indigo-500', description: 'To images' },
  { name: 'PDF to PNG', id: 'pdf-to-png', href: '/pdf-to-png', icon: Image, color: 'bg-indigo-500', description: 'To PNG images' },
  { name: 'OCR PDF', id: 'ocr', href: '/ocr', icon: ScanText, color: 'bg-indigo-500', description: 'Extract text from scanned PDFs' },
  { name: 'AI PDF Summary', id: 'ai-summary', href: '/ai-summary', icon: Sparkles, color: 'bg-purple-500', description: 'Summarize documents with AI' },
  { name: 'Chat with PDF', id: 'pdf-chat', href: '/pdf-chat', icon: MessageCircle, color: 'bg-purple-500', description: 'Ask questions about PDFs' },
  { name: 'Edit PDF', id: 'edit-pdf', href: '/edit-pdf', icon: Edit, color: 'bg-purple-500', description: 'Add & modify content' },
  { name: 'Watermark PDF', id: 'watermark-pdf', href: '/watermark-pdf', icon: Stamp, color: 'bg-purple-500', description: 'Add watermarks' },
  { name: 'Page Numbers', id: 'page-numbers', href: '/page-numbers', icon: Hash, color: 'bg-purple-500', description: 'Add numbering' },
  { name: 'Redact PDF', id: 'redact-pdf', href: '/redact-pdf', icon: Eye, color: 'bg-purple-500', description: 'Hide sensitive text' },
  { name: 'Crop PDF', id: 'crop-pdf', href: '/crop-pdf', icon: Crop, color: 'bg-purple-500', description: 'Trim pages' },
  { name: 'Protect PDF', id: 'protect-pdf', href: '/protect-pdf', icon: Lock, color: 'bg-red-500', description: 'Password protect' },
  { name: 'Unlock PDF', id: 'unlock-pdf', href: '/unlock-pdf', icon: Unlock, color: 'bg-red-500', description: 'Remove protection' },
  { name: 'Sign PDF', id: 'sign-pdf', href: '/sign-pdf', icon: PenTool, color: 'bg-red-500', description: 'Digital signatures' },
];

export default function UnifiedToolsGrid() {
  return <section className="pt-2 pb-12 px-4 sm:px-6 lg:px-8 bg-white"><div className="max-w-7xl mx-auto"><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-center mb-12"><h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">PDF Tools</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">27 PDF tools are currently listed here. Features, supported formats, limits, and access can vary by tool.</p></motion.div><motion.div variants={animationVariants.staggerContainer} initial="hidden" whileInView="visible" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{allTools.map(tool=>{const Icon=tool.icon;return <motion.div key={tool.id} variants={animationVariants.staggerItem}><Link href={tool.href} aria-label={`Open ${tool.name}`} className="group relative block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"><div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/><div className={`${tool.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}><Icon className="w-7 h-7 text-white"/></div><h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{tool.name}</h3><p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{tool.description}</p><div className="mt-4 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Open tool →</div><div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"/></Link></motion.div>})}</motion.div></div></section>;
}
