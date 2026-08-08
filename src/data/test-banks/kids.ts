import type { CellShape, MatrixCell } from '../questions'
import type { VisualTestItem } from '../../lib/test-catalog'

const ink = '#10141c'
const teal = '#0f766e'
const tealSoft = '#99f6e4'
const amber = '#d97706'
const amberSoft = '#fde68a'
const coral = '#f97316'

type Position =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'left'
  | 'center'
  | 'right'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'

const positions: Record<Position, [number, number]> = {
  topLeft: [24, 24],
  top: [40, 22],
  topRight: [56, 24],
  left: [22, 40],
  center: [40, 40],
  right: [58, 40],
  bottomLeft: [24, 56],
  bottom: [40, 58],
  bottomRight: [56, 56],
}

function frame(stroke = 'rgba(16,20,28,0.16)'): CellShape {
  return { kind: 'rect', x: 8, y: 8, w: 64, h: 64, fill: '#fff', stroke }
}

function cell(...shapes: CellShape[]): MatrixCell {
  return [frame(), ...shapes]
}

function dot(position: Position, fill = teal, radius = 11): MatrixCell {
  const [cx, cy] = positions[position]
  return cell({ kind: 'circle', cx, cy, r: radius, fill, stroke: fill })
}

function dots(items: Position[], fill = teal, radius = 8): MatrixCell {
  return cell(
    ...items.map((position) => {
      const [cx, cy] = positions[position]
      return { kind: 'circle' as const, cx, cy, r: radius, fill, stroke: fill }
    }),
  )
}

function circle(fill = tealSoft, stroke = teal, radius = 20): MatrixCell {
  return cell({ kind: 'circle', cx: 40, cy: 40, r: radius, fill, stroke })
}

function square(fill = amberSoft, stroke = amber, size = 38): MatrixCell {
  const offset = (80 - size) / 2
  return cell({ kind: 'rect', x: offset, y: offset, w: size, h: size, fill, stroke })
}

function triangle(fill = tealSoft, stroke = teal, scale: 'small' | 'medium' | 'large' = 'large'): MatrixCell {
  const points = {
    small: '40,29 53,54 27,54',
    medium: '40,24 58,58 22,58',
    large: '40,18 64,62 16,62',
  }[scale]
  return cell({ kind: 'poly', points, fill, stroke })
}

function diamond(fill = amberSoft, stroke = amber, size: 'small' | 'medium' | 'large' = 'large'): MatrixCell {
  const points = {
    small: '40,27 53,40 40,53 27,40',
    medium: '40,21 59,40 40,59 21,40',
    large: '40,16 64,40 40,64 16,40',
  }[size]
  return cell({ kind: 'poly', points, fill, stroke })
}

function ring(filled: boolean, stroke = teal): MatrixCell {
  return cell({ kind: 'circle', cx: 40, cy: 40, r: 20, fill: filled ? stroke : 'none', stroke })
}

function line(kind: 'horizontal' | 'vertical' | 'both', stroke = ink): MatrixCell {
  const shapes: CellShape[] = []
  if (kind === 'horizontal' || kind === 'both') {
    shapes.push({ kind: 'line', x1: 18, y1: 40, x2: 62, y2: 40, stroke })
  }
  if (kind === 'vertical' || kind === 'both') {
    shapes.push({ kind: 'line', x1: 40, y1: 18, x2: 40, y2: 62, stroke })
  }
  return cell(...shapes)
}

function arrow(dir: 'up' | 'right' | 'down' | 'left', fill = tealSoft, stroke = teal): MatrixCell {
  const points = {
    up: '40,15 62,58 18,58',
    right: '65,40 22,18 22,62',
    down: '40,65 18,22 62,22',
    left: '15,40 58,62 58,18',
  }[dir]
  return cell({ kind: 'poly', points, fill, stroke })
}

function pair(first: MatrixCell, second: MatrixCell): MatrixCell {
  return [frame(), ...first.slice(1), ...second.slice(1)]
}

function smallShape(kind: 'circle' | 'square' | 'triangle' | 'diamond', position: Position, fill: string): CellShape {
  const [cx, cy] = positions[position]
  if (kind === 'circle') return { kind: 'circle', cx, cy, r: 9, fill, stroke: fill }
  if (kind === 'square') return { kind: 'rect', x: cx - 8, y: cy - 8, w: 16, h: 16, fill, stroke: fill }
  if (kind === 'triangle') {
    return { kind: 'poly', points: `${cx},${cy - 11} ${cx + 11},${cy + 9} ${cx - 11},${cy + 9}`, fill, stroke: fill }
  }
  return { kind: 'poly', points: `${cx},${cy - 11} ${cx + 11},${cy} ${cx},${cy + 11} ${cx - 11},${cy}`, fill, stroke: fill }
}

function twoShape(kind: 'circle' | 'square' | 'triangle' | 'diamond', first: Position, second: Position, fill = teal): MatrixCell {
  return cell(smallShape(kind, first, fill), smallShape(kind, second, fill))
}

function tile(position: 'left' | 'center' | 'right', fill = teal): MatrixCell {
  const x = { left: 16, center: 31, right: 46 }[position]
  return cell({ kind: 'rect', x, y: 24, w: 18, h: 32, fill, stroke: fill })
}

