import type { CellShape, MatrixCell } from '../questions'
import type { VisualTestItem } from '../../lib/test-catalog'

const ink = '#10141c'
const teal = '#0f766e'
const tealSoft = '#ccfbf1'
const amber = '#d97706'
const amberSoft = '#fef3c7'
const blue = '#2563eb'
const blueSoft = '#dbeafe'

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

function blank(): MatrixCell {
  return cell()
}

function dotShape(position: Position, fill: string, radius = 6): CellShape {
  const [cx, cy] = positions[position]
  return { kind: 'circle', cx, cy, r: radius, fill, stroke: fill }
}

function dots(items: Position[], fill = teal, radius = 6): MatrixCell {
  return cell(...items.map((position) => dotShape(position, fill, radius)))
}

function shape(
  kind: 'circle' | 'square' | 'triangle' | 'diamond',
  fill: string,
  stroke: string,
  filled = true,
): MatrixCell {
  const innerFill = filled ? fill : 'none'
  if (kind === 'circle') return cell({ kind: 'circle', cx: 40, cy: 40, r: 18, fill: innerFill, stroke })
  if (kind === 'square') return cell({ kind: 'rect', x: 23, y: 23, w: 34, h: 34, fill: innerFill, stroke })
  if (kind === 'triangle') return cell({ kind: 'poly', points: '40,18 62,62 18,62', fill: innerFill, stroke })
  return cell({ kind: 'poly', points: '40,16 64,40 40,64 16,40', fill: innerFill, stroke })
}

function triangle(dir: 'up' | 'right' | 'down' | 'left', fill = tealSoft, stroke = teal): MatrixCell {
  const points = {
    up: '40,16 63,62 17,62',
    right: '64,40 18,17 18,63',
    down: '40,64 17,18 63,18',
    left: '16,40 62,63 62,17',
  }[dir]
  return cell({ kind: 'poly', points, fill, stroke })
}

function diagonal(kind: 'tl' | 'tr' | 'both', stroke = ink): MatrixCell {
  const shapes: CellShape[] = []
  if (kind === 'tl' || kind === 'both') shapes.push({ kind: 'line', x1: 18, y1: 18, x2: 62, y2: 62, stroke })
  if (kind === 'tr' || kind === 'both') shapes.push({ kind: 'line', x1: 62, y1: 18, x2: 18, y2: 62, stroke })
  return cell(...shapes)
}

function lines(orientation: 'horizontal' | 'vertical', count: 1 | 2 | 3, stroke = ink): MatrixCell {
  const shapes: CellShape[] = []
  const coords = {
    1: [40],
    2: [30, 50],
    3: [24, 40, 56],
  }[count]
  for (const coord of coords) {
    shapes.push(
      orientation === 'horizontal'
        ? { kind: 'line', x1: 18, y1: coord, x2: 62, y2: coord, stroke }
        : { kind: 'line', x1: coord, y1: 18, x2: coord, y2: 62, stroke },
    )
  }
  return cell(...shapes)
}

function nested(count: 1 | 2 | 3, fillLast = false, stroke = teal): MatrixCell {
  const radii = [22, 15, 8].slice(0, count)
  return cell(
    ...radii.map((radius, index) => ({
      kind: 'circle' as const,
      cx: 40,
      cy: 40,
      r: radius,
      fill: fillLast && index === radii.length - 1 ? stroke : 'none',
      stroke,
    })),
  )
}

function tile(items: number[], fill = teal): MatrixCell {
  return cell(
    ...items.map((item) => {
      const col = item % 3
      const row = Math.floor(item / 3)
      return {
        kind: 'rect' as const,
        x: 16 + col * 16,
        y: 16 + row * 16,
        w: 13,
        h: 13,
        fill,
        stroke: fill,
      }
    }),
  )
}

