import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        // Rotate the sphere slowly
        if (sphereRef.current) {
            sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.2}>
            <MeshDistortMaterial 
                color="#00f0ff" 
                attach="material" 
                distort={0.4} 
                speed={2} 
                roughness={0.2}
                metalness={0.8}
                wireframe={true}
            />
        </Sphere>
    );
};

const TechSphere = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#bd00ff" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#00f0ff" />
                
                <AnimatedSphere />
                
                {/* Add subtle background stars to the 3D space */}
                <Stars 
                    radius={100} 
                    depth={50} 
                    count={3000} 
                    factor={4} 
                    saturation={0} 
                    fade speed={1} 
                />
            </Canvas>
        </div>
    );
};

export default TechSphere;
