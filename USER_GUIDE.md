# Hand-Tracked Voxel Builder - User Guide

## Overview

The Hand-Tracked Voxel Builder is an interactive 3D building application that uses computer vision and deep learning to track your hand movements in real-time. You can create 3D voxel structures simply by moving your hand and making gestures in front of your webcam.

## How It Works

### Technology Stack

1. **MediaPipe Hand Landmarker** - A deep learning model (Convolutional Neural Network) that detects and tracks 21 key points on your hand in 3D space
2. **Three.js** - Renders the 3D voxel scene with lighting, shadows, and camera controls
3. **React** - Manages the user interface and application state
4. **Zustand** - Handles state management for voxels and hand tracking data

### The Hand Tracking Process

1. **Camera Input**: Your webcam captures video frames at 30-60 frames per second
2. **Hand Detection**: MediaPipe's palm detection model identifies hand regions in each frame
3. **Landmark Prediction**: A regression network predicts the exact 3D coordinates of 21 hand landmarks
4. **Smoothing**: Temporal filtering reduces jitter and creates smooth hand motion
5. **Gesture Recognition**: Custom algorithms analyze landmark positions to detect gestures
6. **3D Mapping**: Hand coordinates are mapped from 2D camera space to 3D world space
7. **Voxel Placement**: When gestures are detected, voxels are created at the hand's 3D position

## Hand Landmarks

The system tracks 21 points on your hand:

- **0**: Wrist (base of palm)
- **1-4**: Thumb (base to tip)
- **5-8**: Index finger (base to tip)
- **9-12**: Middle finger (base to tip)
- **13-16**: Ring finger (base to tip)
- **17-20**: Pinky finger (base to tip)

### Color Coding

- **Yellow dots**: Index finger tip (8) and thumb tip (4) - primary interaction points
- **Green dot**: Wrist/palm base (0) - tracking anchor
- **Blue dots**: All other finger joints
- **Pink lines**: Connections between landmarks (hand skeleton)

## How to Use Your Hands

### Getting Started

1. **Position yourself**: Sit 1-2 feet away from your webcam
2. **Lighting**: Ensure good lighting on your hand (avoid backlighting)
3. **Hand orientation**: Face your palm toward the camera
4. **Single hand**: The system tracks one hand at a time for precision

### The Pinch Gesture (Place Voxels)

**What it is**: Bringing your index finger tip and thumb tip together

**How to do it**:
1. Extend your index finger and thumb
2. Keep other fingers relaxed or slightly curled
3. Bring the tips of your index finger and thumb together until they touch or nearly touch
4. The system detects when the distance between these two points is less than 4% of the hand size

**What happens**:
- A voxel is placed at your hand's current 3D position
- The voxel appears as a glowing green cube in the 3D scene
- You'll see a log message in the console: "Voxel added at X,Y,Z"

**Tips**:
- Make a clear, deliberate pinch motion
- Hold the pinch for a brief moment (the system has a 200ms cooldown between placements)
- Release and pinch again to place another voxel
- Don't pinch too quickly or the system may skip some placements

### Positioning Your Hand (Move the 3D Cursor)

**Left/Right Movement**:
- Move your hand left → cursor moves left in 3D space
- Move your hand right → cursor moves right in 3D space

**Up/Down Movement**:
- Move your hand up → cursor moves up in 3D space
- Move your hand down → cursor moves down in 3D space

**Depth (Forward/Backward)**:
- Move your hand closer to camera → cursor moves forward in 3D space
- Move your hand away from camera → cursor moves backward in 3D space

**The 3D Cursor**:
- Appears as a glowing green sphere
- Follows your index finger tip position
- Shows exactly where a voxel will be placed when you pinch
- Smoothly interpolates to reduce jitter

### Coordinate Mapping

The system maps your hand position to 3D coordinates:

- **X-axis** (left-right): -10 to +10 units
- **Y-axis** (up-down): -7.5 to +7.5 units  
- **Z-axis** (depth): -10 to 0 units

Voxels snap to integer grid positions, so a hand position of (3.7, 2.3, -5.8) will place a voxel at (3, 2, -5).

## Building Strategies

### Basic Building

