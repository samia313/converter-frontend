'use client';

import { motion } from 'framer-motion';
import { Lock, UserCheck, Shield, Zap, FileCheck } from 'lucide-react';
import { animationVariants } from '@/lib/animations';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Lock,
      title: 'Secure Processing',
      description: 'Files are handled through secure processing flows',
    },
    {
      icon: FileCheck,
      title: 'No Registration',
      description: 'Start using available tools without creating an account',
    },
    {
      icon: UserCheck,
      title: 'Easy to Use',
      description: 'Simple upload and processing experience',
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'We avoid making unsupported storage or deletion promises',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Efficient document processing for supported tools',
    },
  ];

  return (
    <section className="pt-2 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Why Trust PDFilio?</h2>
          <p className="text-lg text-slate-300">A simple, secure experience for supported document tools</p>
        </motion.div>

        <motion.div
          variants={animationVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div key={index} variants={animationVariants.staggerItem} className="group relative">
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-red-500/50 transition-colors duration-300 backdrop-blur-sm">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-white mb-2 text-sm">{indicator.title}</h3>
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{indicator.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
