'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function HeroAnimation() {
  const features = [
    'AI PDF Chat',
    'OCR',
    'Batch Conversion',
    'Cloud Storage',
    'Google Drive',
    'Dropbox',
    'OneDrive',
    'Drag & Drop Reorder',
    'Watermark',
    'Redaction',
    'Password Recovery',
    'PDF Repair',
    'Compare PDFs',
    'PDF to HTML',
    'HTML to PDF',
    'EPUB to PDF',
    'CAD to PDF',
    'Scan to PDF',
    'QR Code Generator',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orb - left side */}
      <motion.div
        className="absolute -left-40 -top-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated gradient orb - right side */}
      <motion.div
        className="absolute -right-40 -bottom-40 w-80 h-80 bg-gradient-to-tl from-red-600/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Features floating around - top left */}
      <motion.div
        className="absolute top-10 left-10 flex flex-col gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {features.slice(0, 4).map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          >
            <Star className="w-4 h-4 text-red-500 fill-red-500" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Features floating around - top right */}
      <motion.div
        className="absolute top-20 right-12 flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {features.slice(4, 8).map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap"
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15 + 0.3,
            }}
          >
            <Star className="w-4 h-4 text-red-500 fill-red-500" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Features floating around - bottom left */}
      <motion.div
        className="absolute bottom-20 left-8 flex flex-col gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {features.slice(8, 12).map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15 + 0.6,
            }}
          >
            <Star className="w-4 h-4 text-red-500 fill-red-500" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Features floating around - bottom right */}
      <motion.div
        className="absolute bottom-10 right-10 flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {features.slice(12, 19).map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap"
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15 + 0.9,
            }}
          >
            <Star className="w-4 h-4 text-red-500 fill-red-500" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Center accent pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-1 h-1 bg-red-500 rounded-full shadow-lg" />
      </motion.div>
    </div>
  );
}
