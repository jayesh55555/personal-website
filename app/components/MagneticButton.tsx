'use client';

import { useRef, useState, useCallback, ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  download?: boolean | string;
  strength?: number; // 0-1, default 0.35
  as?: 'button' | 'a';
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  download,
  strength = 0.35,
  as: Tag = href ? 'a' : 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  const sharedProps = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  const content = (
    <motion.span
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (Tag === 'a') {
    return (
      <a {...sharedProps} href={href} download={download}>
        {content}
      </a>
    );
  }

  return (
    <button {...sharedProps}>
      {content}
    </button>
  );
}
