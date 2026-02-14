/**
 * Adapts MediaPipe raw output to the application's internal Hand model.
 * This decouples the perception layer from the rest of the application.
 */
export const adaptMediaPipeResult = (result) => {
    if (!result || !result.landmarks || result.landmarks.length === 0) {
        return [];
    }

    return result.landmarks.map((landmarks, index) => {
        const handedness = result.handedness[index]?.[0]?.categoryName || 'Unknown';
        const score = result.handedness[index]?.[0]?.score || 0;

        return {
            landmarks, // 21 normalized points {x, y, z}
            handedness,
            score,
            // Common reference points for easy access
            indexTip: landmarks[8],
            thumbTip: landmarks[4],
            palmBase: landmarks[0],
            middleTip: landmarks[12],
        };
    });
};
