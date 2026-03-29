# Project Explorer Game

An interactive HTML5 Canvas game embedded within the Projects section where users control an airplane to collect floating project items.

## Features

- **Embedded Canvas**: Game runs within Projects section (600px height, responsive width)
- **Smooth Airplane Controls**: Airplane follows mouse cursor with smooth interpolation
- **Dynamic Project Items**: 5 projects float around as clouds, balloons, and cards
- **Collision Detection**: Detects when airplane touches project items
- **Interactive Modals**: Shows project details when collected
- **Particle Effects**: Explosion effects on collision
- **Score Tracking**: Tracks collected projects
- **Skip Option**: Users can skip game and view traditional project grid
- **Responsive Design**: Adapts to container width

## Game Mechanics

1. Game appears at the top of Projects section
2. Click "Start Game" to begin
3. Move your mouse within the canvas to control the airplane
4. Fly into floating project items to collect them
5. Game pauses and shows project details in a modal
6. Click "Continue" or "View Project" to resume
7. Click "Skip" to view projects in traditional grid format
8. Collect all projects to complete the game

## Project Types

- **☁️ Cloud**: SkillSprint AI, CINEXUS
- **🎈 Balloon**: Food Label Scanner, Card Processing System
- **📇 Card**: Knowledge Graph

## Integration

The game is embedded in the Projects section (`app/components/Projects.tsx`):
- Dynamically imported to avoid SSR issues
- Shows loading state while initializing
- Can be skipped to show traditional project cards
- Does not affect page layout or scrolling

## File Structure

```
app/components/game/
├── types.ts           # TypeScript interfaces
├── utils.ts           # Utility functions (collision, movement)
├── gameData.ts        # Project data
├── GameCanvas.tsx     # Main game component with canvas rendering
├── ProjectModal.tsx   # Modal for displaying project details
└── README.md          # This file
```

## Technical Details

- Built with React, TypeScript, and HTML5 Canvas
- Uses Framer Motion for modal animations
- Implements smooth lerp interpolation for airplane movement
- Circle-based collision detection within canvas bounds
- Particle system for visual effects
- 60 FPS game loop with requestAnimationFrame
- Canvas size: 100% width × 600px height
- Projects spawn and bounce within canvas boundaries
- Mouse tracking only within canvas area

## Canvas Specifications

- Width: 100% of parent container (responsive)
- Height: Fixed 600px
- Background: Gradient dark theme matching portfolio
- Cursor: Crosshair within canvas
- Border: Rounded with gray border

## Usage

The game automatically appears in the Projects section. Users can:
- Play the game to explore projects interactively
- Skip to view traditional project grid
- View all projects on GitHub via link at bottom

## Future Enhancements

- Mobile touch controls
- Sound effects
- Power-ups
- Multiple difficulty levels
- Leaderboard
- More project types
- Parallax background effects
