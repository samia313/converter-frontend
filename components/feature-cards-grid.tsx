'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  GitMerge,
  Scissors,
  ZoomOut,
  Scan,
  FileCheck,
  MessageCircle,
  Lock,
  Stamp,
  Upload,
  RotateCw,
  Eye,
} from 'lucide-react';
import { animationVariants } from '@/lib/animations';

export default function FeatureCardsGrid() {
  const features = [
    { icon: FileText, name: 'PDF to Word', category: 'convert' },
    { icon: Upload, name: 'Word to PDF', category: 'convert' },
    { icon: GitMerge, name: 'Merge PDF', category: 'organize' },
    { icon: Scissors, name: 'Split PDF', category: 'organize' },
    { icon: ZoomOut, name: 'Compress PDF', category: 'optimize' },
    { icon: Scan, name: 'OCR', category: 'ai' },
    { icon: FileCheck, name: 'AI Summary', category: 'ai' },
    { icon: MessageCircle, name: 'PDF Chat', category: 'ai' },
    { icon: Lock, name: 'Password Protect', category: 'security' },
    { icon: Stamp, name: 'Watermark', category: 'edit' },
    { icon: RotateCw, name: 'Rotate Pages', category: 'edit' },
    { icon: Eye, name: 'View & Annotate', category: 'view' },
  ];

  const categoryColors = {
    convert: 'from-blue-500 to-blue-600',
    organize: 'from-green-500 to-green-600',
    optimize: 'from-orange-500 to-orange-600',
    ai: 'from-purple-500 to-purple-600',
    security: 'from-red-500 to-red-600',
    edit: 'from-pink-500 to-pink-600',
    view: 'from-indigo-500 to-indigo-600',
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-full inline-block">
              ✓ Everything You Need
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Your Complete PDF Toolkit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            12+ powerful tools to handle any PDF task. Convert, merge, split, compress, protect, and more - all free and easy to use.
          </p>
        </motion.div>

        <motion.div
          variants={animationVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass =
              categoryColors[feature.category as keyof typeof categoryColors] ||
              'from-gray-500 to-gray-600';

            return (
              <motion.div
                key={index}
                variants={animationVariants.staggerItem}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:border-red-200"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Checkmark */}
                  <div className="absolute top-6 right-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      ✓
                    </motion.div>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-gray-900 text-base mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {feature.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                  </p>

                  {/* Border accent on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-red-300/50 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
