'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredSkeletonProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'vertical' | 'horizontal';
}

export function StaggeredSkeleton({
  children,
  className,
  staggerDelay = 0.05,
  direction = 'vertical'
}: StaggeredSkeletonProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: direction === 'vertical' ? 20 : 0, x: direction === 'horizontal' ? 20 : 0 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}