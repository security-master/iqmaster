export type CellShape =
  | { kind: 'empty' }
  | { kind: 'dot'; x: number; y: number; fill?: string }
  | { kind: 'circle'; cx: number; cy: number; r: number; fill?: string; stroke?: string; dashed?: boolean }
  | { kind: 'rect'; x: number; y: number; w: number; h: number; fill?: string; stroke?: string }
  | { kind: 'line'; x1: number; y1: number; x2: number; y2: number; stroke?: string; dashed?: boolean }
  | { kind: 'poly'; points: string; fill?: string; stroke?: string; dashed?: boolean }
  | { kind: 'arc'; d: string; stroke?: string; fill?: string }
  | { kind: 'text'; x: number; y: number; value: string; fill?: string }

export type MatrixCell = CellShape[]

export interface Question {
  id: number
  prompt: string
  /** 3x3 matrix; last cell is null (missing) */
  matrix: Array<MatrixCell | null>
  options: MatrixCell[]
  answer: number
  difficulty: 1 | 2 | 3
}

const ink = '#10141c'
const teal = '#0f766e'
const amber = '#d97706'

function cell(...shapes: CellShape[]): MatrixCell {
  return shapes
}

function box(fill = 'none', stroke = ink): CellShape {
  return { kind: 'rect', x: 8, y: 8, w: 64, h: 64, fill, stroke }
}

function hLines(n: number, stroke = ink): CellShape[] {
  const shapes: CellShape[] = [box()]
  const gap = 64 / (n + 1)
  for (let i = 1; i <= n; i++) {
    shapes.push({ kind: 'line', x1: 14, y1: 8 + gap * i, x2: 66, y2: 8 + gap * i, stroke })
  }
  return shapes
}

function vLines(n: number, stroke = ink): CellShape[] {
  const shapes: CellShape[] = [box()]
  const gap = 64 / (n + 1)
  for (let i = 1; i <= n; i++) {
    shapes.push({ kind: 'line', x1: 8 + gap * i, y1: 14, x2: 8 + gap * i, y2: 66, stroke })
  }
  return shapes
}

function dots(positions: Array<[number, number]>, fill = ink): CellShape[] {
  return [box(), ...positions.map(([x, y]) => ({ kind: 'dot' as const, x, y, fill }))]
}

function circleAt(cx: number, cy: number, r = 10, fill = 'none', stroke = ink): CellShape[] {
  return [box(), { kind: 'circle', cx, cy, r, fill, stroke }]
}

function diag(dir: 'tl' | 'tr' | 'both', stroke = ink): CellShape[] {
  const shapes: CellShape[] = [box()]
  if (dir === 'tl' || dir === 'both') {
    shapes.push({ kind: 'line', x1: 14, y1: 14, x2: 66, y2: 66, stroke })
  }
  if (dir === 'tr' || dir === 'both') {
    shapes.push({ kind: 'line', x1: 66, y1: 14, x2: 14, y2: 66, stroke })
  }
  return shapes
}

function arrow(dir: 'up' | 'down' | 'left' | 'right' | 'updown', stroke = ink): CellShape[] {
  const shapes: CellShape[] = [box()]
  if (dir === 'up' || dir === 'updown') {
    shapes.push({ kind: 'line', x1: 40, y1: 58, x2: 40, y2: 22, stroke })
    shapes.push({ kind: 'line', x1: 40, y1: 22, x2: 28, y2: 34, stroke })
    shapes.push({ kind: 'line', x1: 40, y1: 22, x2: 52, y2: 34, stroke })
  }
  if (dir === 'down' || dir === 'updown') {
    shapes.push({ kind: 'line', x1: 40, y1: 22, x2: 40, y2: 58, stroke })
    shapes.push({ kind: 'line', x1: 40, y1: 58, x2: 28, y2: 46, stroke })
    shapes.push({ kind: 'line', x1: 40, y1: 58, x2: 52, y2: 46, stroke })
  }
  if (dir === 'left') {
    shapes.push({ kind: 'line', x1: 58, y1: 40, x2: 22, y2: 40, stroke })
    shapes.push({ kind: 'line', x1: 22, y1: 40, x2: 34, y2: 28, stroke })
    shapes.push({ kind: 'line', x1: 22, y1: 40, x2: 34, y2: 52, stroke })
  }
  if (dir === 'right') {
    shapes.push({ kind: 'line', x1: 22, y1: 40, x2: 58, y2: 40, stroke })
    shapes.push({ kind: 'line', x1: 58, y1: 40, x2: 46, y2: 28, stroke })
    shapes.push({ kind: 'line', x1: 58, y1: 40, x2: 46, y2: 52, stroke })
  }
  return shapes
}

