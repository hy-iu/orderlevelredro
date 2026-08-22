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

/**
 * errorBar 的语义类型（由 scripts/deriveRanges.mjs 从 specs 推导）：
 * - range: specs 给出文献数值范围，errorBar 为 log 空间半宽（实线绘制）
 * - estimate: specs 只有 ~ 单值，errorBar 为 ±0.3 dex 约定（虚线绘制）
 * - uncertainty: specs 给出 ± 测量不确定度或衰变展宽 Γ/m
 */
export type ErrorBarType = 'range' | 'estimate' | 'uncertainty';

/** 附加标度：t = log10(T/K) 特征温度，tau = log10(τ/s) 特征时间（3D 视图 Z 轴用） */
export interface CoordsMeta {
  t?: number;
  tau?: number;
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
  errorBarType?: ErrorBarType;
  /** 数值来源（如 'PDG 2024'），详情抽屉展示 */
  source?: string;
  /** 坐标约定补充说明（如"取静止系能量"） */
  coordsNote?: string;
  coordsMeta?: CoordsMeta;
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
