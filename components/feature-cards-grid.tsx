'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, GitMerge, Scissors, ZoomOut, Scan, FileCheck, MessageCircle, Lock, Stamp, Upload, RotateCw, Eye } from 'lucide-react';
import { animationVariants } from '@/lib/animations';

const features = [
  { icon: FileText, name: 'PDF to Word', category: 'convert', href: '/pdf-to-word' },
  { icon: Upload, name: 'Word to PDF', category: 'convert', href: '/word-to-pdf' },
  { icon: GitMerge, name: 'Merge PDF', category: 'organize', href: '/merge-pdf' },
  { icon: Scissors, name: 'Split PDF', category: 'organize', href: '/split-pdf' },
  { icon: ZoomOut, name: 'Compress PDF', category: 'optimize', href: '/compress-pdf' },
  { icon: Scan, name: 'OCR', category: 'ai', href: '/ocr' },
  { icon: FileCheck, name: 'AI Summary', category: 'ai', href: '/ai-summary' },
  { icon: MessageCircle, name: 'PDF Chat', category: 'ai', href: '/ai-pdf-chat' },
  { icon: Lock, name: 'Password Protect', category: 'security', href: '/protect-pdf' },
  { icon: Stamp, name: 'Watermark', category: 'edit', href: '/watermark-pdf' },
  { icon: RotateCw, name: 'Rotate Pages', category: 'edit', href: '/rotate-pdf' },
  { icon: Eye, name: 'View & Annotate', category: 'view', href: '/view-and-annotate' },
] as const;

const categoryColors = { convert: 'from-blue-500 to-blue-600', organize: 'from-green-500 to-green-600', optimize: 'from-orange-500 to-orange-600', ai: 'from-purple-500 to-purple-600', security: 'from-red-500 to-red-600', edit: 'from-pink-500 to-pink-600', view: 'from-indigo-500 to-indigo-600' };

export default function FeatureCardsGrid() {
  return <section className="pt-2 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden"><div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-96 h-96 bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl"/><div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl"/></div><div className="max-w-7xl mx-auto relative z-10"><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-center mb-20"><motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.6,delay:.1}} className="inline-block mb-6"><span className="text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-full inline-block">✓ Featured PDF Tools</span></motion.div><h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Popular PDF Tools</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">A selection of commonly used PDF tools. Open a tool to see its supported formats, limits, and current processing workflow.</p></motion.div><motion.div variants={animationVariants.staggerContainer} initial="hidden" whileInView="visible" viewport={{once:true,margin:'-100px'}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{features.map((feature,index)=>{const Icon=feature.icon;const colorClass=categoryColors[feature.category];return <motion.div key={feature.href} variants={animationVariants.staggerItem} whileHover={{y:-12,transition:{duration:.3}}}><Link href={feature.href} aria-label={`Open ${feature.name}`} className="group relative block h-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:border-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"><div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/><div className="relative z-10"><motion.div whileHover={{scale:1.2,rotate:10}} className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}><Icon className="w-7 h-7 text-white"/></motion.div><h3 className="font-bold text-gray-900 text-base mb-3 group-hover:text-red-600 transition-colors duration-300">{feature.name}</h3><p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.category.charAt(0).toUpperCase()+feature.category.slice(1)}</p><div className="mt-4 text-xs font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Open tool →</div><div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-red-300/50 transition-colors duration-300 pointer-events-none"/></div></Link></motion.div>})}</motion.div></div></section>;
}
