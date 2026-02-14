import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei';

/**
 * Three.js Scene setup with camera, lights, and floor.
 */
const Scene = () => {
    return (
        <Canvas
            shadows
            gl={{ antialias: true }}
        >
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                <OrbitControls makeDefault />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <directionalLight
                    position={[-5, 5, 5]}
                    intensity={0.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                <Grid
                    infiniteGrid
                    cellSize={1}
                    sectionSize={5}
                    fadeDistance={30}
                    fadeStrength={1}
                    sectionColor="#333"
                    cellColor="#222"
                />

                {/* Temporary box to verify 3D rendering */}
                <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#444" />
                </mesh>
            </Suspense>
        </Canvas>
    );
};

export default Scene;
