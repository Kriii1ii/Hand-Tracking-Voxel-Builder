import { useEffect, useRef } from 'react';
import { getHandLandmarker } from './MediaPipeLoader';
import { adaptMediaPipeResult } from './adapters/mediapipeAdapter';
import { useHandStore } from '../state/useHandStore';
import { Point3DFilter } from '../math/smoothing';

/**
 * Main hook for running hand tracking.
 * Handles the video loop, detection, smoothing, and store synchronization.
 */
export const useHandTracking = (videoRef) => {
    const setHands = useHandStore((state) => state.setHands);
    const setIsTracking = useHandStore((state) => state.setIsTracking);

    // Array of 21 filters for landmarks (per hand - simplifying to 1 hand for now)
    const landmarkFilters = useRef(Array.from({ length: 21 }, () => new Point3DFilter(0.4)));
    const landmarkerRef = useRef(null);
    const requestRef = useRef(null);
    const detectionCountRef = useRef(0);

    useEffect(() => {
        let active = true;

        const initLandmarker = async () => {
            try {
                landmarkerRef.current = await getHandLandmarker();
                if (active) {
                    console.log("✅ Hand tracking loop started.");
                    startLoop();
                }
            } catch (err) {
                console.error("❌ Tracking initialization failed", err);
            }
        };

        const startLoop = () => {
            if (!videoRef.current || !landmarkerRef.current) return;

            const video = videoRef.current;
            let frameCount = 0;

            const detect = () => {
                // Ensure video has valid dimensions before detection
                if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                    try {
                        const now = performance.now();
                        const results = landmarkerRef.current.detectForVideo(video, now);

                        frameCount++;

                        // Log every 60 frames (roughly once per second at 60fps)
                        if (frameCount % 60 === 0) {
                            console.log(`📊 Frame ${frameCount}: Detected ${results.landmarks?.length || 0} hands`);
                        }

                        let hands = adaptMediaPipeResult(results);

                        // Apply temporal smoothing to landmarks
                        if (hands.length > 0) {
                            const hand = hands[0];
                            hand.landmarks = hand.landmarks.map((pt, i) =>
                                landmarkFilters.current[i].filter(pt)
                            );

                            if (detectionCountRef.current === 0) {
                                console.log("🖐️ Hand detected!", {
                                    handedness: hand.handedness,
                                    score: hand.score,
                                    landmarkCount: hand.landmarks.length
                                });
                            }
                            detectionCountRef.current++;
                            setIsTracking(true);
                        } else {
                            if (detectionCountRef.current > 0) {
                                console.log("👋 Hand lost");
                                detectionCountRef.current = 0;
                            }
                            // Reset filters when hand is lost to prevent "teleporting" when it returns
                            landmarkFilters.current.forEach(f => f.reset());
                        }

                        setHands(hands);
                    } catch (error) {
                        console.error("❌ Hand detection error:", error);
                    }
                }

                if (active) {
                    requestRef.current = requestAnimationFrame(detect);
                }
            };

            detect();
        };

        initLandmarker();

        return () => {
            active = false;
            cancelAnimationFrame(requestRef.current);
        };
    }, [videoRef, setHands, setIsTracking]);

    return { isReady: !!landmarkerRef.current };
};