function arc(kind: 'up' | 'down' | 'left' | 'right', stroke = ink): MatrixCell {
  const d = {
    up: 'M20 52 Q40 18 60 52',
    down: 'M20 28 Q40 62 60 28',
    left: 'M52 20 Q18 40 52 60',
    right: 'M28 20 Q62 40 28 60',
  }[kind]
  return cell({ kind: 'arc', d, stroke, fill: 'none' })
}

function combine(...cells: MatrixCell[]): MatrixCell {
  return [frame(), ...cells.flatMap((item) => item.slice(1))]
}

function marked(base: MatrixCell, marker: Position, fill = amber): MatrixCell {
  return combine(base, cell(dotShape(marker, fill, 5.5)))
}

export const TEENS_TEST_BANK: VisualTestItem[] = [
  {
    id: 'teens-shape-cycle',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      shape('circle', tealSoft, teal, true),
      shape('triangle', amberSoft, amber, true),
      shape('square', blueSoft, blue, true),
      shape('triangle', amberSoft, amber, true),
      shape('square', blueSoft, blue, true),
      shape('diamond', tealSoft, teal, true),
      shape('square', blueSoft, blue, true),
      shape('diamond', tealSoft, teal, true),
      null,
    ],
    options: [
      shape('circle', tealSoft, teal, true),
      shape('triangle', amberSoft, amber, true),
      shape('square', blueSoft, blue, true),
      shape('diamond', tealSoft, teal, true),
      shape('circle', tealSoft, teal, false),
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-dot-orbit-pairs',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      dots(['top', 'right'], teal),
      dots(['right', 'bottom'], teal),
      dots(['bottom', 'left'], teal),
      dots(['right', 'bottom'], amber),
      dots(['bottom', 'left'], amber),
      dots(['left', 'top'], amber),
      dots(['bottom', 'left'], blue),
      dots(['left', 'top'], blue),
      null,
    ],
    options: [
      dots(['top', 'right'], blue),
      dots(['bottom', 'left'], blue),
      dots(['left', 'top'], blue),
      dots(['topLeft', 'bottomRight'], blue),
      dots(['right', 'bottom'], amber),
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-nested-rings',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      nested(1, false, teal),
      nested(2, false, teal),
      nested(3, false, teal),
      nested(1, true, amber),
      nested(2, true, amber),
      nested(3, true, amber),
      nested(1, false, blue),
      nested(2, false, blue),
      null,
    ],
    options: [nested(3, false, blue), nested(2, false, blue), nested(3, true, blue), nested(1, false, blue), shape('circle', blueSoft, blue, true)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-diagonal-union',
    prompt: 'Which option completes the visual pattern?',
    matrix: [diagonal('tl'), diagonal('tr'), diagonal('both'), diagonal('tr'), diagonal('tl'), diagonal('both'), diagonal('both'), diagonal('both'), null],
    options: [blank(), diagonal('tl'), diagonal('tr'), diagonal('both'), lines('horizontal', 1)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-tile-corners',
    prompt: 'Which option completes the visual pattern?',
    matrix: [tile([0, 1, 3]), tile([1, 2, 5]), tile([5, 7, 8]), tile([1, 2, 5], amber), tile([5, 7, 8], amber), tile([3, 6, 7], amber), tile([5, 7, 8], blue), tile([3, 6, 7], blue), null],
    options: [tile([0, 1, 3], blue), tile([1, 2, 5], blue), tile([0, 3, 6], blue), tile([4], blue), tile([0, 8], blue)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-arc-turns',
    prompt: 'Which option completes the visual pattern?',
    matrix: [arc('up'), arc('right'), arc('down'), arc('right', teal), arc('down', teal), arc('left', teal), arc('down', amber), arc('left', amber), null],
    options: [arc('up', amber), arc('right', amber), arc('down', amber), arc('left', amber), diagonal('both', amber)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-line-marker',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      marked(lines('horizontal', 1), 'top', teal),
      marked(lines('horizontal', 2), 'center', teal),
      marked(lines('horizontal', 3), 'bottom', teal),
      marked(lines('vertical', 1), 'left', amber),
      marked(lines('vertical', 2), 'center', amber),
      marked(lines('vertical', 3), 'right', amber),
      marked(diagonal('tl'), 'topLeft', blue),
      marked(diagonal('tr'), 'topRight', blue),
      null,
    ],
    options: [
      marked(diagonal('both'), 'center', blue),
      marked(diagonal('tl'), 'bottomRight', blue),
      marked(lines('horizontal', 3), 'center', teal),
      marked(lines('vertical', 2), 'top', amber),
      nested(1, true, blue),
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-fill-shift',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      shape('circle', tealSoft, teal, false),
      shape('circle', teal, teal, true),
      shape('square', amberSoft, amber, false),
      shape('circle', teal, teal, true),
      shape('square', amberSoft, amber, false),
      shape('square', amber, amber, true),
      shape('square', amberSoft, amber, false),
      shape('square', amber, amber, true),
      null,
    ],
    options: [
      shape('triangle', blueSoft, blue, false),
      shape('square', amberSoft, amber, false),
      shape('circle', teal, teal, true),
      shape('triangle', blue, blue, true),
      shape('diamond', tealSoft, teal, false),
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-triangle-rotation',
    prompt: 'Which option completes the visual pattern?',
    matrix: [triangle('up'), triangle('right'), triangle('down'), triangle('right', amberSoft, amber), triangle('down', amberSoft, amber), triangle('left', amberSoft, amber), triangle('down', blueSoft, blue), triangle('left', blueSoft, blue), null],
    options: [triangle('up', blueSoft, blue), triangle('right', blueSoft, blue), triangle('down', blueSoft, blue), triangle('left', blueSoft, blue), shape('triangle', blueSoft, blue, true)],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-opposite-corners',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      dots(['topLeft', 'bottomRight'], teal),
      dots(['topRight', 'bottomLeft'], teal),
      dots(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], teal),
      dots(['top', 'bottom'], amber),
      dots(['left', 'right'], amber),
      dots(['top', 'left', 'right', 'bottom'], amber),
      dots(['topLeft', 'bottomRight'], blue),
      dots(['topRight', 'bottomLeft'], blue),
      null,
    ],
    options: [
      dots(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], blue),
      dots(['top', 'bottom'], blue),
      dots(['left', 'right'], blue),
      dots(['topLeft', 'bottomRight'], blue),
      dots(['center'], blue),
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    id: 'teens-combine-shapes',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      shape('circle', tealSoft, teal, false),
      shape('diamond', amberSoft, amber, false),
      combine(shape('circle', tealSoft, teal, false), shape('diamond', amberSoft, amber, false)),
      shape('square', blueSoft, blue, false),
      shape('triangle', tealSoft, teal, false),
      combine(shape('square', blueSoft, blue, false), shape('triangle', tealSoft, teal, false)),
      diagonal('tl', amber),
      diagonal('tr', amber),
      null,
    ],
    options: [
      diagonal('both', amber),
      combine(shape('circle', tealSoft, teal, false), shape('diamond', amberSoft, amber, false)),
      diagonal('tl', amber),
      diagonal('tr', amber),
      shape('diamond', amberSoft, amber, true),
    ],
    answer: 0,
    difficulty: 3,
  },
  {
    id: 'teens-stripe-build',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      lines('horizontal', 1, teal),
      lines('horizontal', 2, teal),
      lines('horizontal', 3, teal),
      lines('vertical', 1, amber),
      lines('vertical', 2, amber),
      lines('vertical', 3, amber),
      combine(lines('horizontal', 1, blue), lines('vertical', 1, blue)),
      combine(lines('horizontal', 2, blue), lines('vertical', 1, blue)),
      null,
    ],
    options: [
      combine(lines('horizontal', 3, blue), lines('vertical', 1, blue)),
      combine(lines('horizontal', 2, blue), lines('vertical', 2, blue)),
      lines('horizontal', 3, blue),
      lines('vertical', 3, blue),
      diagonal('both', blue),
    ],
    answer: 0,
    difficulty: 3,
  },
  {
    id: 'teens-marker-mirror',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      marked(shape('circle', tealSoft, teal, false), 'left', amber),
      marked(shape('circle', tealSoft, teal, false), 'right', amber),
      marked(shape('circle', tealSoft, teal, false), 'center', amber),
      marked(shape('square', amberSoft, amber, false), 'top', teal),
      marked(shape('square', amberSoft, amber, false), 'bottom', teal),
      marked(shape('square', amberSoft, amber, false), 'center', teal),
      marked(shape('diamond', blueSoft, blue, false), 'topLeft', blue),
      marked(shape('diamond', blueSoft, blue, false), 'bottomRight', blue),
      null,
    ],
    options: [
      marked(shape('diamond', blueSoft, blue, false), 'center', blue),
      marked(shape('diamond', blueSoft, blue, false), 'topRight', blue),
      marked(shape('diamond', blueSoft, blue, false), 'bottomLeft', blue),
      marked(shape('circle', tealSoft, teal, false), 'center', amber),
      marked(shape('square', amberSoft, amber, false), 'center', teal),
    ],
    answer: 0,
    difficulty: 3,
  },
  {
    id: 'teens-tile-union',
    prompt: 'Which option completes the visual pattern?',
    matrix: [tile([0, 4], teal), tile([4, 8], teal), tile([0, 4, 8], teal), tile([2, 4], amber), tile([4, 6], amber), tile([2, 4, 6], amber), tile([1, 4], blue), tile([4, 7], blue), null],
    options: [tile([1, 4, 7], blue), tile([1, 7], blue), tile([4], blue), tile([0, 4, 8], blue), tile([2, 4, 6], blue)],
    answer: 0,
    difficulty: 3,
  },
  {
    id: 'teens-nested-color-switch',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      combine(nested(1, false, teal), dots(['center'], amber, 5)),
      combine(nested(2, false, teal), dots(['center'], amber, 5)),
      combine(nested(3, false, teal), dots(['center'], amber, 5)),
      combine(nested(1, false, amber), dots(['center'], blue, 5)),
      combine(nested(2, false, amber), dots(['center'], blue, 5)),
      combine(nested(3, false, amber), dots(['center'], blue, 5)),
      combine(nested(1, false, blue), dots(['center'], teal, 5)),
      combine(nested(2, false, blue), dots(['center'], teal, 5)),
      null,
    ],
    options: [
      combine(nested(3, false, blue), dots(['center'], teal, 5)),
      combine(nested(2, false, blue), dots(['center'], teal, 5)),
      combine(nested(3, true, blue), dots(['center'], teal, 5)),
      nested(3, false, blue),
      dots(['center'], teal, 8),
    ],
    answer: 0,
    difficulty: 3,
  },
  {
    id: 'teens-final-weave',
    prompt: 'Which option completes the visual pattern?',
    matrix: [
      combine(diagonal('tl', teal), dots(['topLeft'], amber)),
      combine(diagonal('tr', teal), dots(['topRight'], amber)),
      combine(diagonal('both', teal), dots(['top'], amber)),
      combine(diagonal('tr', amber), dots(['bottomRight'], blue)),
      combine(diagonal('tl', amber), dots(['bottomLeft'], blue)),
      combine(diagonal('both', amber), dots(['bottom'], blue)),
      combine(lines('horizontal', 1, blue), dots(['left'], teal)),
      combine(lines('vertical', 1, blue), dots(['right'], teal)),
      null,
    ],
    options: [
      combine(diagonal('both', blue), dots(['center'], teal)),
      combine(lines('horizontal', 1, blue), dots(['center'], teal)),
      combine(lines('vertical', 1, blue), dots(['center'], teal)),
      combine(diagonal('tl', blue), dots(['left'], teal)),
      combine(diagonal('tr', blue), dots(['right'], teal)),
    ],
    answer: 0,
    difficulty: 3,
  },
]
