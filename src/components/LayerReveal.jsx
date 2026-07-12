import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const LAYERS = [
  { label: '01', title: 'Survey', desc: 'Site boundaries, levels, and coordinates established before any work begins.' },
  { label: '02', title: 'Excavation', desc: 'Ground prepared, piling and sheet works driven to design depth.' },
  { label: '03', title: 'Foundation', desc: 'Concrete, formwork, and structural base laid against approved drawings.' },
  { label: '04', title: 'Structure', desc: 'The build rises — coordinated against contract, schedule, and site reality.' },
]

function Layer({ layer, index, progress, total }) {
  const start = index / total
  const end = start + 1 / total

  const y = useTransform(progress, [start, end], ['60px', '0px'])
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1])
  const scale = useTransform(progress, [start, start + 0.12], [0.96, 1])

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="flex items-start gap-6 md:gap-10 border-t border-steel/60 py-8 md:py-10"
    >
      <span className="font-mono text-sea/70 text-sm mt-1">{layer.label}</span>
      <div>
        <h3 className="font-display text-2xl md:text-3xl text-concrete mb-2">{layer.title}</h3>
        <p className="text-concrete/60 max-w-xl text-sm md:text-base">{layer.desc}</p>
      </div>
    </motion.div>
  )
}

export default function LayerReveal() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  })

  return (
    <section ref={containerRef} className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-amber mb-3">
          How the ground gets built
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-10">
          Layer by layer
        </h2>
        {LAYERS.map((layer, i) => (
          <Layer key={layer.title} layer={layer} index={i} progress={scrollYProgress} total={LAYERS.length} />
        ))}
      </div>
    </section>
  )
}