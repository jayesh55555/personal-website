'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Only activate on devices that have a real pointer
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rafId: number;
    let rx = -100, ry = -100; // start off-screen
    let tx = -100, ty = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`;
    };

    const tick = () => {
      // Ring lerps — creates the trailing lag effect
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    // Detect hoverable elements for ring expansion
    const attachHoverListeners = () => {
      const els = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label');
      els.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    attachHoverListeners();

    // Re-attach when DOM changes (modals etc.)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — instant-following, white with blend mode */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ mixBlendMode: 'difference' }}
      >
        <div
          className="rounded-full bg-white transition-all duration-150"
          style={{
            width:  clicking ? 6  : hovered ? 12 : 8,
            height: clicking ? 6  : hovered ? 12 : 8,
            marginTop:  clicking ? 1 : hovered ? -2 : 0,
            marginLeft: clicking ? 1 : hovered ? -2 : 0,
          }}
        />
      </div>

      {/* Ring — lagged, orange, expands on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
      >
        <div
          className="rounded-full border-2 transition-all duration-200"
          style={{
            width:       clicking ? 28 : hovered ? 48 : 36,
            height:      clicking ? 28 : hovered ? 48 : 36,
            borderColor: hovered ? 'rgba(239,83,39,0.9)' : 'rgba(239,83,39,0.6)',
            opacity:     clicking ? 0.5 : 1,
          }}
        />
      </div>
    </>
  );
}
