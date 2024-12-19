'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function InfoCard({ title, icon, children }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-gray-600">{icon}</div>}
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-600">{children}</div>
    </motion.div>
  );
} 