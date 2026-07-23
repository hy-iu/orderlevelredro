/**
 * Comprehensive TypeScript Type Definitions for Physics Scale Space Architecture
 */

export type ObjectType =
  | 'fundamental'
  | 'composite'
  | 'bound-state'
  | 'phase'
  | 'astro-object'
  | 'out-of-equilibrium'
  | 'probe'
  | 'quantum-material'
  | 'hardware'
  | 'frontier'
  | 'theory'
  | 'method'
  | string;

export interface Coords2D {
  x: number;
  y: number;
}

export interface ErrorBar {
  dx: number;
  dy: number;
}

export interface DomainBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface AcademicDomain {
  id: string;
  name: string;
  code: string;
  color: string;
  bounds: DomainBounds;
  eftCutoff: string;
  description: string;
  radius?: number;
  center?: [number, number, number];
}

export interface ForceRangeCoords {
  xStart: number;
  xEnd: number;
  y: number;
}

export interface FundamentalForce {
  id: string;
  name: string;
  carrier: string;
  rangeLength: string;
  rangeCoords: ForceRangeCoords;
  color: string;
  description: string;
}

export interface NodeSpecs {
  length?: string;
  energy?: string;
  time?: string;
  lagrangian?: string;
  decayWidth?: string;
  coherenceTime?: string;
  temperature?: string;
  qubitCount?: string;
  gateFidelity?: string;
  mass?: string;
  radius?: string;
  entropy?: string;
  [key: string]: string | undefined;
}

export interface PhysicsNode {
  id: string;
  label?: string;
  title?: string;
  name?: string;
  pdgCode?: string;
  domainId?: string;
  coords: Coords2D | { x: number; y: number } | any;
  errorBar?: ErrorBar | null;
  symbol?: string;
  type?: ObjectType;
  specs?: NodeSpecs;
  annotation?: string;
  abstract?: string;
  description?: string;
  color?: string;
  size?: number;
  legs?: string[];
  points?: { x: number; y: number; label?: string }[];
  [key: string]: any;
}

export interface ResearchRoutePoint {
  x: number;
  y: number;
  label?: string;
}

export interface ResearchRoute {
  id: string;
  title?: string;
  name?: string;
  label?: string;
  type?: 'frontier' | 'theory' | 'experiment' | 'quantum-hardware' | 'method' | string;
  color?: string;
  strokeWidth?: number;
  dashArray?: string;
  coords?: Coords2D | { x: number; y: number } | any;
  points?: ResearchRoutePoint[];
  legs?: string[];
  description?: string;
  annotation?: string;
  abstract?: string;
  specs?: NodeSpecs;
  pdgCode?: string;
  [key: string]: any;
}

export interface EquivalenceRelation {
  id: string;
  type?: 'rg-flow' | 'duality' | 'model-correspondence' | string;
  source?: string;
  target?: string;
  label?: string;
  title?: string;
  equation?: string;
  leftFormula?: string;
  rightFormula?: string;
  category?: string;
  scaleValue?: string;
  description?: string;
  details?: string;
  [key: string]: any;
}

export interface QuantumHardwareRoute {
  id: string;
  name: string;
  physicalPlatform: string;
  coherenceT1: string;
  gateFidelity: string;
  scaleRange: string;
  coords: Coords2D;
  color: string;
  pros: string;
  cons: string;
  [key: string]: any;
}

export interface CanvasTransform {
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
}

export interface ViewportState {
  scale: number;
  zoom?: number;
  offsetX: number;
  offsetY: number;
  panX?: number;
  panY?: number;
}
