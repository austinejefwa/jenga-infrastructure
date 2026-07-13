import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PROJECTS = [
  {
    name: 'Second Container Terminal Expansion',
    phases: [
      { label: 'Survey', value: 100 },
      { label: 'Piling', value: 85 },
      { label: 'Deck Works', value: 60 },
      { label: 'Handover', value: 15 },
    ],
  },
  {
    name: 'Kilindini Harbour Berth Works',
    phases: [
      { label: 'Survey', value: 100 },
      { label: 'Sheet Piling', value: 100 },
      { label: 'Concrete Deck', value: 70 },
      { label: 'Handover', value: 20 },
    ],
  },
  {
    name: 'Likoni Floating Bridge',
    phases: [
      { label: 'Survey', value: 100 },
      { label: 'Pontoon Assembly', value: 90 },
      { label: 'Anchoring', value: 55 },
      { label: 'Handover', value: 10 },
    ],
  },
]

function Bar({ label, value }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] })
  const width = useTransform(scrollYProgress, [0, 1], ['0%', `${value}%`])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between font-mono text-[11px] text-concrete/60 mb-1.5">
        <span className="uppercase tracking-wider">{label}</span>
        <span className="text-amber">{value}%</span>
      </div>
      <div className="h-1.5 bg-steel/40 relative overflow-hidden">
        <motion.div style={{ width }} className="absolute inset-y-0 left-0 bg-amber" />
      </div>
    </div>
  )
}

export default function ProgressDashboard() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Live Status
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-4">
          Where things stand
        </h2>
        <p className="font-mono text-[11px] text-concrete/30 mb-14">
          Placeholder progress data — connect to real project tracking before launch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.name} className="border border-steel/60 bg-harbor p-7">
              <h3 className="font-display text-lg text-concrete mb-6">{project.name}</h3>
              {project.phases.map((phase) => (
                <Bar key={phase.label} label={phase.label} value={phase.value} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}