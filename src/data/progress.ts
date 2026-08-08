export interface Workstream {
  id: string
  title: string
  percent: number
  status: 'done' | 'running' | 'queued'
  summary: string
}

export interface ProgressSnapshot {
  totalPercent: number
  phase: string
  updatedAt: string
  branch: string
  workstreams: Workstream[]
  criteria: Array<{ label: string; done: boolean }>
}

/** Single source for the in-app progress board at /progress */
export const PROGRESS: ProgressSnapshot = {
  totalPercent: 100,
  phase: 'v1 tamamlandı (build yeşil)',
  updatedAt: '2026-08-08 12:28 UTC',
  branch: 'cursor/iqmaster-platform-v1-472f',
  workstreams: [
    {
      id: 'A',
      title: 'Tasarım → referans site',
      percent: 100,
      status: 'done',
      summary: 'Mor/indigo landing, hero CTA, how-it-works, trust strip',
    },
    {
      id: 'B',
      title: 'Erken bitirme + görsel-only motor',
      percent: 100,
      status: 'done',
      summary: 'Finish now, kısmi skor + güven notu, 30 görsel soru',
    },
    {
      id: 'C',
      title: 'Yaş grupları + çocuk bankaları',
      percent: 100,
      status: 'done',
      summary: 'Kids 12 · Teens 16 · Adult 30 · /age-groups',
    },
    {
      id: 'D',
      title: 'B2B paket / kredi',
      percent: 100,
      status: 'done',
      summary: 'Aile→İK paketleri, kredi defteri, org dashboard',
    },
    {
      id: 'E',
      title: 'PDF + sosyal paylaşım',
      percent: 100,
      status: 'done',
      summary: 'ReportActions: print/PDF + X/LinkedIn/Facebook/WhatsApp',
    },
    {
      id: 'F',
      title: 'Entegrasyon + build',
      percent: 100,
      status: 'done',
      summary: 'Routing, nav, build yeşil',
    },
  ],
  criteria: [
    { label: 'Tasarım referansa daha yakın', done: true },
    { label: 'İstediğin soruda bitir + güven notu', done: true },
    { label: 'Sadece görsel sorular', done: true },
    { label: 'Çocuk / yaş grupları', done: true },
    { label: 'Paketler: Koç, Öğretmen, Aile, Şirket, İK', done: true },
    { label: 'PDF rapor + sosyal paylaşım', done: true },
    { label: 'Build yeşil', done: true },
  ],
}
