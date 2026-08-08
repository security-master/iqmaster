import type { CellShape, MatrixCell } from '../data/questions'

function Shape({ shape }: { shape: CellShape }) {
  switch (shape.kind) {
    case 'empty':
      return null
    case 'dot':
      return <circle cx={shape.x} cy={shape.y} r={5.5} fill={shape.fill ?? '#10141c'} />
    case 'circle':
      return (
        <circle
          cx={shape.cx}
          cy={shape.cy}
          r={shape.r}
          fill={shape.fill ?? 'none'}
          stroke={shape.stroke ?? '#10141c'}
          strokeWidth={2}
          strokeDasharray={shape.dashed ? '5 4' : undefined}
        />
      )
    case 'rect':
      return (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.w}
          height={shape.h}
          fill={shape.fill ?? 'none'}
          stroke={shape.stroke ?? '#10141c'}
          strokeWidth={2}
          rx={2}
        />
      )
    case 'line':
      return (
        <line
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
          stroke={shape.stroke ?? '#10141c'}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeDasharray={shape.dashed ? '5 4' : undefined}
        />
      )
    case 'poly':
      return (
        <polygon
          points={shape.points}
          fill={shape.fill ?? 'none'}
          stroke={shape.stroke ?? '#10141c'}
          strokeWidth={2}
        />
      )
    case 'arc':
      return (
        <path
          d={shape.d}
          fill={shape.fill ?? 'none'}
          stroke={shape.stroke ?? '#10141c'}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      )
    case 'text':
      return (
        <text
          x={shape.x}
          y={shape.y}
          textAnchor="middle"
          fontFamily="Bricolage Grotesque, Georgia, serif"
          fontSize="28"
          fontWeight="800"
          fill={shape.fill ?? '#10141c'}
        >
          {shape.value}
        </text>
      )
    default:
      return null
  }
}

export function CellSvg({
  cell,
  size = 80,
  missing = false,
}: {
  cell: MatrixCell | null
  size?: number
  missing?: boolean
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" role="img" aria-label={missing ? 'Missing cell' : 'Pattern cell'}>
      <rect x="1" y="1" width="78" height="78" rx="10" fill="#fff" stroke="rgba(16,20,28,0.12)" />
      {missing ? (
        <text
          x="40"
          y="48"
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fill="#0f766e"
          fontFamily="Bricolage Grotesque, Georgia, serif"
        >
          ?
        </text>
      ) : (
        cell?.map((shape, i) => <Shape key={i} shape={shape} />)
      )}
    </svg>
  )
}

export function MatrixSvg({ matrix }: { matrix: Array<MatrixCell | null> }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '0.55rem',
        justifyContent: 'center',
      }}
    >
      {matrix.map((cell, i) => (
        <CellSvg key={i} cell={cell} missing={cell === null} size={88} />
      ))}
    </div>
  )
}
