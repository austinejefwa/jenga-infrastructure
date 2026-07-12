const ARTICLES = [
  {
    tag: 'FIDIC',
    title: 'Understanding Sub-Clause 20.1: Contractor Claims in Practice',
    excerpt: 'A practical look at how claims are raised, evaluated, and determined on JICA-funded works.',
  },
  {
    tag: 'Port Infrastructure',
    title: 'What Container Terminal Expansion Actually Involves',
    excerpt: 'Breaking down the phases from survey to berth handover on a live terminal project.',
  },
  {
    tag: 'Project Management',
    title: 'Coordinating Multi-Stakeholder Marine Works',
    excerpt: 'Lessons from managing schedule, contract, and site reality across several parties at once.',
  },
]

export default function Insights() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-amber mb-3">
              Insights
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-concrete">
              Notes from the field
            </h2>
          </div>
          <a
            href="#"
            data-cursor-pointer
            className="font-mono text-xs uppercase tracking-widest text-concrete/50 hover:text-amber transition-colors"
          >
            View all articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((a) => (
            <a
              key={a.title}
              href="#"
              data-cursor-pointer
              className="group block border border-steel/60 bg-harbor p-7 hover:border-amber/50 transition-colors"
            >
              <p className="font-mono text-[10px] text-amber uppercase tracking-widest mb-4">
                {a.tag}
              </p>
              <h3 className="font-display text-xl text-concrete mb-3 group-hover:text-amber transition-colors">
                {a.title}
              </h3>
              <p className="text-concrete/50 text-sm leading-relaxed">{a.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}