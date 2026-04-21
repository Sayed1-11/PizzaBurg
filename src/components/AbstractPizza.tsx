import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const AbstractPizza = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Abstract Pizza Base */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Torus ref={meshRef} args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshDistortMaterial
            color="#d31e2b"
            speed={2}
            distort={0.4}
            radius={1}
            emissive="#d31e2b"
            emissiveIntensity={0.5}
          />
        </Torus>
      </Float>

      {/* Floating "Toppings" */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <Sphere
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 1.5,
              Math.sin((i / 8) * Math.PI * 2) * 1.5,
              (Math.random() - 0.5) * 0.5
            ]}
            args={[0.2, 32, 32]}
          >
            <meshStandardMaterial color="#f7b731" emissive="#f7b731" emissiveIntensity={0.8} />
          </Sphere>
        </Float>
      ))}
      
      {/* Central Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export default AbstractPizza;
