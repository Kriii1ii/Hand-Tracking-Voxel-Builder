# Quick Start Guide - Hand-Tracked Voxel Builder

## What to Do With Your Hands

### The Pinch Gesture - Place Voxels

**How to make the gesture:**
1. Extend your index finger and thumb
2. Keep your other fingers relaxed
3. Bring your index finger tip and thumb tip together until they touch
4. Hold for a moment, then release

**What it does:**
- Places a green glowing voxel cube at your hand's current 3D position
- Works best with clear, deliberate pinching motions
- System waits 200ms between placements to prevent accidental duplicates

**Tips:**
- Make sure your fingertips actually touch or come very close
- Don't pinch too fast - give the system time to register
- You'll see a console message when a voxel is placed

### Moving Your Hand - Position the Cursor

**Left and Right:**
- Move your entire hand left → cursor moves left
- Move your entire hand right → cursor moves right

**Up and Down:**
- Move your hand up → cursor moves up
- Move your hand down → cursor moves down

**Forward and Backward (Depth):**
- Move your hand closer to the camera → cursor moves forward
- Move your hand away from the camera → cursor moves backward

**The Green Sphere:**
- This is your 3D cursor
- It shows exactly where the next voxel will be placed
- Follows your index finger tip position

## Step-by-Step Building Process

1. **Show your hand** to the camera (palm facing forward)
2. **Wait for "TRACKING"** status to turn green in the right panel
3. **Move your hand** to position the green cursor sphere where you want to build
4. **Pinch** your index finger and thumb together to place a voxel
5. **Release** the pinch
6. **Move** to a new position
7. **Repeat** steps 4-6 to build your structure

## Common Issues

**Hand not detected?**
- Make sure your palm faces the camera
- Improve lighting on your hand
- Move 1-2 feet away from camera
- Keep your hand in the camera frame

**Pinch not working?**
- Bring fingertips closer together
- Use index finger and thumb only
- Make a more deliberate motion
- Check that status shows "TRACKING"

**Cursor jumpy?**
- Improve lighting
- Keep hand steady
- Ensure solid background behind hand

## Controls Summary

| Action | Gesture |
|--------|---------|
| Place voxel | Pinch index finger + thumb together |
| Move cursor left/right | Move hand left/right |
| Move cursor up/down | Move hand up/down |
| Move cursor forward/back | Move hand toward/away from camera |
| Rotate view | Click and drag on 3D scene |
| Zoom | Scroll wheel |

## What You're Seeing

**In the video feed:**
- **Pink lines**: Your hand skeleton (connections between joints)
- **Yellow dots**: Index finger tip and thumb tip (pinch points)
- **Green dot**: Wrist/palm base
- **Blue dots**: Other finger joints

**In the 3D scene:**
- **Green cubes**: Voxels you've placed
- **Green sphere**: Your hand cursor
- **Grid floor**: Reference for spatial positioning
- **Lighting**: Makes voxels look 3D with shadows

## For More Details

See `USER_GUIDE.md` for comprehensive documentation including:
- How the technology works
- Detailed hand landmark information
- Advanced building techniques
- Troubleshooting guide
- Technical specifications
