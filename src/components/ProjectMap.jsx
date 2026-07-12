import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Simplified coordinate positions (percentage-based) on a stylized East Africa outline
const SITES = [
  { id: 'mombasa', name: 'Mombasa / Kilindini Harbour', x: 78, y: 68, projects: 3 },
  { id: 'likoni', name: 'Likoni Channel', x: 79, y: 71, projects: 1 },
  { id: 'nairobi', name: 'Nairobi (HQ)', x: 58, y: 52, projects: 0 },
]

export default function ProjectMap() {
  const [active, setActive] = useState('mombasa')
  const activeSite = SITES.find((s) => s.id === active)

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Site Coverage
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-14">
          Where we operate
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Map area */}
          <div className="md:col-span-3 relative aspect-[4/3] border border-steel/60 bg-harbor blueprint-grid overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20">
              <path
                d="M 40 10 L 60 8 L 75 20 L 85 45 L 80 75 L 65 90 L 45 88 L 30 70 L 25 40 Z"
                fill="none"
                stroke="#4A9B8E"
                strokeWidth="0.5"
              />
            </svg>

            {SITES.map((site) => (
              <button
                key={site.id}
                onClick={() => setActive(site.id)}
                data-cursor-pointer
                style={{ left: `${site.x}%`, top: `${site.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.span
                  animate={{
                    scale: active === site.id ? 1.4 : 1,
                  }}
                  className={`block w-3 h-3 rounded-full border-2 ${
                    active === site.id ? 'bg-amber border-amber' : 'bg-transparent border-sea'
                  }`}
                />
                {active === site.id && (
                  <motion.span
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-amber"
                  />
                )}
              </button>
            ))}

            <div className="absolute bottom-3 left-3 font-mono text-[10px] text-concrete/30">
              Stylized reference map — not to scale
            </div>
          </div>

          {/* Info panel */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border border-steel/60 bg-harbor p-7 h-full"
              >
                <p className="font-mono text-[10px] text-amber uppercase tracking-widest mb-2">
                  Site
                </p>
                <h3 className="font-display text-2xl text-concrete mb-4">
                  {activeSite.name}
                </h3>
                <p className="font-mono text-xs text-concrete/50 mb-6">
                  {activeSite.projects > 0
                    ? `${activeSite.projects} active/delivered project${activeSite.projects > 1 ? 's' : ''}`
                    : 'Coordination base'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SITES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      data-cursor-pointer
                      className={`font-mono text-[10px] uppercase tracking-wider px-3 py-2 border transition-colors ${
                        active === s.id
                          ? 'border-amber text-amber'
                          : 'border-steel/60 text-concrete/50 hover:border-concrete/60'
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}