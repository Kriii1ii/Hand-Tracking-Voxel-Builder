# Hand-Tracking Voxel Builder

Build 3D voxel structures in your browser using nothing but your hand and a webcam. A MediaPipe hand-tracking model reads your hand from the camera feed, and a Three.js scene turns your pinch gestures into voxels in real time.

## Features

- **Real-time hand tracking** – 21 hand landmarks tracked via MediaPipe Hand Landmarker (GPU delegate).
- **Pinch to build** – pinch index finger and thumb to place a voxel; hold the pinch and move to draw continuous lines.
- **3D cursor** – a gold sphere follows your index fingertip so you can see where the next voxel lands.
- **Glowing wireframe voxels** – magenta (`#FF00FF`) cubes with a subtle pulse animation.
- **Live camera overlay** – mirrored webcam feed with the hand skeleton drawn on top.
- **Save / Clear** – export your build as a JSON file (positions + colors), or clear everything.
- Runs fully client-side; no backend and no video leaves your machine.

## Tech Stack

| Purpose | Library |
|---|---|
| UI | React 18 |
| 3D rendering | Three.js, @react-three/fiber, @react-three/drei |
| Hand tracking | @mediapipe/tasks-vision |
| State | Zustand |
| Build / dev server | Vite 5 |

## Getting Started

### Prerequisites

- Node.js 18+
- A webcam
- A modern browser with WebGL and camera support (Chrome or Edge recommended)

### Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and allow camera access when prompted.

### Other scripts

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

> The hand-landmark model is downloaded at runtime from Google's MediaPipe storage, so an internet connection is required on first load.

## How to Use

1. Show your hand to the camera, palm facing forward, in good lighting.
2. Wait for the status indicator to show **TRACKING**.
3. Move your hand – the cursor follows your index fingertip.
4. **Pinch** (index + thumb together) to place a voxel.
5. **Hold the pinch and move** to draw a line of voxels.
6. Use **Save** to download your creation as JSON, or **Clear All** to start over.

| Action | Input |
|---|---|
| Place voxel / draw | Pinch index finger + thumb |
| Move cursor left/right/up/down | Move hand |
| Move cursor forward/back | Move hand toward/away from camera |
| Export build | "Save" button (downloads `voxel-creation-<timestamp>.json`) |
| Clear everything | "Clear All" button |

See [QUICK_START.md](QUICK_START.md) for a short walkthrough and [USER_GUIDE.md](USER_GUIDE.md) for the full guide and troubleshooting.

## Project Structure

```
src/
├── app/          App root and 3D scene (VoxelScene, Scene)
├── hand/         Webcam feed, MediaPipe loading, tracking and gesture hooks
├── config/       Tunable settings (gesture thresholds, MediaPipe, voxel grid)
├── math/         Coordinate mapping and smoothing helpers
├── state/        Zustand stores for hand data and voxels
├── ui/           Debug overlay
├── voxels/       Voxel grid data structure
└── interaction/  Reserved for cursor / raycasting logic
```

## Configuration

- [src/config/gestures.js](src/config/gestures.js) – `PINCH_THRESHOLD` (default `0.04`), debounce time.
- [src/config/mediapipe.js](src/config/mediapipe.js) – model path, number of hands, confidence thresholds.
- [src/config/voxels.js](src/config/voxels.js) – voxel size, grid size, max voxels.

## Troubleshooting

- **Hand not detected** – improve lighting, keep your palm facing the camera, stay 1–2 feet away and inside the frame.
- **Pinch not registering** – bring fingertips fully together, or raise `PINCH_THRESHOLD`.
- **Jittery cursor** – use a plain background and keep your hand steady.
- **Camera blocked** – allow camera permission in the browser; camera access requires `localhost` or HTTPS.


