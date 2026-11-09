/**
 * nForce shape kit: path builders for every shape, drawn inside a box (x, y, w, h).
 * Rounded blocks only (drop, bullet, dome, arch, leaf, pill, circle), plus the "x" data mark.
 * No pointed shapes. Used by Mosaic and the homepage hero.
 */
export type Kind =
  | 'circle' | 'ring' | 'dome' | 'quarter' | 'bullet' | 'pill' | 'arch'
  | 'drop' | 'leaf' | 'square' | 'cross';

const n = (v: number) => Math.round(v * 10) / 10;

export function shapePath(kind: Kind, x: number, y: number, w: number, h: number): string {
  const m = Math.min(w, h);
  switch (kind) {
    case 'circle': {
      const r = m / 2, cx = x + w / 2, cy = y + h / 2;
      return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0z`;
    }
    case 'ring': {
      const r = m / 2, ri = r * 0.48, cx = x + w / 2, cy = y + h / 2;
      return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0zM${n(cx - ri)} ${n(cy)}a${n(ri)} ${n(ri)} 0 1 1 ${n(2 * ri)} 0a${n(ri)} ${n(ri)} 0 1 1 ${n(-2 * ri)} 0z`;
    }
    case 'dome': {
      // half disc sitting on the bottom edge
      const r = w / 2;
      return `M${n(x)} ${n(y + h)}a${n(r)} ${n(r)} 0 0 1 ${n(w)} 0z`;
    }
    case 'quarter': {
      const r = m;
      return `M${n(x)} ${n(y + h)}V${n(y + h - r)}a${n(r)} ${n(r)} 0 0 1 ${n(r)} ${n(r)}z`;
    }
    case 'bullet': {
      // flat left, fully round right end
      const r = h / 2;
      return `M${n(x)} ${n(y)}H${n(x + w - r)}a${n(r)} ${n(r)} 0 0 1 0 ${n(h)}H${n(x)}z`;
    }
    case 'pill': {
      const r = m / 2;
      return w >= h
        ? `M${n(x + r)} ${n(y)}H${n(x + w - r)}a${n(r)} ${n(r)} 0 0 1 0 ${n(h)}H${n(x + r)}a${n(r)} ${n(r)} 0 0 1 0 ${n(-h)}z`
        : `M${n(x)} ${n(y + r)}a${n(r)} ${n(r)} 0 0 1 ${n(w)} 0V${n(y + h - r)}a${n(r)} ${n(r)} 0 0 1 ${n(-w)} 0z`;
    }
    case 'arch': {
      const r = w / 2;
      return `M${n(x)} ${n(y + h)}V${n(y + r)}a${n(r)} ${n(r)} 0 0 1 ${n(w)} 0V${n(y + h)}z`;
    }
    case 'drop': {
      // three round corners, sharp top-right (rotate for other orientations)
      const r = m / 2;
      return `M${n(x + r)} ${n(y)}H${n(x + w)}V${n(y + h - r)}a${n(r)} ${n(r)} 0 0 1 ${n(-r)} ${n(r)}H${n(x + r)}a${n(r)} ${n(r)} 0 0 1 ${n(-r)} ${n(-r)}V${n(y + r)}a${n(r)} ${n(r)} 0 0 1 ${n(r)} ${n(-r)}z`;
    }
    case 'leaf': {
      // round top-left and bottom-right
      const r = m / 2;
      return `M${n(x)} ${n(y + h)}V${n(y + r)}a${n(r)} ${n(r)} 0 0 1 ${n(r)} ${n(-r)}H${n(x + w)}V${n(y + h - r)}a${n(r)} ${n(r)} 0 0 1 ${n(-r)} ${n(r)}z`;
    }
    case 'square':
      return `M${n(x)} ${n(y)}h${n(w)}v${n(h)}h${n(-w)}z`;
    case 'cross': {
      const s = m, a = s * 0.18, cx = x + w / 2, cy = y + h / 2, d = s / 2;
      // an "x" data mark built from two rotated bars
      return `M${n(cx - d)} ${n(cy - d + a)}L${n(cx - d + a)} ${n(cy - d)}L${n(cx)} ${n(cy - a)}L${n(cx + d - a)} ${n(cy - d)}L${n(cx + d)} ${n(cy - d + a)}L${n(cx + a)} ${n(cy)}L${n(cx + d)} ${n(cy + d - a)}L${n(cx + d - a)} ${n(cy + d)}L${n(cx)} ${n(cy + a)}L${n(cx - d + a)} ${n(cy + d)}L${n(cx - d)} ${n(cy + d - a)}L${n(cx - a)} ${n(cy)}z`;
    }
  }
}

/** Gradient direction presets for objectBoundingBox gradients. */
export const angles: Record<number, [number, number, number, number]> = {
  0: [0, 0, 1, 0],
  45: [0, 1, 1, 0],
  90: [0, 0, 0, 1],
  135: [0, 0, 1, 1],
  180: [1, 0, 0, 0],
  270: [0, 1, 0, 0],
};

export const color = (name: string) => (name.startsWith('#') || name.startsWith('var(') ? name : `var(--${name})`);
