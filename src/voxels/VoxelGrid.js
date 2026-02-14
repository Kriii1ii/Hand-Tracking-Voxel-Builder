/**
 * Handles the logical representation of the voxel grid (The "Minecraft logic").
 */
export class VoxelGrid {
    constructor() {
        // Key: "x,y,z", Value: { type: 'stone', color: '#ff0000' }
        this.data = new Map();
    }

    static getVoxelKey(x, y, z) {
        return `${x},${y},${z}`;
    }

    setVoxel(x, y, z, value) {
        const key = VoxelGrid.getVoxelKey(x, y, z);
        if (value === null) {
            this.data.delete(key);
        } else {
            this.data.set(key, value);
        }
    }

    getVoxel(x, y, z) {
        return this.data.get(VoxelGrid.getVoxelKey(x, y, z)) || null;
    }

    clear() {
        this.data.clear();
    }

    getAllVoxels() {
        const voxels = [];
        this.data.forEach((value, key) => {
            const [x, y, z] = key.split(',').map(Number);
            voxels.push({ x, y, z, ...value });
        });
        return voxels;
    }
}