function tile(positions: number[], fill = teal): CellShape[] {
  // 3x3 mini grid positions 0-8
  const shapes: CellShape[] = [box()]
  for (const p of positions) {
    const col = p % 3
    const row = Math.floor(p / 3)
    shapes.push({
      kind: 'rect',
      x: 14 + col * 18,
      y: 14 + row * 18,
      w: 14,
      h: 14,
      fill,
      stroke: fill,
    })
  }
  return shapes
}

function shapeMark(type: 'circle' | 'triangle' | 'square', fill = 'none', stroke = ink): CellShape[] {
  if (type === 'circle') {
    return cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 17, fill, stroke })
  }
  if (type === 'triangle') {
    return cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', fill, stroke })
  }
  return cell(box(), { kind: 'rect', x: 23, y: 23, w: 34, h: 34, fill, stroke })
}

function ring(count: number, filled = false): CellShape[] {
  const shapes: CellShape[] = [box()]
  for (let i = 0; i < count; i++) {
    const r = 26 - i * 7
    shapes.push({
      kind: 'circle',
      cx: 40,
      cy: 40,
      r,
      fill: filled && i === count - 1 ? ink : 'none',
      stroke: ink,
    })
  }
  return shapes
}

function suit(type: 'heart' | 'diamond' | 'club' | 'spade', filled: boolean): CellShape[] {
  const fill = filled ? ink : 'none'
  const stroke = ink
  if (type === 'heart') {
    return [
      box(),
      {
        kind: 'poly',
        points: '40,62 16,36 20,22 32,22 40,30 48,22 60,22 64,36',
        fill,
        stroke,
      },
    ]
  }
  if (type === 'diamond') {
    return [box(), { kind: 'poly', points: '40,14 64,40 40,66 16,40', fill, stroke }]
  }
  if (type === 'spade') {
    return [
      box(),
      { kind: 'poly', points: '40,14 64,40 48,44 48,62 32,62 32,44 16,40', fill, stroke },
    ]
  }
  return [
    box(),
    { kind: 'circle', cx: 28, cy: 32, r: 10, fill, stroke },
    { kind: 'circle', cx: 52, cy: 32, r: 10, fill, stroke },
    { kind: 'circle', cx: 40, cy: 48, r: 10, fill, stroke },
    { kind: 'rect', x: 36, y: 48, w: 8, h: 16, fill: filled ? ink : 'none', stroke },
  ]
}

