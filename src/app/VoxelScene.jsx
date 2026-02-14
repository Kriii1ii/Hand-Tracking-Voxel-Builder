import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useVoxelStore } from '../state/useVoxelStore';
import { useGestures } from '../hand/useGestures';
import { useHandStore } from '../state/useHandStore';
import * as THREE from 'three';

/**
 * Individual Voxel Component
 */
const Voxel = ({ position, color }) => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            // Subtle pulse animation
            const scale = 1 + Math.sin(Date.now() * 0.003) * 0.05;
            meshRef.current.scale.setScalar(scale);
        }
    });

    return (
        <mesh ref={meshRef} position={position} castShadow receiveShadow>
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={5.0}
                wireframe={true}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
};

/**
 * Hand Cursor - 3D representation of hand position
 */
const HandCursor = () => {
    const hands = useHandStore((state) => state.hands);
    const cursorRef = useRef();

    useFrame(() => {
        if (hands.length > 0 && cursorRef.current) {
            const hand = hands[0];
            const indexTip = hand.landmarks[8];

            // Map normalized hand coordinates to 3D space
            // x: -1 to 1 (left to right)
            // y: -1 to 1 (top to bottom, inverted)
            // z: 0 to 1 (depth)
            // Mirror the X coordinate to match the mirrored camera feed
            const x = -(indexTip.x - 0.5) * 20;
            const y = -(indexTip.y - 0.5) * 15;
            const z = -indexTip.z * 10;

            cursorRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.3);
        }
    });

    if (hands.length === 0) return null;

    return (
        <mesh ref={cursorRef}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
                color="#D4A574"
                emissive="#D4A574"
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
};

/**
 * Voxel Grid with Gesture-based Building
 */
const VoxelGrid = () => {
    const voxels = useVoxelStore((state) => state.voxels);
    const { isPinching } = useGestures();

    // useGestures hook now handles all voxel placement with continuous drawing

    return (
        <>
            {Array.from(voxels.values()).map((voxel) => (
                <Voxel
                    key={`${voxel.position.join(',')}`}
                    position={voxel.position}
                    color={voxel.color}
                />
            ))}
        </>
    );
};

/**
 * Main 3D Scene Component
 */
const VoxelScene = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none' // Allow camera overlay to receive events
        }}>
            <Canvas
                shadows
                camera={{ position: [0, 0, 15], fov: 65 }} // Centered camera for better video overlay alignment
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D9FF" />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={0.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                {/* Grid Floor */}
                <gridHelper args={[30, 30, '#D4A574', '#1A1A1A']} position={[0, -8, 0]} opacity={0.2} transparent />

                {/* Voxel Grid */}
                <VoxelGrid />

                {/* Hand Cursor */}
                <HandCursor />

                {/* Camera Controls */}
                <OrbitControls
                    enablePan={false}
                    minDistance={10}
                    maxDistance={30}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>

            {/* Instructions Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '100px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#1A1A1A',
                padding: '16px 32px',
                borderRadius: '16px',
                border: '4px solid #D4A574',
                boxShadow: '0 6px 20px rgba(212, 165, 116, 0.4)',
                fontSize: '15px',
                fontFamily: '\'Poppins\', sans-serif',
                textAlign: 'center',
                zIndex: 20,
                pointerEvents: 'none',
                color: '#D4A574',
                fontWeight: '400',
                letterSpacing: '0.5px',
                fontFamily: '\'Just Me Again Down Here\', cursive',
                fontSize: '24px'
            }}>
                Hold pinch to draw • Move hand to position
            </div>
        </div>
    );
};

export default VoxelScene;
