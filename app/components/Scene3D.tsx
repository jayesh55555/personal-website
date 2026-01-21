'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Neural Network Node
function NeuralNode({ position, index }: { position: [number, number, number], index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Pulsing animation
    const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1 + 1;
    meshRef.current.scale.setScalar(pulse);
    
    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial 
        color="#ef5327" 
        emissive="#ef5327"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Connection Lines between nodes
function NeuralConnections({ nodes }: { nodes: [number, number, number][] }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i][0] - nodes[j][0], 2) +
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
          Math.pow(nodes[i][2] - nodes[j][2], 2)
        );
        
        // Only connect nodes that are close enough
        if (dist < 2) {
          points.push(new THREE.Vector3(...nodes[i]));
          points.push(new THREE.Vector3(...nodes[j]));
        }
      }
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [nodes]);

  useFrame((state) => {
    if (!linesRef.current) return;
    
    // Animate opacity
    const material = linesRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial 
        color="#ef5327" 
        transparent 
        opacity={0.3}
        linewidth={1}
      />
    </lineSegments>
  );
}

// Floating Code Particles
function CodeParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      // Orange to white gradient
      colors[i * 3] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.1 + Math.random() * 0.2;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    
    // Animate particles
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main Neural Network Scene
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Generate neural network node positions
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const layers = 4;
    const nodesPerLayer = 6;
    
    for (let layer = 0; layer < layers; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const x = (layer - layers / 2) * 1.5;
        const y = (node - nodesPerLayer / 2) * 0.8;
        const z = (Math.random() - 0.5) * 2;
        nodePositions.push([x, y, z]);
      }
    }
    
    return nodePositions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Gentle rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    
    // Mouse parallax
    groupRef.current.rotation.x = mousePosition.current.y * 0.3;
    groupRef.current.rotation.y += mousePosition.current.x * 0.3;
    
    // Scroll-based movement
    const scrollY = window.scrollY;
    groupRef.current.position.y = -scrollY * 0.0005;
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
    <group ref={groupRef}>
      <NeuralConnections nodes={nodes} />
      {nodes.map((position, index) => (
        <NeuralNode key={index} position={position} index={index} />
      ))}
      <CodeParticles />
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed top-0 right-0 w-full h-screen pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ef5327" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
