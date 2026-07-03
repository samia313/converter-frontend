'use client';

import { motion } from 'framer-motion';

export default function HeroAnimation() {

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
