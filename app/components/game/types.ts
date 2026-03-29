// Game types and interfaces

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  link: string;
  image: string | null;
  position: Position;
  velocity: Velocity;
  radius: number;
  collected: boolean;
  type: 'cloud' | 'balloon' | 'card';
}

export interface Airplane {
  position: Position;
  targetPosition: Position;
  rotation: number;
  size: number;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  totalProjects: number;
  currentProjectIndex: number;
}
