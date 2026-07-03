'use client';

import { motion } from 'framer-motion';
import {
  FileDown,
  FileUp,
  Merge,
  Scissors,
  Zap,
  Scan,
  FileCheck,
  MessageCircle,
} from 'lucide-react';
import { animationVariants } from '@/lib/animations';

const tools = [
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    category: 'Convert',
    icon: FileDown,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    category: 'Convert',
    icon: FileUp,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    category: 'Organize',
    icon: Merge,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    category: 'Organize',
    icon: Scissors,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    category: 'Optimize',
    icon: Zap,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'ocr',
    name: 'OCR',
    category: 'Edit & Manage',
    icon: Scan,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'ai-summary',
    name: 'AI Summary',
    category: 'AI',
    icon: FileCheck,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'pdf-chat',
    name: 'PDF Chat',
    category: 'AI',
    icon: MessageCircle,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export default function QuickAccessTools() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gray-600 text-lg mb-4">
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
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                variants={animationVariants.staggerItem}
                className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="absolute top-6 right-6 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  >
                    ✓
                  </motion.div>

                  {/* Tool name */}
                  <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {tool.name}
                  </h3>

                  {/* Category badge */}
                  <div className="inline-block">
                    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {tool.category}
                    </span>
                  </div>

                  {/* Border accent on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gray-300 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
