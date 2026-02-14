import { create } from 'zustand';

/**
 * Shared state for hand tracking data.
 * Used by UI, HandCursor, and Gesture logic.
 */
export const useHandStore = create((set) => ({
    hands: [],
    isTracking: false,
    setHands: (hands) => set({ hands, isTracking: hands.length > 0 }),
    setIsTracking: (isTracking) => set({ isTracking }),
}));
