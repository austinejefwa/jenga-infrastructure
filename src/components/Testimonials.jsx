const TESTIMONIALS = [
  {
    quote: "Every milestone was tracked against the FIDIC schedule without a single surprise at handover.",
    name: 'Site Engineer',
    org: 'JICA-Funded Works, Mombasa',
  },
  {
    quote: "Clear daily coordination between contractors and the client team — that's rare on port projects this size.",
    name: 'Contracts Officer',
    org: 'Port Development Partner',
  },
  {
    quote: "Survey-to-handover documentation was the cleanest we've reviewed on a marine works claim.",
    name: 'Project Sponsor',
    org: 'Civil Infrastructure Client',
  },
]

const PARTNERS = ['KPA', 'JICA', 'FIDIC', 'Toyo Construction', 'SECO', 'Mazingira']

export default function Testimonials() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Trusted On Site
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-14">
          What partners say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="border border-steel/60 bg-harbor p-7">
              <p className="text-concrete/80 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <p className="font-mono text-xs text-amber">{t.name}</p>
              <p className="font-mono text-[11px] text-concrete/40">{t.org}</p>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs tracking-widest uppercase text-concrete/40 mb-6">
          Worked alongside
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          {PARTNERS.map((p) => (
            <span key={p} className="font-display text-lg text-concrete/50 tracking-wide">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}