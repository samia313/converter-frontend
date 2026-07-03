'use client';

import { motion } from 'framer-motion';
import { Lock, Trash2, UserCheck, Shield, Zap } from 'lucide-react';
import { animationVariants } from '@/lib/animations';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Lock,
      title: '256-bit Encryption',
      description: 'Bank-level security for your files',
    },
    {
      icon: Trash2,
      title: 'Auto Delete',
      description: 'Files deleted after 1 hour',
    },
    {
      icon: UserCheck,
      title: 'No Registration',
      description: 'Start converting instantly',
    },
    {
      icon: Shield,
      title: 'SSL Secure',
      description: 'Encrypted data transmission',
    },
    {
      icon: Zap,
      title: 'Millions Converted',
      description: 'Trusted by millions worldwide',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={animationVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={index}
                variants={animationVariants.staggerItem}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 shadow-lg"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-1">{indicator.title}</h3>
                <p className="text-xs text-gray-600">{indicator.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
