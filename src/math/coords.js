import * as THREE from 'three';

/**
 * Converts MediaPipe normalized landmarks (0-1) to Three.js Normalized Device Coordinates (NDC) (-1 to 1).
 * MediaPipe coordinates: (0,0) is top-left index finger.
 * Three.js NDC: (0,0) is center, (-1,-1) is bottom-left.
 */
export const mpToNDC = (landmark) => {
    return {
        x: (landmark.x * 2) - 1,
        y: -(landmark.y * 2) + 1, // Flip Y
        z: (landmark.z * 2) // Depth is semi-arbitrary from MP
    };
};

/**
 * Projects an NDC coordinate to World Space using the camera.
 */
export const ndcToWorld = (x, y, z, camera) => {
    const vector = new THREE.Vector3(x, y, z);
    vector.unproject(camera);
    return vector;
};

/**
 * Snaps a 3D world position to the voxel grid.
 */
export const worldToGrid = (position, voxelSize) => {
    return {
        x: Math.round(position.x / voxelSize),
        y: Math.round(position.y / voxelSize),
        z: Math.round(position.z / voxelSize)
    };
};
