import { useEffect, useRef } from 'react';
import { useHandStore } from '../state/useHandStore';
import { useVoxelStore } from '../state/useVoxelStore';
import { GESTURE_CONFIG } from '../config/gestures';

/**
 * Detects hand gestures and places voxels
 * Supports continuous drawing when pinch is held
 */
export const useGestures = () => {
    const hands = useHandStore((state) => state.hands);
    const addVoxel = useVoxelStore((state) => state.addVoxel);
    const lastGestureTime = useRef(0);
    const isPinchingRef = useRef(false);
    const lastVoxelPosition = useRef(null);

    useEffect(() => {
        if (hands.length === 0) {
            isPinchingRef.current = false;
            lastVoxelPosition.current = null;
            return;
        }

        const hand = hands[0];
        const now = Date.now();

        // Calculate distance between index finger tip and thumb tip
        const indexTip = hand.landmarks[8];
        const thumbTip = hand.landmarks[4];

        const dx = indexTip.x - thumbTip.x;
        const dy = indexTip.y - thumbTip.y;
        const dz = indexTip.z - thumbTip.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const isPinching = distance < GESTURE_CONFIG.PINCH_THRESHOLD;

        // Map hand position to voxel grid coordinates
        // Mirror X to match mirrored camera feed
        const x = Math.floor(-(indexTip.x - 0.5) * 20);
        const y = Math.floor(-(indexTip.y - 0.5) * 15);
        const z = Math.floor(-indexTip.z * 10);

        if (isPinching) {
            // Continuous drawing mode
            if (!isPinchingRef.current) {
                // Just started pinching
                console.log('Pinch started - continuous drawing mode');
                isPinchingRef.current = true;
                addVoxel(x, y, z, '#FF00FF');
                lastVoxelPosition.current = { x, y, z };
                lastGestureTime.current = now;
            } else {
                // Still pinching - draw line if position changed
                const timeSinceLastVoxel = now - lastGestureTime.current;

                if (timeSinceLastVoxel >= 100) { // 10 voxels per second max
                    const lastPos = lastVoxelPosition.current;

                    if (!lastPos || lastPos.x !== x || lastPos.y !== y || lastPos.z !== z) {
                        // Position changed - add voxel
                        addVoxel(x, y, z, '#FF00FF');

                        // Interpolate between last position and current for smooth lines
                        if (lastPos) {
                            const steps = Math.max(
                                Math.abs(x - lastPos.x),
                                Math.abs(y - lastPos.y),
                                Math.abs(z - lastPos.z)
                            );

                            if (steps > 1 && steps < 10) {
                                for (let i = 1; i < steps; i++) {
                                    const t = i / steps;
                                    const ix = Math.floor(lastPos.x + (x - lastPos.x) * t);
                                    const iy = Math.floor(lastPos.y + (y - lastPos.y) * t);
                                    const iz = Math.floor(lastPos.z + (z - lastPos.z) * t);
                                    addVoxel(ix, iy, iz, '#FF00FF');
                                }
                            }
                        }

                        lastVoxelPosition.current = { x, y, z };
                        lastGestureTime.current = now;
                    }
                }
            }
        } else {
            // Released pinch
            if (isPinchingRef.current) {
                console.log('Pinch released');
                isPinchingRef.current = false;
                lastVoxelPosition.current = null;
            }
        }

    }, [hands, addVoxel]);

    if (hands.length === 0) {
        return {
            isPinching: false,
            isGrabbing: false,
            indexTip: null,
            thumbTip: null,
            palmBase: null
        };
    }

    const hand = hands[0];
    const indexTip = hand.landmarks[8];
    const thumbTip = hand.landmarks[4];
    const palmBase = hand.landmarks[0];

    const dx = indexTip.x - thumbTip.x;
    const dy = indexTip.y - thumbTip.y;
    const dz = indexTip.z - thumbTip.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    const isPinching = distance < GESTURE_CONFIG.PINCH_THRESHOLD;

    return {
        isPinching,
        isGrabbing: false,
        indexTip,
        thumbTip,
        palmBase,
        hand
    };
};
