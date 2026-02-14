import { create } from 'zustand';

/**
 * Voxel grid state management
 * Stores voxel positions and provides add/remove operations
 */
export const useVoxelStore = create((set, get) => ({
    voxels: new Map(), // Map of "x,y,z" -> { position: [x,y,z], color: string }

    addVoxel: (x, y, z, color = '#00FF64') => {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        set((state) => {
            const newVoxels = new Map(state.voxels);
            newVoxels.set(key, {
                position: [Math.floor(x), Math.floor(y), Math.floor(z)],
                color
            });
            console.log(`🧱 Voxel added at ${key}. Total: ${newVoxels.size}`);
            return { voxels: newVoxels };
        });
    },

    removeVoxel: (x, y, z) => {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        set((state) => {
            const newVoxels = new Map(state.voxels);
            if (newVoxels.delete(key)) {
                console.log(`🗑️ Voxel removed at ${key}. Total: ${newVoxels.size}`);
            }
            return { voxels: newVoxels };
        });
    },

    clearVoxels: () => {
        set({ voxels: new Map() });
        console.log('🧹 All voxels cleared');
    },

    getVoxelAt: (x, y, z) => {
        const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
        return get().voxels.get(key);
    }
}));
