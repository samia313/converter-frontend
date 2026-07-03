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
  { name: 'Merge PDF', category: 'Organize', icon: Merge, color: 'bg-green-500' },
  { name: 'Split PDF', category: 'Organize', icon: Scissors, color: 'bg-green-500' },
  { name: 'Rotate PDF', category: 'Organize', icon: RotateCw, color: 'bg-green-500' },
  { name: 'Remove Pages', category: 'Organize', icon: Trash2, color: 'bg-green-500' },

  // Optimize PDF
  { name: 'Compress PDF', category: 'Optimize', icon: Zap, color: 'bg-orange-500' },

  // Convert to PDF
  { name: 'PDF to Word', category: 'Convert to PDF', icon: FileDown, color: 'bg-blue-500' },
  { name: 'Excel to PDF', category: 'Convert to PDF', icon: Grid, color: 'bg-blue-500' },
  { name: 'PowerPoint to PDF', category: 'Convert to PDF', icon: FileUp, color: 'bg-blue-500' },
  { name: 'JPG to PDF', category: 'Convert to PDF', icon: Image, color: 'bg-blue-500' },
  { name: 'HTML to PDF', category: 'Convert to PDF', icon: Code, color: 'bg-blue-500' },

  // Convert from PDF
  { name: 'PDF to Word', category: 'Convert from PDF', icon: FileDown, color: 'bg-green-500' },
  { name: 'PDF to Excel', category: 'Convert from PDF', icon: Grid, color: 'bg-green-500' },
  { name: 'PDF to PowerPoint', category: 'Convert from PDF', icon: FileUp, color: 'bg-green-500' },
  { name: 'PDF to JPG', category: 'Convert from PDF', icon: Image, color: 'bg-green-500' },
  { name: 'PDF to PNG', category: 'Convert from PDF', icon: Image, color: 'bg-green-500' },

  // Edit & Manage
  { name: 'Edit PDF', category: 'Edit & Manage', icon: Edit, color: 'bg-purple-500' },
  { name: 'Watermark PDF', category: 'Edit & Manage', icon: Stamp, color: 'bg-purple-500' },
  { name: 'Page Numbers', category: 'Edit & Manage', icon: Hash, color: 'bg-purple-500' },
  { name: 'Redact PDF', category: 'Edit & Manage', icon: Eye, color: 'bg-purple-500' },
  { name: 'Crop PDF', category: 'Edit & Manage', icon: Crop, color: 'bg-purple-500' },

  // Security
  { name: 'Protect PDF', category: 'Security', icon: Lock, color: 'bg-red-500' },
  { name: 'Unlock PDF', category: 'Security', icon: Unlock, color: 'bg-red-500' },
  { name: 'Sign PDF', category: 'Security', icon: PenTool, color: 'bg-red-500' },
];

export default function AllPdfTools() {
  const categories = Array.from(new Set(allTools.map(t => t.category)));

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            Complete PDF Tool Library
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access all 24+ professional PDF tools to handle any document task. From basic organization to advanced security, we&apos;ve got everything you need.
          </p>
        </motion.div>

        {/* Tools by Category */}
        {categories.map((category, categoryIndex) => {
          const categoryTools = allTools.filter(t => t.category === category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryTools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: toolIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300">
                      <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{tool.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