1. **Single voxels**: Pinch once to place one voxel
2. **Lines**: Move your hand slowly while holding a pinch
3. **Walls**: Place voxels in a grid pattern by moving systematically
4. **Towers**: Stack voxels vertically by moving your hand up between pinches

### Advanced Techniques

1. **Precision placement**: Move your hand slowly and wait for the cursor to stabilize before pinching
2. **Rapid building**: Quick pinch-release-move-pinch sequences for faster construction
3. **Depth control**: Use forward/backward hand motion to build in 3D layers
4. **Symmetry**: Build on one side, then mirror your movements on the other

## Camera Controls

While building, you can adjust your view of the 3D scene:

- **Orbit**: Click and drag on the 3D scene to rotate the camera around your creation
- **Zoom**: Scroll to zoom in/out (limited to 10-30 units distance)
- **Auto-rotate**: The camera stays focused on the center of your voxel grid

## Troubleshooting

### Hand Not Detected

**Problem**: "WAITING" status shown, no hand landmarks visible

**Solutions**:
- Ensure your hand is fully visible in the camera frame
- Check that camera permissions are granted
- Improve lighting - avoid shadows on your hand
- Move closer to the camera (but not too close)
- Try showing your palm more directly to the camera
- Ensure no objects are blocking your hand

### Tracking is Jittery

**Problem**: Hand cursor jumps around, landmarks flicker

**Solutions**:
- Improve lighting conditions
- Keep your hand steady
- Ensure solid-colored background behind your hand
- Check that your camera is in focus
- Reduce camera exposure if your hand appears washed out

### Voxels Not Placing

**Problem**: Pinch gesture not triggering voxel placement

**Solutions**:
- Make a more pronounced pinch (bring fingertips closer together)
- Check console for "Pinch gesture detected" messages
- Ensure you're pinching with index finger and thumb (not other fingers)
- Wait for the 200ms cooldown between pinches
- Verify the 3D cursor is visible (indicates tracking is active)

### Performance Issues

**Problem**: Low frame rate, laggy response

**Solutions**:
- Close other browser tabs and applications
- Ensure GPU acceleration is enabled in browser settings
- Reduce browser window size
- Clear voxels if you've placed hundreds (performance degrades with many objects)
- Use a more powerful device if available

## Technical Details

### Gesture Detection Thresholds

Configured in `src/config/gestures.js`:

- **PINCH_THRESHOLD**: 0.04 (4% of hand size)
- **GRAB_THRESHOLD**: 0.08 (8% of hand size)
- **DEBOUNCE_TIME**: 150ms (minimum time between gesture triggers)

### Hand Tracking Configuration

Configured in `src/config/mediapipe.js`:

- **Model**: Hand Landmarker (float16 precision)
- **Running Mode**: VIDEO (optimized for real-time streams)
- **Number of Hands**: 1 (single hand tracking)
- **Detection Confidence**: 0.5 (50% minimum)
- **Tracking Confidence**: 0.5 (50% minimum)
- **Delegate**: GPU (hardware acceleration)

### Performance Metrics

- **Hand Detection**: ~30-60 FPS (depends on device)
- **3D Rendering**: 60 FPS (locked to display refresh rate)
- **Gesture Detection**: 200ms cooldown (max 5 actions/second)
- **Smoothing**: 0.4 alpha (40% new data, 60% previous data)

## Keyboard Shortcuts

Currently, there are no keyboard shortcuts. All interaction is gesture-based.

## Future Enhancements

Potential features for future versions:

- **Grab gesture**: Remove voxels by making a fist
- **Two-hand mode**: Use both hands for different actions
- **Color selection**: Change voxel colors with different gestures
- **Save/Load**: Export and import voxel creations
- **Undo/Redo**: Step backward/forward through building history
- **Voxel types**: Different materials (glass, metal, wood)
- **Multiplayer**: Build collaboratively with others

## Credits

- **MediaPipe**: Google's open-source ML framework
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **Zustand**: Lightweight state management

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify camera permissions in browser settings
3. Ensure you're using a modern browser (Chrome, Edge, Firefox)
4. Test with different lighting conditions
5. Try reloading the page

---

**Version**: 1.0.0  
**Last Updated**: February 2026
