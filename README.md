# Hand Tracking Voxel Builder

A computer vision-based 3D voxel editor that allows users to create and manipulate 3D structures using hand gestures instead of traditional mouse and keyboard controls.

## Features
- Real-time hand tracking using a webcam.
- Gesture-based voxel placement and deletion.
- Interactive 3D object manipulation.
- Hand-controlled rotation and movement.
- Interactive 3D visualization.

## Tech Stack
- **Programming:** Python
- **Computer Vision:** OpenCV, MediaPipe
- **3D Rendering:** OpenGL, ModernGL
- **Application Interface:** Pygame
- **Numerical Processing:** NumPy
- **Mathematics:** Pyrr

## How It Works
1. Captures live webcam input.
2. Detects hand landmarks using MediaPipe.
3. Interprets hand movements and gestures.
4. Converts recognized gestures into voxel editing actions.
5. Renders the resulting 3D structure.

## Installation

```bash
git clone https://github.com/Kriii1ii/Hand-Tracking-Voxel-Builder.git
cd Hand-Tracking-Voxel-Builder

pip install -r requirements.txt
```

## Run

```bash
python main.py
```

A webcam and OpenGL-compatible system are required.

## Future Improvements
- Improve gesture recognition accuracy.
- Expand 3D construction and editing capabilities.
- Enhance interaction responsiveness and tracking stability.
