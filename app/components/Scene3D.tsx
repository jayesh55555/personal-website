'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
    
    // Mouse parallax effect
    meshRef.current.rotation.y += (mousePosition.current.x * 0.5 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (mousePosition.current.y * 0.5 - meshRef.current.rotation.x) * 0.05;
    
    // Scroll-based movement
    const scrollY = window.scrollY;
    meshRef.current.position.y = -scrollY * 0.001;
  });

  // Track mouse movement
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    });
  }

  return (
    <Sphere args={[1, 100, 100]} ref={meshRef} scale={2.5}>
      <MeshDistortMaterial
        color="#ef5327"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed top-0 right-0 w-1/2 h-screen pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ef5327" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
