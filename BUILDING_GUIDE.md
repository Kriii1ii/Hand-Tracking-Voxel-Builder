# Voxel Builder - Complete Guide

## New Features

### Continuous Drawing Mode
You can now draw continuous lines of voxels by holding the pinch gesture while moving your hand! This makes it much easier to build walls, structures, and complex shapes.

### Save Your Creations
Click the "Save Creation" button to download your voxel structure as a JSON file. You can reload it later or share it with others.

### Clear All
The "Clear All" button removes all voxels from the scene, letting you start fresh.

## How to Use Your Hands

### The Pinch Gesture

**What it is:**
Bringing your index finger tip and thumb tip together.

**Two modes:**

1. **Quick Pinch (Single Voxel)**
   - Pinch your fingers together
   - Release immediately
   - One voxel appears at your hand position

2. **Hold Pinch (Continuous Drawing)**
   - Pinch your fingers together
   - KEEP THEM PINCHED while moving your hand
   - Voxels appear continuously along your hand's path
   - Release to stop drawing

### Moving Your Hand

**Left/Right:** Move hand left or right → cursor moves horizontally
**Up/Down:** Move hand up or down → cursor moves vertically  
**Forward/Back:** Move hand toward or away from camera → cursor moves in depth

The pink glowing sphere shows where voxels will be placed.

## Building Techniques

### Drawing Lines
1. Position your hand at the starting point
2. Pinch and HOLD
3. Move your hand slowly to the end point
4. Release the pinch

**Perfect for:** Walls, edges, outlines

### Drawing Walls
1. Draw a horizontal line (hold pinch, move left/right)
2. Move hand up slightly
3. Draw another horizontal line
4. Repeat to build up the wall

**Perfect for:** House walls, fences, barriers

### Building Circles (Approximation)
1. Position hand at one point on the circle
2. Pinch and hold
3. Move your hand in a circular motion
4. Try to keep the same distance from the center
5. Complete the circle and release

**Note:** Voxels are cubes on a grid, so circles will be pixelated/blocky. The smaller the circle, the blockier it will be. Larger circles (5-10 voxel radius) look better.

**Tips for better circles:**
- Move your hand slowly and steadily
- Keep consistent distance from center
- Practice makes perfect!

### Building a Simple House

**Step 1: Foundation**
- Draw a square outline on the ground using continuous lines
- Fill in the floor by drawing parallel lines

**Step 2: Walls**
- Draw vertical lines at each corner
- Connect them with horizontal lines at the top
- Fill in the walls with more horizontal lines

**Step 3: Roof**
- Draw diagonal lines from the top of walls toward the center
- Create a peaked or flat roof

**Step 4: Details**
- Leave gaps for doors and windows
- Add a chimney with a small vertical stack
- Decorate with single voxels

## Advanced Techniques

### Smooth Curves
- Move your hand very slowly while holding pinch
- The system interpolates between positions for smoother lines
- Faster movement = gaps between voxels
- Slower movement = solid continuous line

### 3D Structures
- Build in layers (bottom to top)
- Use the depth control (move hand toward/away from camera)
- Rotate the view (click and drag on 3D scene) to see all sides

### Precision Placement
- Move hand slowly to position cursor exactly
- Wait for cursor to stabilize
- Then pinch to place voxel
- Release and reposition for next voxel

## Saving and Loading

### To Save Your Creation
1. Click "Save Creation" button
2. A JSON file downloads automatically
3. File name includes timestamp: `voxel-creation-1234567890.json`

### File Format
The JSON file contains an array of voxels:
```json
[
  {
    "position": [x, y, z],
    "color": "#FFB6C1"
  },
  ...
]
```

### To Load (Future Feature)
Currently, you can save but not reload. Loading functionality will be added in a future update. For now, you can:
- Keep your JSON files as backups
- Share them with others
- Use them as references

## Tips and Tricks

### For Best Results

**Lighting:**
- Ensure good lighting on your hand
- Avoid backlighting (light behind you)
- Natural daylight or bright room lighting works best

**Hand Position:**
- Keep palm facing camera
- Stay 1-2 feet away from camera
- Keep hand fully visible in frame

**Drawing:**
- Move slowly for continuous lines
- Quick pinches for single voxels
- Practice the pinch gesture to get consistent results

**Building:**
- Start with simple shapes (squares, lines)
- Build bottom-to-top for stability (visual reference)
- Rotate view often to see all sides
- Use the grid floor as a reference

### Common Issues

**Gaps in lines?**
- You're moving too fast
- Slow down your hand movement
- The system places voxels every 100ms

**Unwanted voxels?**
- Release pinch completely between actions
- Make sure fingers separate fully
- Check that status shows "TRACKING"

**Can't draw circles?**
- Remember: voxels are cubes on a grid
- Circles will always be blocky
- Larger circles look smoother
- Try drawing octagons instead (8-sided shapes)

**Hand not detected?**
- Show palm to camera
- Improve lighting
- Move closer (but not too close)
- Ensure solid background

## Color Scheme

The interface uses a warm, cozy color palette:
- **Coffee Brown (#4A3728):** Text, borders, outlines
- **Baby Pink (#FFB6C1):** Voxels, accents, buttons
- **Tan/Beige (#D4A574):** Secondary elements
- **Cream (#F5EBE0):** Backgrounds

## Keyboard and Mouse

**Mouse:**
- Click and drag on 3D scene → Rotate camera
- Scroll wheel → Zoom in/out

**Buttons:**
- "Save Creation" → Download voxels as JSON
- "Clear All" → Remove all voxels (with confirmation)

## Performance

**Voxel Limits:**
- The system can handle hundreds of voxels
- Performance may slow with 500+ voxels
- If laggy, clear some voxels and rebuild

**Frame Rates:**
- Hand tracking: 30-60 FPS
- 3D rendering: 60 FPS
- Voxel placement: 10 per second max (when holding pinch)

## What You're Seeing

**In the video feed:**
- **Coffee brown lines:** Hand skeleton connections
- **Pink dots:** Index finger tip and thumb tip (pinch points)
- **Tan dots:** Other finger joints

**In the 3D scene:**
- **Pink cubes:** Your voxels
- **Pink sphere:** Hand cursor (where next voxel will be placed)
- **Grid floor:** Reference for positioning
- **Shadows:** Make voxels look 3D

## Future Features

Planned enhancements:
- Load saved creations
- Multiple voxel colors
- Erase mode (remove voxels)
- Undo/redo
- Shape templates (cube, sphere, pyramid)
- Two-hand mode
- Export to 3D formats (OBJ, STL)

## Technical Details

**Hand Tracking:**
- MediaPipe Hand Landmarker (CNN-based deep learning)
- 21 landmarks tracked in 3D space
- Real-time at 30-60 FPS

**Gesture Detection:**
- Pinch threshold: 4% of hand size
- Continuous drawing: 100ms between voxels
- Line interpolation for smooth curves

**3D Rendering:**
- Three.js with React Three Fiber
- Real-time shadows and lighting
- Voxel grid: 20×15×10 units

## Credits

- **MediaPipe:** Google's ML framework
- **Three.js:** 3D graphics
- **React:** UI framework
- **Pixel cats:** Decorative elements

---

**Have fun building!** 🏗️

Remember: Practice makes perfect. Start with simple shapes and work your way up to complex structures!
