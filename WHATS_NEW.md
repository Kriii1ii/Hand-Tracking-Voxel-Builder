# Voxel Builder - What's New

## Summary of Updates

Your Hand-Tracked Voxel Builder has been completely redesigned with new features and a beautiful coffee brown and baby pink color scheme!

## New Color Scheme

**Coffee Brown and Baby Pink Palette:**
- **Coffee Brown (#4A3728):** Headers, text, borders
- **Baby Pink (#FFB6C1):** Voxels, accent buttons, highlights
- **Tan/Beige (#D4A574):** Secondary buttons, accents
- **Cream (#F5EBE0, #E8DDD3):** Backgrounds

The warm, cozy aesthetic creates a pleasant building environment!

## New Features

### 1. Continuous Drawing Mode
**Hold the pinch gesture to draw lines!**

- **Before:** One voxel per pinch
- **Now:** Hold pinch while moving = continuous line of voxels

**How it works:**
- Pinch index finger and thumb together
- KEEP THEM PINCHED (don't release)
- Move your hand in any direction
- Voxels appear continuously along your path
- Release to stop drawing

**Perfect for:**
- Building walls
- Drawing outlines
- Creating structures quickly
- Making long edges

### 2. Save Your Creations
**New "Save Creation" button!**

- Click to download your voxel structure as JSON
- File includes all voxel positions and colors
- Filename includes timestamp for organization
- Keep backups of your builds!

**File format:**
```json
[
  { "position": [x, y, z], "color": "#FFB6C1" },
  ...
]
```

### 3. Clear All Button
**Start fresh with one click!**

- Removes all voxels from the scene
- Includes confirmation dialog (won't accidentally delete)
- Great for starting new projects

### 4. Voxel Counter
**Track your progress!**

- Real-time count of placed voxels
- Displayed in the STATS section
- See how complex your creation is

### 5. Pixel Art Cats
**Cute decorations!**

- Pixel art cats in corners of the interface
- White cats with green eyes
- Adds personality to the UI

### 6. Clear Camera Feed
**Better visibility!**

- Camera feed is now fully opaque
- No more semi-transparent overlay
- Easier to see your hand and tracking landmarks

## How to Build Different Structures

### Building a House

**1. Foundation (Floor):**
- Hold pinch, draw a square outline
- Fill with parallel lines

**2. Walls:**
- At each corner, draw vertical lines upward
- Connect tops with horizontal lines
- Fill in walls with more horizontal lines
- Leave gaps for doors/windows

**3. Roof:**
- Draw diagonal lines from wall tops to center
- Create peaked or flat roof
- Add details

**4. Details:**
- Single voxels for decorations
- Small stack for chimney
- Creative touches!

### Making Circles (Approximate)

**Remember:** Voxels are cubes, so circles will be blocky!

**Technique:**
1. Hold pinch
2. Move hand in circular motion
3. Keep consistent distance from center
4. Complete the circle

**Tips:**
- Larger circles (5-10 voxel radius) look better
- Move slowly for smoother curves
- Practice makes perfect!
- Consider octagons (8-sided) instead

### Drawing Smooth Lines

**For best results:**
- Move hand SLOWLY while holding pinch
- System places voxels every 100ms
- Slow movement = solid line
- Fast movement = gaps

**The system interpolates between positions:**
- Fills gaps automatically
- Creates smooth continuous lines
- Works best with steady hand movement

## Gesture Controls

### Quick Reference

| Gesture | Action | Use Case |
|---------|--------|----------|
| Quick pinch | Single voxel | Precise placement, details |
| Hold pinch + move | Draw line | Walls, edges, outlines |
| Move hand left/right | Position cursor horizontally | Navigate space |
| Move hand up/down | Position cursor vertically | Build height |
| Move hand forward/back | Position cursor in depth | 3D positioning |
| Release pinch | Stop drawing | End current line |

### Visual Feedback

**In camera feed:**
- Coffee brown lines: Hand skeleton
- Pink dots: Index and thumb tips (pinch points)
- Tan dots: Other finger joints

**In 3D scene:**
- Pink cubes: Your voxels
- Pink sphere: Hand cursor (placement position)
- Grid floor: Reference for positioning

## Tips for Success

### Best Practices

**Lighting:**
- Bright, even lighting on your hand
- Avoid backlighting
- Natural daylight or room lights

**Hand Position:**
- Palm facing camera
- 1-2 feet away
- Fully visible in frame
- Steady movements

**Building:**
- Start simple (lines, squares)
- Build bottom-to-top
- Rotate view often (click and drag)
- Use grid floor as reference

### Common Issues

**Gaps in lines?**
- Move slower
- System needs time to place voxels

**Unwanted voxels?**
- Release pinch fully between actions
- Ensure fingers separate completely

**Can't make smooth circles?**
- Voxels are cubes - circles will be blocky
- Try larger circles
- Move very slowly
- Consider other shapes

## File Management

### Saving

**When to save:**
- After completing a structure
- Before clearing to start new project
- To create backups
- To share with others

**File naming:**
- Automatic timestamp: `voxel-creation-1234567890.json`
- Rename files for organization
- Keep in dedicated folder

### Future: Loading

**Coming soon:**
- Load saved creations
- Edit existing structures
- Share and import others' builds

## Performance Notes

**Voxel limits:**
- Handles hundreds of voxels easily
- May slow with 500+ voxels
- Clear and rebuild if laggy

**Placement speed:**
- Max 10 voxels per second (continuous mode)
- Prevents overwhelming the system
- Ensures smooth performance

## What's Next?

**Planned features:**
- Load saved creations
- Multiple voxel colors
- Erase mode (remove voxels)
- Undo/redo functionality
- Shape templates
- Two-hand mode
- Export to 3D formats (OBJ, STL)

---

## Quick Start

1. **Show hand to camera** → Wait for "TRACKING"
2. **Position hand** → Pink sphere shows where voxel will be
3. **Quick pinch** → Place single voxel
4. **Hold pinch + move** → Draw continuous line
5. **Click "Save Creation"** → Download your build
6. **Click "Clear All"** → Start fresh

**Have fun building!** 🏗️

The continuous drawing mode makes it much easier to create complex structures like houses, walls, and more. Experiment with different techniques and see what you can create!
