import { useState } from 'react'
import { motion } from 'framer-motion'

const CAPABILITIES = [
  { title: 'Port Infrastructure', desc: 'Container terminals, berths, and quay construction.' },
  { title: 'Marine Works', desc: 'Dredging coordination, revetments, and marine civil works.' },
  { title: 'Contract Administration', desc: 'FIDIC-based claims, determinations, and compliance.' },
  { title: 'Project Coordination', desc: 'Schedule, stakeholder, and site coordination end to end.' },
]

export default function Capabilities3D() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Capabilities
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-16">
          What we coordinate
        </h2>

        <div className="relative h-[320px] flex items-center justify-center" style={{ perspective: 1200 }}>
          {CAPABILITIES.map((cap, i) => {
            const diff = i - active
            return (
              <motion.div
                key={cap.title}
                animate={{
                  x: diff * 220,
                  rotateY: diff * -35,
                  scale: diff === 0 ? 1 : 0.82,
                  opacity: Math.abs(diff) > 1 ? 0 : 1,
                  zIndex: 10 - Math.abs(diff),
                }}
                transition={{ type: 'spring', damping: 22, stiffness: 150 }}
                className="absolute w-[280px] h-[280px] border border-steel/60 bg-harbor p-7 flex flex-col justify-between cursor-pointer"
                onClick={() => setActive(i)}
                data-cursor-pointer
              >
                <span className="font-mono text-[10px] text-amber">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl text-concrete mb-2">{cap.title}</h3>
                  <p className="font-mono text-xs text-concrete/50">{cap.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {CAPABILITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor-pointer
              className={`w-8 h-px transition-colors ${i === active ? 'bg-amber' : 'bg-steel'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}