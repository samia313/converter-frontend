'use client';

import { motion } from 'framer-motion';
import { FileText, Zap, CheckCircle2 } from 'lucide-react';

export default function HeroAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated PDF document */}
      <motion.div
        className="absolute top-20 left-1/4"
        initial={{ opacity: 0, y: -50, rotate: -20 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative"
        >
          <div className="w-24 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-2xl flex items-center justify-center">
            <FileText className="w-12 h-12 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated AI spark */}
      <motion.div
        className="absolute top-32 right-1/4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated success checkmark */}
      <motion.div
        className="absolute top-1/2 right-1/3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-50"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
