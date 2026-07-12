const CREDENTIALS = [
  { code: 'FIDIC', label: 'Contract Administration', detail: 'Sub-Clauses 20.1, 3.5 claims & determinations' },
  { code: 'JICA', label: 'Funded Works Compliance', detail: 'Japan International Cooperation Agency standards' },
  { code: 'KPA-PDM', label: 'Port Development Coordination', detail: 'Projects Development & Management protocols' },
]

export default function Accreditations() {
  return (
    <section className="relative py-20 px-6 md:px-10 border-t border-steel/60 bg-harbor/40">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-amber mb-10">
          Standards We Work Within
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-steel/60">
          {CREDENTIALS.map((c) => (
            <div key={c.code} className="bg-ink p-8">
              <p className="font-display text-2xl text-concrete mb-2">{c.code}</p>
              <p className="font-mono text-xs text-sea mb-2 uppercase tracking-wider">{c.label}</p>
              <p className="text-concrete/50 text-sm">{c.detail}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[11px] text-concrete/30 mt-6">
          Placeholder — replace with actual ISO/certification badges once available.
        </p>
      </div>
    </section>
  )
}