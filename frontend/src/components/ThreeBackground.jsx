import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleGlobe = (props) => {
  const ref = useRef();
  
  // Use fewer particles on mobile for better performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const count = isMobile ? 1500 : 5000;
    return random.inSphere(new Float32Array(count * 3), { radius: 1.5 });
  }, [isMobile]);

  useFrame((state, delta) => {
    // Slowly rotate the sphere
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#6366f1" // primary accent color
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ParticleGlobe />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
