'use client';

import { motion } from 'framer-motion';
import {
  Merge,
  Scissors,
  RotateCw,
  Trash2,
  Zap,
  FileDown,
  FileUp,
  Grid,
  Image,
  Code,
  Edit,
  Stamp,
  Hash,
  Eye,
  Crop,
  Lock,
  Unlock,
  PenTool,
} from 'lucide-react';
import { animationVariants } from '@/lib/animations';

const allTools = [
  // Organize PDF
  { name: 'Merge PDF', icon: Merge, color: 'bg-green-500', description: 'Combine multiple PDFs' },
  { name: 'Split PDF', icon: Scissors, color: 'bg-green-500', description: 'Extract pages' },
  { name: 'Rotate PDF', icon: RotateCw, color: 'bg-green-500', description: 'Change orientation' },
  { name: 'Remove Pages', icon: Trash2, color: 'bg-green-500', description: 'Delete unwanted pages' },

  // Optimize PDF
  { name: 'Compress PDF', icon: Zap, color: 'bg-orange-500', description: 'Reduce file size' },

  // Convert to PDF
  { name: 'Word to PDF', icon: FileUp, color: 'bg-blue-500', description: 'From documents' },
  { name: 'Excel to PDF', icon: Grid, color: 'bg-blue-500', description: 'From spreadsheets' },
  { name: 'PowerPoint to PDF', icon: FileUp, color: 'bg-blue-500', description: 'From presentations' },
  { name: 'JPG to PDF', icon: Image, color: 'bg-blue-500', description: 'From images' },
  { name: 'HTML to PDF', icon: Code, color: 'bg-blue-500', description: 'From web pages' },

  // Convert from PDF
  { name: 'PDF to Word', icon: FileDown, color: 'bg-indigo-500', description: 'To documents' },
  { name: 'PDF to Excel', icon: Grid, color: 'bg-indigo-500', description: 'To spreadsheets' },
  { name: 'PDF to PowerPoint', icon: FileUp, color: 'bg-indigo-500', description: 'To presentations' },
  { name: 'PDF to JPG', icon: Image, color: 'bg-indigo-500', description: 'To images' },
  { name: 'PDF to PNG', icon: Image, color: 'bg-indigo-500', description: 'To PNG images' },

  // Edit & Manage
  { name: 'Edit PDF', icon: Edit, color: 'bg-purple-500', description: 'Add & modify content' },
  { name: 'Watermark PDF', icon: Stamp, color: 'bg-purple-500', description: 'Add watermarks' },
  { name: 'Page Numbers', icon: Hash, color: 'bg-purple-500', description: 'Add numbering' },
  { name: 'Redact PDF', icon: Eye, color: 'bg-purple-500', description: 'Hide sensitive text' },
  { name: 'Crop PDF', icon: Crop, color: 'bg-purple-500', description: 'Trim pages' },

  // Security
  { name: 'Protect PDF', icon: Lock, color: 'bg-red-500', description: 'Password protect' },
  { name: 'Unlock PDF', icon: Unlock, color: 'bg-red-500', description: 'Remove protection' },
  { name: 'Sign PDF', icon: PenTool, color: 'bg-red-500', description: 'Digital signatures' },
];

export default function UnifiedToolsGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            Your Complete PDF Toolkit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            23+ professional tools to handle any PDF task. Convert, merge, split, compress, protect, and more - all free and easy to use.
          </p>
        </motion.div>

        {/* Unified Grid */}
        <motion.div
          variants={animationVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {allTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={animationVariants.staggerItem}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                {/* Icon Container */}
                <div className={`${tool.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Tool Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                  {tool.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
