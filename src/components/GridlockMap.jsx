const GATES = [
  { id: 1, x: 30, y: 25, level: 'high' },
  { id: 2, x: 45, y: 20, level: 'medium' },
  { id: 3, x: 55, y: 35, level: 'low' },
  { id: 4, x: 65, y: 55, level: 'high' },
  { id: 5, x: 40, y: 65, level: 'medium' },
]

const LEVEL_COLOR = { high: '#E8544A', medium: '#E8A33D', low: '#4A9B8E' }
const LEVEL_LABEL = { high: 'Heavy delay', medium: 'Moderate', low: 'Clear' }

export default function GridlockMap() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          For Transport &amp; Logistics
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-4">
          Port gate congestion
        </h2>
        <p className="font-mono text-[11px] text-concrete/30 mb-10">
          Static demo data — live feed integration pending transport authority access.
        </p>

        <div className="relative aspect-[16/10] border border-steel/60 bg-harbor blueprint-grid overflow-hidden">
          {GATES.map((g) => (
            <div
              key={g.id}
              style={{ left: `${g.x}%`, top: `${g.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <span
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: LEVEL_COLOR[g.level] }}
              />
              <span className="font-mono text-[10px] text-concrete/60 mt-1">Gate {g.id}</span>
            </div>
          ))}
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-concrete/30">
            Stylized reference — not to scale
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          {Object.entries(LEVEL_LABEL).map(([level, label]) => (
            <div key={level} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LEVEL_COLOR[level] }} />
              <span className="font-mono text-[11px] text-concrete/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}