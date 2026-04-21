import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const PizzaModel = () => {
  const { scene } = useGLTF('/pizza.glb');
  return <primitive object={scene} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} />;
};

useGLTF.preload('/pizza.glb');

const Pizza3D = () => {
  const spinGroupRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(scrolled / total);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_state, delta) => {
    if (spinGroupRef.current) {
      // 1. Clockwise slow rotation
      spinGroupRef.current.rotation.z -= delta * 0.15;

      // 2. Linear scroll movement (parallax effect)
      // Moving from top to bottom based on actual window scroll
      spinGroupRef.current.position.y = THREE.MathUtils.lerp(
        spinGroupRef.current.position.y,
        0.5 - (scrollProgress * 4), // Range of movement
        0.1 // Damping
      );
    }
  });

  return (
    <group scale={[1.6, 1.6, 1.6]} position={[0, -0.6, 0]}>
      <group ref={spinGroupRef}>
        <PizzaModel />
      </group>
    </group>
  );
};

export default Pizza3D;
