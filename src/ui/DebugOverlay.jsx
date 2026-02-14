import React, { useRef, useEffect } from 'react';
import { useHandStore } from '../state/useHandStore';

/**
 * Visualizes hand tracking landmarks over the webcam feed.
 * Crucial for debugging perception stability and coordinate mapping.
 */
const DebugOverlay = () => {
    const canvasRef = useRef(null);
    const hands = useHandStore((state) => state.hands);
    const isTracking = useHandStore((state) => state.isTracking);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!isTracking) return;

            hands.forEach((hand) => {
                // Draw connections (skeleton)
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 2;

                // Simulating MediaPipe's hand connections
                // In a full implementation, we'd use a predefined map of indices
                // Drawing dots for simplicity now
                hand.landmarks.forEach((pt) => {
                    const x = pt.x * canvas.width;
                    const y = pt.y * canvas.height;

                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, 2 * Math.PI);
                    ctx.fillStyle = '#FF0000';
                    ctx.fill();
                });

                // Label handedness
                const wrist = hand.landmarks[0];
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '16px Arial';
                ctx.fillText(
                    `${hand.handedness} (${(hand.score * 100).toFixed(0)}%)`,
                    wrist.x * canvas.width,
                    wrist.y * canvas.height - 10
                );
            });

            requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, [hands, isTracking]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10,
            }}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
};

export default DebugOverlay;
