// Lightweight spring physics solver inspired by chenglou.me
// Semi-implicit Euler integration, ~1KB gzipped

export interface SpringConfig {
  stiffness: number // spring constant (k)
  damping: number   // damping coefficient (b)
  mass: number
  precision: number // settle threshold
}

export interface SpringState {
  pos: number
  vel: number
  dest: number
  config: SpringConfig
}

export const defaultConfig: SpringConfig = {
  stiffness: 170,
  damping: 26,
  mass: 1,
  precision: 0.01,
}

export function createSpring(
  initial: number = 0,
  config: Partial<SpringConfig> = {}
): SpringState {
  const c = { ...defaultConfig, ...config }
  return { pos: initial, vel: 0, dest: initial, config: c }
}

export function springStep(s: SpringState, dt: number): void {
  const { stiffness, damping, mass } = s.config
  const displacement = s.pos - s.dest
  const springForce = -stiffness * displacement
  const dampingForce = -damping * s.vel
  const acceleration = (springForce + dampingForce) / mass
  s.vel += acceleration * dt
  s.pos += s.vel * dt
}

export function springIsSettled(s: SpringState): boolean {
  const { precision } = s.config
  return (
    Math.abs(s.pos - s.dest) < precision &&
    Math.abs(s.vel) < precision
  )
}

export function springSetTarget(s: SpringState, dest: number): void {
  s.dest = dest
}

export function springSnapToTarget(s: SpringState): void {
  s.pos = s.dest
  s.vel = 0
}
