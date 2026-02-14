import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { MEDIAPIPE_CONFIG } from "../config/mediapipe";

let handLandmarker = null;
let isLoading = false;

/**
 * Singleton loader for MediaPipe HandLandmarker.
 * Ensures WASM and model assets are only loaded once.
 */
export async function getHandLandmarker() {
    if (handLandmarker) return handLandmarker;
    if (isLoading) {
        // Wait until current loading is finished
        while (isLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return handLandmarker;
    }

    isLoading = true;
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: MEDIAPIPE_CONFIG.modelAssetPath,
                delegate: MEDIAPIPE_CONFIG.delegate,
            },
            runningMode: MEDIAPIPE_CONFIG.runningMode,
            numHands: MEDIAPIPE_CONFIG.numHands,
            minHandDetectionConfidence: MEDIAPIPE_CONFIG.minHandDetectionConfidence,
            minHandPresenceConfidence: MEDIAPIPE_CONFIG.minHandPresenceConfidence,
            minTrackingConfidence: MEDIAPIPE_CONFIG.minTrackingConfidence,
        });

        console.log("MediaPipe HandLandmarker loaded successfully.");
        return handLandmarker;
    } catch (error) {
        console.error("Failed to load MediaPipe HandLandmarker:", error);
        throw error;
    } finally {
        isLoading = false;
    }
}
