'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';

const transitionConfig = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  // Avoid rendering hidden on the server to prevent blank flashes
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      <motion.div
        variants={transitionConfig}
        initial={mounted ? 'hidden' : false}
        animate="show"
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
};

export default PageTransition;
