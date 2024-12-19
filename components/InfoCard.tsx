'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
  mainStat?: string | number;
  stats?: {
    label: string;
    value: number;
    total?: number;
  }[];
}

export function InfoCard({ title, subtitle, icon, children, mainStat, stats }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      {mainStat && (
        <div className="text-4xl font-bold mb-6">
          {mainStat}
        </div>
      )}

      {stats && (
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{stat.label}</span>
                <span className="font-medium">
                  {stat.total ? `${(stat.value / stat.total * 100).toFixed(1)}%` : stat.value}
                </span>
              </div>
              {stat.total && (
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.value / stat.total * 100)}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!stats && children}
    </motion.div>
  );
} 