import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows, ScrollControls } from '@react-three/drei';
import Pizza3D from './Pizza3D';
import { Suspense } from 'react';

const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-95 pointer-events-none">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />

        {/* Warm Main Light */}
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.25}
          penumbra={1}
          intensity={3}
          castShadow
          color="#ffffff"
        />

        {/* Rim Light (Highlights the puffy crust) */}
        <pointLight position={[-8, 2, -5]} intensity={2} color="#ffcc66" />

        {/* Warm "Oven" Glow from Below */}
        <pointLight position={[0, -5, 2]} intensity={1.5} color="#d35400" />

        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.2}>
            <Pizza3D />
          </ScrollControls>
          <Environment preset="city" />
          <ContactShadows
            position={[0, -3.2, 0]}
            opacity={0.6}
            scale={15}
            blur={2.5}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
