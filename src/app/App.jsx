import React from 'react';
import WebcamFeed from '../hand/WebcamFeed';
import VoxelScene from './VoxelScene';

/**
 * Root Application - Camera Viewfinder + 3D Voxel Scene
 */
const App = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Voxel Scene (Background Layer) */}
            <VoxelScene />

            {/* Fullscreen Camera Feed with Hand Tracking (Overlay) */}
            <WebcamFeed />
        </div>
    );
};

export default App;
