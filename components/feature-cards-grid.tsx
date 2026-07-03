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
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Complete Toolkit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features for every PDF task. Everything you need in one place.
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Name */}
                  <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-gray-700 transition-colors">
                    {feature.name}
                  </h3>

                  {/* Checkmark */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Ready to use
                  </div>

                  {/* Border accent on hover */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gray-300 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