export const KIDS_TEST_BANK: VisualTestItem[] = [
  {
    id: 'kids-dot-steps',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [dot('left'), dot('center'), dot('right'), dot('left'), dot('center'), dot('right'), dot('left'), dot('center'), null],
    options: [dot('right'), dot('center'), dot('left'), dot('bottom')],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-growing-triangle',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [
      circle(tealSoft, teal, 12),
      circle(tealSoft, teal, 16),
      circle(tealSoft, teal, 21),
      square(amberSoft, amber, 24),
      square(amberSoft, amber, 31),
      square(amberSoft, amber, 38),
      triangle(tealSoft, teal, 'small'),
      triangle(tealSoft, teal, 'medium'),
      null,
    ],
    options: [triangle(tealSoft, teal, 'large'), triangle(tealSoft, teal, 'small'), square(amberSoft, amber, 38), circle(tealSoft, teal, 21)],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-color-checker',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [circle(tealSoft, teal), circle(amberSoft, amber), circle(tealSoft, teal), circle(amberSoft, amber), circle(tealSoft, teal), circle(amberSoft, amber), circle(tealSoft, teal), circle(amberSoft, amber), null],
    options: [circle(tealSoft, teal), circle(amberSoft, amber), diamond(tealSoft, teal), square(amberSoft, amber)],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-corner-loop',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [dot('topLeft', amber), dot('topRight', amber), dot('bottomRight', amber), dot('bottomLeft', amber), dot('topLeft', amber), dot('topRight', amber), dot('bottomRight', amber), dot('bottomLeft', amber), null],
    options: [dot('topLeft', amber), dot('topRight', amber), dot('bottomRight', amber), dot('center', amber)],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-line-friends',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [line('horizontal'), line('vertical'), line('both'), line('horizontal', teal), line('vertical', teal), line('both', teal), line('horizontal', amber), line('vertical', amber), null],
    options: [line('both', amber), line('horizontal', amber), line('vertical', amber), diamond(amberSoft, amber)],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-dot-bunches',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [
      dots(['center'], teal),
      dots(['left', 'right'], teal),
      dots(['top', 'center', 'bottom'], teal),
      dots(['center'], amber),
      dots(['left', 'right'], amber),
      dots(['top', 'center', 'bottom'], amber),
      dots(['center'], coral),
      dots(['left', 'right'], coral),
      null,
    ],
    options: [dots(['top', 'center', 'bottom'], coral), dots(['center'], coral), dots(['left', 'right'], coral), dots(['topLeft', 'bottomRight'], coral)],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-fill-switch',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [ring(true, teal), ring(false, teal), ring(true, teal), ring(false, amber), ring(true, amber), ring(false, amber), ring(true, teal), ring(false, teal), null],
    options: [ring(true, teal), ring(false, teal), ring(true, amber), ring(false, amber)],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-arrow-turns',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [arrow('up'), arrow('right'), arrow('down'), arrow('up'), arrow('right'), arrow('down'), arrow('up'), arrow('right'), null],
    options: [arrow('down'), arrow('left'), arrow('up'), arrow('right')],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 'kids-pair-builder',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [
      circle(tealSoft, teal),
      square(amberSoft, amber),
      pair(circle(tealSoft, teal), square(amberSoft, amber)),
      triangle(tealSoft, teal),
      diamond(amberSoft, amber),
      pair(triangle(tealSoft, teal), diamond(amberSoft, amber)),
      circle(amberSoft, amber),
      triangle(tealSoft, teal),
      null,
    ],
    options: [pair(circle(amberSoft, amber), triangle(tealSoft, teal)), pair(circle(tealSoft, teal), square(amberSoft, amber)), triangle(tealSoft, teal), diamond(amberSoft, amber)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'kids-up-middle-down',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [dot('top', teal), dot('center', teal), dot('bottom', teal), dot('top', amber), dot('center', amber), dot('bottom', amber), dot('top', coral), dot('center', coral), null],
    options: [dot('bottom', coral), dot('top', coral), dot('center', coral), dot('bottomRight', coral)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'kids-two-shape-slides',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [
      twoShape('circle', 'left', 'center', teal),
      twoShape('circle', 'center', 'right', teal),
      twoShape('circle', 'right', 'bottom', teal),
      twoShape('square', 'left', 'center', amber),
      twoShape('square', 'center', 'right', amber),
      twoShape('square', 'right', 'bottom', amber),
      twoShape('triangle', 'left', 'center', coral),
      twoShape('triangle', 'center', 'right', coral),
      null,
    ],
    options: [twoShape('triangle', 'right', 'bottom', coral), twoShape('triangle', 'left', 'center', coral), twoShape('square', 'right', 'bottom', amber), twoShape('diamond', 'right', 'bottom', coral)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'kids-tile-slide',
    prompt: 'Pick the picture that finishes the pattern.',
    matrix: [tile('left', teal), tile('center', teal), tile('right', teal), tile('left', amber), tile('center', amber), tile('right', amber), tile('left', coral), tile('center', coral), null],
    options: [tile('right', coral), tile('left', coral), tile('center', coral), tile('right', amber)],
    answer: 0,
    difficulty: 2,
  },
]
