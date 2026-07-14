import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'

const STATS = [
  { value: 3, suffix: '', label: 'Active project types' },
  { value: 2, suffix: '', label: 'Coordination sites' },
  { value: 20, suffix: '.1', label: 'FIDIC Sub-Clause focus', isDecimal: true },
  { value: 100, suffix: '%', label: 'Survey-to-handover documented' },
]

function Counter({ value, suffix, isDecimal }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => (isDecimal ? v.toFixed(1) : Math.round(v)))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
      return controls.stop
    }
  }, [inView, value, count])

  return (
    <span ref={ref} className="font-display text-4xl md:text-6xl text-concrete">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10 border-t border-steel/60 bg-harbor/30">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-14 text-center">
          At a Glance
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} isDecimal={s.isDecimal} />
              <p className="font-mono text-[11px] text-concrete/40 uppercase tracking-wider mt-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}