export const QUESTIONS: Question[] = [
  // 1 — dots move clockwise corners
  {
    id: 1,
    prompt: 'Which option completes the pattern?',
    matrix: [
      dots([[20, 20]]),
      dots([[60, 20]]),
      dots([[60, 60]]),
      dots([[20, 20], [60, 20]]),
      dots([[60, 20], [60, 60]]),
      dots([[60, 60], [20, 60]]),
      dots([[20, 20], [60, 20], [60, 60]]),
      dots([[60, 20], [60, 60], [20, 60]]),
      null,
    ],
    options: [
      dots([[20, 20], [60, 60], [20, 60]]),
      dots([[20, 20], [60, 20], [20, 60]]),
      dots([[20, 20], [60, 20], [60, 60], [20, 60]]),
      dots([[40, 40]]),
      dots([[20, 60]]),
      dots([[60, 20], [20, 60]]),
    ],
    answer: 0,
    difficulty: 1,
  },
  // 2 — line count increases by row
  {
    id: 2,
    prompt: 'Which option completes the pattern?',
    matrix: [
      hLines(1),
      hLines(2),
      hLines(3),
      vLines(1),
      vLines(2),
      vLines(3),
      cell(...hLines(1), { kind: 'line', x1: 40, y1: 14, x2: 40, y2: 66, stroke: ink }),
      cell(...hLines(2), { kind: 'line', x1: 40, y1: 14, x2: 40, y2: 66, stroke: ink }),
      null,
    ],
    options: [
      cell(...hLines(3), { kind: 'line', x1: 40, y1: 14, x2: 40, y2: 66, stroke: ink }),
      hLines(3),
      vLines(3),
      cell(box(), { kind: 'line', x1: 14, y1: 40, x2: 66, y2: 40, stroke: ink }),
      diag('both'),
      ring(2),
    ],
    answer: 0,
    difficulty: 1,
  },
  // 3 — circle orbits
  {
    id: 3,
    prompt: 'Which option completes the pattern?',
    matrix: [
      circleAt(40, 22),
      circleAt(58, 40),
      circleAt(40, 58),
      circleAt(22, 40),
      circleAt(40, 22),
      circleAt(58, 40),
      circleAt(40, 58),
      circleAt(22, 40),
      null,
    ],
    options: [
      circleAt(40, 22),
      circleAt(58, 40),
      circleAt(40, 58),
      circleAt(22, 40),
      circleAt(40, 40),
      circleAt(58, 58),
    ],
    answer: 0,
    difficulty: 1,
  },
  // 4 — teal tiles slide
  {
    id: 4,
    prompt: 'Which option completes the pattern?',
    matrix: [
      tile([0]),
      tile([1]),
      tile([2]),
      tile([3]),
      tile([4]),
      tile([5]),
      tile([6]),
      tile([7]),
      null,
    ],
    options: [tile([8]), tile([0]), tile([4]), tile([2, 5]), tile([6, 7]), tile([1, 4, 7])],
    answer: 0,
    difficulty: 1,
  },
  // 5 — diagonals alternate
  {
    id: 5,
    prompt: 'Which option completes the pattern?',
    matrix: [
      diag('tl'),
      diag('tr'),
      diag('both'),
      diag('tr'),
      diag('both'),
      diag('tl'),
      diag('both'),
      diag('tl'),
      null,
    ],
    options: [diag('tr'), diag('tl'), diag('both'), hLines(2), vLines(1), box() as unknown as MatrixCell],
    answer: 0,
    difficulty: 1,
  },
  // 6 — nested rings grow
  {
    id: 6,
    prompt: 'Which option completes the pattern?',
    matrix: [
      ring(1),
      ring(2),
      ring(3),
      ring(2),
      ring(3),
      ring(1),
      ring(3),
      ring(1),
      null,
    ],
    options: [ring(2), ring(3), ring(1), ring(2, true), circleAt(40, 40, 20, ink), hLines(3)],
    answer: 0,
    difficulty: 1,
  },
  // 7 — arrows rotate
  {
    id: 7,
    prompt: 'Which option completes the pattern?',
    matrix: [
      arrow('up'),
      arrow('right'),
      arrow('down'),
      arrow('right'),
      arrow('down'),
      arrow('left'),
      arrow('down'),
      arrow('left'),
      null,
    ],
    options: [arrow('up'), arrow('right'), arrow('down'), arrow('left'), arrow('updown'), diag('tl')],
    answer: 0,
    difficulty: 1,
  },
  // 8 — ring fill and growth shift
  {
    id: 8,
    prompt: 'Which option completes the pattern?',
    matrix: [
      ring(1),
      ring(1, true),
      ring(2),
      ring(1, true),
      ring(2),
      ring(2, true),
      ring(2),
      ring(2, true),
      null,
    ],
    options: [ring(3), ring(1), ring(2), ring(3, true), circleAt(40, 40, 16, ink), diag('both')],
    answer: 0,
    difficulty: 1,
  },
  // 9 — two dots mirror
  {
    id: 9,
    prompt: 'Which option completes the pattern?',
    matrix: [
      dots([[20, 20], [60, 60]]),
      dots([[60, 20], [20, 60]]),
      dots([[40, 20], [40, 60]]),
      dots([[60, 20], [20, 60]]),
      dots([[40, 20], [40, 60]]),
      dots([[20, 20], [60, 60]]),
      dots([[40, 20], [40, 60]]),
      dots([[20, 20], [60, 60]]),
      null,
    ],
    options: [
      dots([[60, 20], [20, 60]]),
      dots([[20, 20], [60, 60]]),
      dots([[40, 40], [40, 20]]),
      dots([[20, 40], [60, 40]]),
      dots([[20, 20]]),
      dots([[60, 60], [40, 40]]),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 10 — suits cycle filled/outline
  {
    id: 10,
    prompt: 'Which option completes the pattern?',
    matrix: [
      suit('heart', true),
      suit('diamond', false),
      suit('spade', true),
      suit('diamond', false),
      suit('spade', true),
      suit('club', false),
      suit('spade', true),
      suit('club', false),
      null,
    ],
    options: [
      suit('heart', true),
      suit('diamond', true),
      suit('club', true),
      suit('spade', false),
      suit('heart', false),
      suit('club', false),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 11 — horizontal + vertical mix
  {
    id: 11,
    prompt: 'Which option completes the pattern?',
    matrix: [
      hLines(1),
      hLines(1),
      cell(...hLines(1), ...vLines(1).slice(1)),
      hLines(2),
      hLines(2),
      cell(...hLines(2), ...vLines(1).slice(1)),
      hLines(3),
      hLines(3),
      null,
    ],
    options: [
      cell(...hLines(3), ...vLines(1).slice(1)),
      hLines(3),
      vLines(3),
      cell(...hLines(2), ...vLines(2).slice(1)),
      diag('both'),
      ring(1),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 12 — tile L shapes rotate
  {
    id: 12,
    prompt: 'Which option completes the pattern?',
    matrix: [
      tile([0, 1, 3]),
      tile([1, 2, 5]),
      tile([5, 7, 8]),
      tile([1, 2, 5]),
      tile([5, 7, 8]),
      tile([3, 6, 7]),
      tile([5, 7, 8]),
      tile([3, 6, 7]),
      null,
    ],
    options: [
      tile([0, 1, 3]),
      tile([1, 2, 5]),
      tile([0, 3, 6]),
      tile([2, 4, 6]),
      tile([4]),
      tile([0, 8]),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 13 — amber accent circle size
  {
    id: 13,
    prompt: 'Which option completes the pattern?',
    matrix: [
      circleAt(40, 40, 8, amber, amber),
      circleAt(40, 40, 14, amber, amber),
      circleAt(40, 40, 20, amber, amber),
      circleAt(40, 40, 14, 'none', amber),
      circleAt(40, 40, 20, 'none', amber),
      circleAt(40, 40, 8, 'none', amber),
      circleAt(40, 40, 20, teal, teal),
      circleAt(40, 40, 8, teal, teal),
      null,
    ],
    options: [
      circleAt(40, 40, 14, teal, teal),
      circleAt(40, 40, 20, teal, teal),
      circleAt(40, 40, 8, amber, amber),
      circleAt(40, 40, 14, 'none', teal),
      ring(3),
      circleAt(40, 40, 26, teal, teal),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 14 — XOR-like diagonals: row3 = row1 xor row2 style
  {
    id: 14,
    prompt: 'Which option completes the pattern?',
    matrix: [
      diag('tl'),
      diag('tr'),
      diag('both'),
      diag('tr'),
      diag('tl'),
      diag('both'),
      diag('both'),
      diag('both'),
      null,
    ],
    options: [
      cell(box()),
      diag('tl'),
      diag('tr'),
      diag('both'),
      hLines(1),
      arrow('up'),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 15 — clock dots
  {
    id: 15,
    prompt: 'Which option completes the pattern?',
    matrix: [
      dots([[40, 18]]),
      dots([[40, 18], [58, 40]]),
      dots([[40, 18], [58, 40], [40, 62]]),
      dots([[58, 40]]),
      dots([[58, 40], [40, 62]]),
      dots([[58, 40], [40, 62], [22, 40]]),
      dots([[40, 62]]),
      dots([[40, 62], [22, 40]]),
      null,
    ],
    options: [
      dots([[40, 62], [22, 40], [40, 18]]),
      dots([[40, 18], [58, 40], [40, 62]]),
      dots([[22, 40]]),
      dots([[40, 40]]),
      dots([[58, 40], [22, 40]]),
      dots([[40, 18], [40, 62]]),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 16 — arrows converge
  {
    id: 16,
    prompt: 'Which option completes the pattern?',
    matrix: [
      arrow('right'),
      arrow('left'),
      arrow('updown'),
      arrow('down'),
      arrow('up'),
      arrow('updown'),
      arrow('left'),
      arrow('right'),
      null,
    ],
    options: [
      arrow('updown'),
      arrow('up'),
      arrow('down'),
      arrow('left'),
      arrow('right'),
      diag('both'),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 17 — paired arcs rotate by column
  {
    id: 17,
    prompt: 'Which option completes the pattern?',
    matrix: [
      cell(box(), { kind: 'arc', d: 'M20 50 Q40 15 60 50', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M50 20 Q15 40 50 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 30 Q40 65 60 30', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M50 20 Q15 40 50 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 30 Q40 65 60 30', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M30 20 Q65 40 30 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 30 Q40 65 60 30', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M30 20 Q65 40 30 60', stroke: ink, fill: 'none' }),
      null,
    ],
    options: [
      cell(box(), { kind: 'arc', d: 'M20 50 Q40 15 60 50', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M50 20 Q15 40 50 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M30 20 Q65 40 30 60', stroke: ink, fill: 'none' }),
      diag('both'),
      ring(2),
      arrow('right'),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 18 — ring fill pattern
  {
    id: 18,
    prompt: 'Which option completes the pattern?',
    matrix: [
      ring(1, true),
      ring(1, false),
      ring(1, true),
      ring(2, false),
      ring(2, true),
      ring(2, false),
      ring(3, true),
      ring(3, false),
      null,
    ],
    options: [ring(3, true), ring(3, false), ring(2, true), ring(1, true), circleAt(40, 40, 12, ink), hLines(2)],
    answer: 0,
    difficulty: 2,
  },
  // 19 — tiles add positions
  {
    id: 19,
    prompt: 'Which option completes the pattern?',
    matrix: [
      tile([0, 4]),
      tile([4, 8]),
      tile([0, 4, 8]),
      tile([2, 4]),
      tile([4, 6]),
      tile([2, 4, 6]),
      tile([1, 4]),
      tile([4, 7]),
      null,
    ],
    options: [
      tile([1, 4, 7]),
      tile([0, 8]),
      tile([2, 6]),
      tile([4]),
      tile([1, 7]),
      tile([0, 2, 6, 8]),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 20 — mixed shape progression
  {
    id: 20,
    prompt: 'Which option completes the pattern?',
    matrix: [
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 16, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'rect', x: 24, y: 24, w: 32, h: 32, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'rect', x: 24, y: 24, w: 32, h: 32, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 16, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'rect', x: 24, y: 24, w: 32, h: 32, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 16, stroke: ink, fill: 'none' }),
      null,
    ],
    options: [
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 16, stroke: ink, fill: ink }),
      cell(box(), { kind: 'rect', x: 24, y: 24, w: 32, h: 32, stroke: ink, fill: ink }),
      diag('tl'),
      ring(2),
      arrow('up'),
    ],
    answer: 0,
    difficulty: 2,
  },
  // 21 — dashed vs solid
  {
    id: 21,
    prompt: 'Which option completes the pattern?',
    matrix: [
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 18, stroke: ink, fill: 'none', dashed: true }),
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 18, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 40, cy: 40, r: 18, stroke: ink, fill: ink }),
      cell(box(), { kind: 'rect', x: 22, y: 22, w: 36, h: 36, stroke: ink, fill: 'none' }),
      cell(box(), {
        kind: 'rect',
        x: 22,
        y: 22,
        w: 36,
        h: 36,
        stroke: ink,
        fill: 'none',
      }),
      cell(box(), { kind: 'rect', x: 22, y: 22, w: 36, h: 36, stroke: ink, fill: ink }),
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: 'none', }),
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: 'none' }),
      null,
    ],
    options: [
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: ink }),
      cell(box(), { kind: 'poly', points: '40,18 62,62 18,62', stroke: ink, fill: 'none', dashed: true }),
      ring(1, true),
      circleAt(40, 40, 18, ink),
      diag('both'),
      tile([0, 4, 8]),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 22 — combine the first two cells into the third
  {
    id: 22,
    prompt: 'Which option completes the pattern?',
    matrix: [
      hLines(1),
      vLines(1),
      cell(...hLines(1), ...vLines(1).slice(1)),
      diag('tl'),
      diag('tr'),
      diag('both'),
      arrow('up'),
      arrow('down'),
      null,
    ],
    options: [
      arrow('updown'),
      arrow('up'),
      arrow('down'),
      diag('both'),
      cell(...hLines(1), ...vLines(1).slice(1)),
      ring(2),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 23 — corner dots with center rule
  {
    id: 23,
    prompt: 'Which option completes the pattern?',
    matrix: [
      dots([[20, 20], [60, 20]], teal),
      dots([[60, 20], [60, 60]], teal),
      dots([[20, 20], [60, 20], [60, 60]], teal),
      dots([[60, 60], [20, 60]], teal),
      dots([[20, 60], [20, 20]], teal),
      dots([[60, 60], [20, 60], [20, 20]], teal),
      dots([[20, 20], [60, 60]], amber),
      dots([[60, 20], [20, 60]], amber),
      null,
    ],
    options: [
      dots([[20, 20], [60, 20], [60, 60], [20, 60]], amber),
      dots([[40, 40]], amber),
      dots([[20, 20], [60, 60]], teal),
      dots([[20, 20]], amber),
      tile([0, 2, 6, 8]),
      dots([[60, 20], [20, 60]], teal),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 24 — complex tile progression
  {
    id: 24,
    prompt: 'Which option completes the pattern?',
    matrix: [
      tile([0, 1, 2]),
      tile([3, 4, 5]),
      tile([6, 7, 8]),
      tile([0, 3, 6]),
      tile([1, 4, 7]),
      tile([2, 5, 8]),
      tile([0, 4, 8]),
      tile([2, 4, 6]),
      null,
    ],
    options: [
      tile([0, 2, 4, 6, 8]),
      tile([1, 3, 5, 7]),
      tile([4]),
      tile([0, 8]),
      tile([2, 6]),
      tile([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 25 — arc orientations
  {
    id: 25,
    prompt: 'Which option completes the pattern?',
    matrix: [
      cell(box(), { kind: 'arc', d: 'M20 50 Q40 15 60 50', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 30 Q40 65 60 30', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 50 Q40 15 60 50', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M30 20 Q65 40 30 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M50 20 Q15 40 50 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M30 20 Q65 40 30 60', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 30 Q40 65 60 30', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 50 Q40 15 60 50', stroke: ink, fill: 'none' }),
      null,
    ],
    options: [
      cell(box(), { kind: 'arc', d: 'M20 30 Q40 65 60 30', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M20 50 Q40 15 60 50', stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'arc', d: 'M50 20 Q15 40 50 60', stroke: ink, fill: 'none' }),
      diag('tl'),
      ring(2),
      arrow('left'),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 26 — suit + fill XOR style
  {
    id: 26,
    prompt: 'Which option completes the pattern?',
    matrix: [
      suit('heart', true),
      suit('heart', false),
      suit('diamond', true),
      suit('spade', false),
      suit('spade', true),
      suit('club', false),
      suit('diamond', false),
      suit('club', true),
      null,
    ],
    options: [
      suit('heart', false),
      suit('diamond', false),
      suit('spade', true),
      suit('club', true),
      suit('heart', true),
      suit('club', false),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 27 — shape and fill grid
  {
    id: 27,
    prompt: 'Which option completes the pattern?',
    matrix: [
      shapeMark('circle'),
      shapeMark('triangle'),
      shapeMark('square'),
      shapeMark('circle', ink),
      shapeMark('triangle', ink),
      shapeMark('square', ink),
      shapeMark('circle', teal, teal),
      shapeMark('triangle', teal, teal),
      null,
    ],
    options: [
      shapeMark('square', teal, teal),
      shapeMark('circle', teal, teal),
      shapeMark('triangle', teal, teal),
      shapeMark('square', ink),
      ring(2),
      tile([0, 4, 8]),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 28 — overlapping circles positions
  {
    id: 28,
    prompt: 'Which option completes the pattern?',
    matrix: [
      cell(box(), { kind: 'circle', cx: 30, cy: 40, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 40, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 40, cy: 30, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 40, cy: 50, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 30, cy: 30, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 50, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 40, cy: 30, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 40, cy: 50, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 30, cy: 30, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 50, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 30, cy: 40, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 40, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 30, cy: 30, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 50, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 30, cy: 40, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 40, r: 14, stroke: ink, fill: 'none' }),
      null,
    ],
    options: [
      cell(box(), { kind: 'circle', cx: 40, cy: 30, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 40, cy: 50, r: 14, stroke: ink, fill: 'none' }),
      cell(box(), { kind: 'circle', cx: 30, cy: 50, r: 14, stroke: ink, fill: 'none' }, { kind: 'circle', cx: 50, cy: 30, r: 14, stroke: ink, fill: 'none' }),
      ring(2),
      circleAt(40, 40, 18),
      dots([[30, 40], [50, 40]]),
      diag('tr'),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 29 — line + dot composition
  {
    id: 29,
    prompt: 'Which option completes the pattern?',
    matrix: [
      cell(...hLines(1), { kind: 'dot', x: 40, y: 24, fill: teal }),
      cell(...hLines(2), { kind: 'dot', x: 40, y: 40, fill: teal }),
      cell(...hLines(3), { kind: 'dot', x: 40, y: 56, fill: teal }),
      cell(...vLines(1), { kind: 'dot', x: 24, y: 40, fill: amber }),
      cell(...vLines(2), { kind: 'dot', x: 40, y: 40, fill: amber }),
      cell(...vLines(3), { kind: 'dot', x: 56, y: 40, fill: amber }),
      cell(...diag('tl'), { kind: 'dot', x: 28, y: 28, fill: ink }),
      cell(...diag('tr'), { kind: 'dot', x: 52, y: 28, fill: ink }),
      null,
    ],
    options: [
      cell(...diag('both'), { kind: 'dot', x: 40, y: 40, fill: ink }),
      cell(...diag('tl'), { kind: 'dot', x: 52, y: 52, fill: ink }),
      cell(...hLines(3), { kind: 'dot', x: 40, y: 40, fill: teal }),
      cell(...vLines(2), { kind: 'dot', x: 40, y: 24, fill: amber }),
      ring(1, true),
      arrow('up'),
    ],
    answer: 0,
    difficulty: 3,
  },
  // 30 — final compound rule
  {
    id: 30,
    prompt: 'Which option completes the pattern?',
    matrix: [
      tile([0, 4, 8], teal),
      suit('diamond', false),
      ring(1),
      suit('diamond', true),
      ring(2),
      tile([2, 4, 6], amber),
      ring(3),
      tile([1, 4, 7], teal),
      null,
    ],
    options: [
      suit('diamond', false),
      suit('heart', true),
      tile([0, 4, 8], amber),
      ring(3, true),
      arrow('updown'),
      shapeMark('square', teal, teal),
    ],
    answer: 0,
    difficulty: 3,
  },
]

// Fix question 5 option that incorrectly cast box()
QUESTIONS[4].options[5] = cell(box())

export function countCorrect(answers: Array<number | null>): number {
  return QUESTIONS.reduce((sum, q, i) => {
    return sum + (answers[i] === q.answer ? 1 : 0)
  }, 0)
}
