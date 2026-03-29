// Game utility functions

import { Position, ProjectItem, Airplane } from './types';

// Smooth interpolation for airplane movement
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// Calculate distance between two points
export function distance(p1: Position, p2: Position): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Circle collision detection
export function checkCollision(
  airplane: Airplane,
  project: ProjectItem
): boolean {
  const dist = distance(airplane.position, project.position);
  return dist < airplane.size / 2 + project.radius;
}

// Calculate rotation angle based on movement direction
export function calculateRotation(current: Position, target: Position): number {
  const dx = target.x - current.x;
  const dy = target.y - current.y;
  return Math.atan2(dy, dx);
}

// Generate random position for project spawn
export function getRandomSpawnPosition(
  canvasWidth: number,
  canvasHeight: number,
  margin: number = 100
): Position {
  const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  
  switch (side) {
    case 0: // top
      return { x: Math.random() * canvasWidth, y: -margin };
    case 1: // right
      return { x: canvasWidth + margin, y: Math.random() * canvasHeight };
    case 2: // bottom
      return { x: Math.random() * canvasWidth, y: canvasHeight + margin };
    case 3: // left
      return { x: -margin, y: Math.random() * canvasHeight };
    default:
      return { x: canvasWidth / 2, y: -margin };
  }
}

// Generate random velocity
export function getRandomVelocity(): { vx: number; vy: number } {
  const speed = 0.5 + Math.random() * 1;
  const angle = Math.random() * Math.PI * 2;
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}
