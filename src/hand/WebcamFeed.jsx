import React, { useRef, useEffect, useState } from 'react';
import { useHandTracking } from './useHandTracking';
import { useHandStore } from '../state/useHandStore';
import { useVoxelStore } from '../state/useVoxelStore';

/**
 * Retro bookstore-inspired UI with rounded design
 * Colors: Burgundy (#6B1C23), Black (#1A1A1A), Gold (#D4A574), Dark Red (#8B2635), Cream (#F5EBE0)
 */
const WebcamFeed = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [streamReady, setStreamReady] = useState(false);
    const { isReady } = useHandTracking(videoRef);
    const hands = useHandStore((state) => state.hands);
    const voxels = useVoxelStore((state) => state.voxels);
    const clearVoxels = useVoxelStore((state) => state.clearVoxels);

    // Load custom fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&family=Gochi+Hand&family=Poppins:wght@400;600&family=Quicksand:wght@400;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    useEffect(() => {
        const initWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        facingMode: 'user'
                    }
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStreamReady(true);
                }
            } catch (err) {
                console.error('Failed to access webcam:', err);
            }
        };

        initWebcam();

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    // Draw hand landmarks
    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d');

        const HAND_CONNECTIONS = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [0, 9], [9, 10], [10, 11], [11, 12],
            [0, 13], [13, 14], [14, 15], [15, 16],
            [0, 17], [17, 18], [18, 19], [19, 20],
            [5, 9], [9, 13], [13, 17]
        ];

        const draw = () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            hands.forEach((hand) => {
                ctx.strokeStyle = '#8B2635';
                ctx.lineWidth = 2;
                ctx.shadowColor = '#D4A574';
                ctx.shadowBlur = 10;
                HAND_CONNECTIONS.forEach(([start, end]) => {
                    const startPt = hand.landmarks[start];
                    const endPt = hand.landmarks[end];
                    ctx.beginPath();
                    ctx.moveTo(startPt.x * canvas.width, startPt.y * canvas.height);
                    ctx.lineTo(endPt.x * canvas.width, endPt.y * canvas.height);
                    ctx.stroke();
                });

                hand.landmarks.forEach((pt, idx) => {
                    const x = pt.x * canvas.width;
                    const y = pt.y * canvas.height;

                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, 2 * Math.PI);

                    if (idx === 8 || idx === 4) {
                        ctx.fillStyle = '#D4A574';
                    } else {
                        ctx.fillStyle = '#4A5568';
                    }

                    ctx.fill();
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });
            });

            requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, [hands]);

    const handleSave = () => {
        const voxelData = Array.from(voxels.values()).map(v => ({
            position: v.position,
            color: v.color
        }));

        const dataStr = JSON.stringify(voxelData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `voxel-creation-${Date.now()}.json`;
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        if (confirm('Clear all voxels?')) {
            clearVoxels();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'transparent',
            overflow: 'hidden',
            zIndex: 1,
            pointerEvents: 'none',
            fontFamily: '\'Just Me Again Down Here\', cursive'
        }}>
            {/* Pixel Art Black Cat - Bottom Right */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                width: '80px',
                height: '60px',
                zIndex: 100,
                imageRendering: 'pixelated'
            }}>
                {/* Cat body and head */}
                <svg width="80" height="60" viewBox="0 0 80 60" style={{ imageRendering: 'pixelated' }}>
                    {/* Main body */}
                    <rect x="10" y="30" width="50" height="25" fill="#000" />
                    {/* Head */}
                    <rect x="40" y="15" width="30" height="25" fill="#000" />
                    {/* Ears */}
                    <rect x="40" y="10" width="8" height="8" fill="#000" />
                    <rect x="62" y="10" width="8" height="8" fill="#000" />
                    {/* Legs */}
                    <rect x="15" y="50" width="8" height="10" fill="#000" />
                    <rect x="30" y="50" width="8" height="10" fill="#000" />
                    <rect x="45" y="50" width="8" height="10" fill="#000" />
                    {/* Tail */}
                    <rect x="5" y="25" width="8" height="15" fill="#000" />
                    <rect x="0" y="20" width="8" height="8" fill="#000" />
                    {/* Eyes - green */}
                    <rect x="48" y="22" width="6" height="6" fill="#90EE90" />
                    <rect x="58" y="22" width="6" height="6" fill="#90EE90" />
                    {/* White chest/belly detail */}
                    <rect x="20" y="38" width="12" height="12" fill="#FFF" />
                    {/* Gray shading */}
                    <rect x="25" y="52" width="4" height="4" fill="#666" />
                    <rect x="48" y="52" width="4" height="4" fill="#666" />
                </svg>
            </div>

            {/* Main Container with Gingham Bow Border - Fullscreen */}
            <div style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: '24px solid',
                borderImage: `repeating-linear-gradient(
                    45deg,
                    #8B2635 0px,
                    #8B2635 15px,
                    #F5EBE0 15px,
                    #F5EBE0 30px,
                    #8B2635 30px,
                    #8B2635 45px,
                    #F5EBE0 45px,
                    #F5EBE0 60px
                ) 24`,
                borderRadius: '40px',
                boxShadow: 'inset 0 0 0 4px #8B2635, 0 0 40px rgba(139, 38, 53, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                pointerEvents: 'none' // Root container transparent to events
            }}>
                {/* HUD Active Circles (Ironman style) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    opacity: 0.3,
                    background: 'radial-gradient(circle at center, transparent 30%, rgba(139, 38, 53, 0.1) 100%)'
                }} />
                {/* Decorative Bow at Top Center */}
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100
                }}>
                    <svg width="80" height="60" viewBox="0 0 80 60" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                        {/* Left bow loop */}
                        <ellipse cx="20" cy="30" rx="18" ry="25" fill="#8B2635" opacity="0.9" />
                        <ellipse cx="20" cy="30" rx="14" ry="20" fill="#F5EBE0" opacity="0.3" />

                        {/* Right bow loop */}
                        <ellipse cx="60" cy="30" rx="18" ry="25" fill="#8B2635" opacity="0.9" />
                        <ellipse cx="60" cy="30" rx="14" ry="20" fill="#F5EBE0" opacity="0.3" />

                        {/* Center knot */}
                        <circle cx="40" cy="30" r="12" fill="#6B1C23" />
                        <circle cx="40" cy="30" r="8" fill="#F5EBE0" opacity="0.2" />

                        {/* Ribbon tails */}
                        <path d="M 35 42 Q 30 50 25 58" stroke="#8B2635" strokeWidth="8" fill="none" opacity="0.8" />
                        <path d="M 45 42 Q 50 50 55 58" stroke="#8B2635" strokeWidth="8" fill="none" opacity="0.8" />
                    </svg>
                </div>

                {/* Header */}
                <div style={{
                    background: '#6B1C23',
                    borderBottom: '4px solid #1A1A1A',
                    padding: '20px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '20px 20px 0 0',
                    zIndex: 20,
                    pointerEvents: 'auto'
                }}>
                    <h1 style={{ margin: 0, fontSize: '42px', color: '#D4A574', fontWeight: '400', fontFamily: '\'Just Me Again Down Here\', cursive', letterSpacing: '2px' }}>
                        VOXEL BUILDER
                    </h1>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '15px',
                        color: '#D4A574',
                        fontFamily: '\'Gochi Hand\', cursive'
                    }}>
                        <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: hands.length > 0 ? '#D4A574' : '#8B2635',
                            border: '3px solid #1A1A1A',
                            animation: hands.length > 0 ? 'pulse 1.5s ease-in-out infinite' : 'none',
                            boxShadow: hands.length > 0 ? '0 0 12px #D4A574' : 'none'
                        }} />
                        <span style={{ fontWeight: '600', fontFamily: '\'Quicksand\', sans-serif', letterSpacing: '1px' }}>
                            {hands.length > 0 ? 'TRACKING' : 'WAITING'}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    overflow: 'hidden'
                }}>
                    {/* Video Area */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <div style={{
                            flex: 1,
                            background: '#1A1A1A',
                            border: '4px solid #1A1A1A',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: 'scaleX(-1)',
                                        opacity: 0.6 // Slightly transparent for Tony Stark vibe
                                    }}
                                />

                                {/* Tony Stark HUD Elements */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    pointerEvents: 'none',
                                    zIndex: 5
                                }}>
                                    <svg width="100%" height="100%" viewBox="0 0 1000 600">
                                        <g stroke="#D4A574" fill="none" opacity="0.4">
                                            {/* Corner brackets */}
                                            <path d="M 50 50 L 100 50 M 50 50 L 50 100" strokeWidth="2" />
                                            <path d="M 950 50 L 900 50 M 950 50 L 950 100" strokeWidth="2" />
                                            <path d="M 50 550 L 100 550 M 50 550 L 50 500" strokeWidth="2" />
                                            <path d="M 950 550 L 900 550 M 950 550 L 950 500" strokeWidth="2" />

                                            {/* Glowing circles */}
                                            <circle cx="500" cy="300" r="280" strokeWidth="0.5" strokeDasharray="10 5" className="hud-circle" />
                                            <circle cx="500" cy="300" r="250" strokeWidth="1" strokeDasharray="5 20" className="hud-circle-reverse" />
                                            <circle cx="500" cy="300" r="200" strokeWidth="0.2" opacity="0.2" />

                                            {/* Center markers */}
                                            <line x1="480" y1="300" x2="520" y2="300" strokeWidth="1" />
                                            <line x1="500" y1="280" x2="500" y2="320" strokeWidth="1" />
                                        </g>
                                    </svg>
                                </div>
                                <canvas
                                    ref={canvasRef}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        transform: 'scaleX(-1)',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Controls */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={handleSave}
                                style={{
                                    background: '#D4A574',
                                    border: '4px solid #1A1A1A',
                                    borderRadius: '16px',
                                    padding: '14px 32px',
                                    fontSize: '16px',
                                    fontFamily: '\'Just Me Again Down Here\', cursive',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    color: '#1A1A1A',
                                    pointerEvents: 'auto',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)',
                                    zIndex: 25
                                }}
                                onMouseDown={(e) => { e.target.style.transform = 'scale(0.95)'; e.target.style.boxShadow = '0 2px 6px rgba(212, 165, 116, 0.3)'; }}
                                onMouseUp={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(212, 165, 116, 0.3)'; }}
                            >
                                Save Creation
                            </button>
                            <button
                                onClick={handleClear}
                                style={{
                                    background: '#8B2635',
                                    border: '4px solid #1A1A1A',
                                    borderRadius: '16px',
                                    padding: '14px 32px',
                                    fontSize: '16px',
                                    fontFamily: '\'Just Me Again Down Here\', cursive',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    color: '#F5EBE0',
                                    pointerEvents: 'auto',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 12px rgba(139, 38, 53, 0.3)',
                                    zIndex: 25
                                }}
                                onMouseDown={(e) => { e.target.style.transform = 'scale(0.95)'; e.target.style.boxShadow = '0 2px 6px rgba(139, 38, 53, 0.3)'; }}
                                onMouseUp={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(139, 38, 53, 0.3)'; }}
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div style={{
                        width: '340px',
                        background: '#F5EBE0',
                        border: '4px solid #1A1A1A',
                        borderRadius: '20px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        overflowY: 'auto',
                        boxShadow: 'inset 0 4px 12px rgba(26, 26, 26, 0.4)',
                        zIndex: 20,
                        pointerEvents: 'auto'
                    }}>
                        <div>
                            <h3 style={{ margin: '0 0 6px 0', fontSize: '24px', color: '#6B1C23', fontFamily: '\'Just Me Again Down Here\', cursive', fontWeight: 'bold' }}>
                                How to Build
                            </h3>
                            <p style={{ margin: 0, fontSize: '12px', color: '#1A1A1A', lineHeight: '1.5', fontFamily: '\'Poppins\', sans-serif' }}>
                                Use hand gestures to create 3D voxel structures
                            </p>
                        </div>

                        <div style={{
                            background: '#6B1C23',
                            border: '3px solid #1A1A1A',
                            borderRadius: '14px',
                            padding: '16px',
                            boxShadow: '0 4px 12px rgba(107, 28, 35, 0.2)'
                        }}>
                            <div style={{ fontSize: '13px', color: '#D4A574', marginBottom: '10px', fontWeight: '700', fontFamily: '\'Quicksand\', sans-serif', letterSpacing: '1.5px' }}>
                                GESTURES
                            </div>
                            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#F5EBE0', fontFamily: '\'Poppins\', sans-serif' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <strong style={{ color: '#D4A574' }}>Hold Pinch:</strong> Draw line
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    <strong style={{ color: '#D4A574' }}>Quick Pinch:</strong> Single voxel
                                </div>
                                <div>
                                    <strong style={{ color: '#D4A574' }}>Move Hand:</strong> Position
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: '#8B2635',
                            border: '3px solid #1A1A1A',
                            borderRadius: '14px',
                            padding: '16px',
                            boxShadow: '0 4px 12px rgba(139, 38, 53, 0.2)'
                        }}>
                            <div style={{ fontSize: '13px', color: '#D4A574', marginBottom: '10px', fontWeight: '700', fontFamily: '\'Quicksand\', sans-serif', letterSpacing: '1.5px' }}>
                                STATS
                            </div>
                            <div style={{ fontSize: '16px', color: '#F5EBE0', fontFamily: '\'Poppins\', sans-serif', fontWeight: '600' }}>
                                <div>Voxels: {voxels.size}</div>
                            </div>
                        </div>

                        <div style={{
                            background: '#D4A574',
                            border: '3px solid #1A1A1A',
                            borderRadius: '14px',
                            padding: '12px',
                            fontSize: '11px',
                            color: '#1A1A1A',
                            lineHeight: '1.5',
                            fontFamily: '\'Just Me Again Down Here\', cursive',
                            fontSize: '18px',
                            boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)'
                        }}>
                            <strong style={{ fontFamily: '\'Playfair Display\', serif' }}>Tip:</strong> Hold the pinch gesture while moving your hand to draw continuous lines of voxels. Great for building walls and structures!
                        </div>

                        {isReady && streamReady && hands.length === 0 && (
                            <div style={{
                                background: '#1A1A1A',
                                border: '3px solid #1A1A1A',
                                borderRadius: '14px',
                                padding: '14px',
                                fontSize: '13px',
                                color: '#D4A574',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                fontFamily: '\'Quicksand\', sans-serif',
                                fontWeight: '600'
                            }}>
                                Show your hand to begin
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {(!isReady || !streamReady) && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#F5EBE0',
                    padding: '36px 60px',
                    borderRadius: '20px',
                    border: '5px solid #1A1A1A',
                    boxShadow: '0 12px 40px rgba(26, 26, 26, 0.4)',
                    fontSize: '18px',
                    fontFamily: '\'Playfair Display\', serif',
                    textAlign: 'center',
                    zIndex: 30,
                    pointerEvents: 'auto',
                    color: '#6B1C23',
                    fontWeight: '700'
                }}>
                    {!streamReady ? 'Requesting Camera Access...' : 'Loading Hand Tracking...'}
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                @keyframes rotateHUD {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .hud-circle {
                    animation: rotateHUD 20s linear infinite;
                    transform-origin: center;
                }
                .hud-circle-reverse {
                    animation: rotateHUD 15s linear infinite reverse;
                    transform-origin: center;
                }
            `}</style>
        </div>
    );
};

export default WebcamFeed;
