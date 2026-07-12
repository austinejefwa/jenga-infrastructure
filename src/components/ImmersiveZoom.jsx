import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ImmersiveZoom() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 1.3])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-sea/20 via-harbor to-ink blueprint-grid"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0B0F14_90%)]" />
        <motion.div style={{ opacity: textOpacity }} className="relative text-center px-6">
          <p className="font-mono text-xs tracking-widest uppercase text-amber mb-4">
            Kilindini Harbour — Berth 19
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-concrete max-w-2xl mx-auto">
            Every detail, surveyed and accounted for.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}