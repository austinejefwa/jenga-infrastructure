import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ImmersiveReveal() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const clipTop = useTransform(scrollYProgress, [0.1, 0.5], ['48%', '0%'])
  const clipBottom = useTransform(scrollYProgress, [0.1, 0.5], ['48%', '0%'])
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const textY = useTransform(scrollYProgress, [0.35, 0.55], [30, 0])

  return (
    <section ref={ref} className="relative h-[160vh] border-t border-steel/60">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-ink">
        <div className="absolute inset-0 blueprint-grid opacity-40" />

        {/* Wipe panels that reveal the content beneath */}
        <motion.div
          style={{ height: clipTop }}
          className="absolute top-0 left-0 right-0 bg-harbor z-10"
        />
        <motion.div
          style={{ height: clipBottom }}
          className="absolute bottom-0 left-0 right-0 bg-harbor z-10"
        />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-0 text-center px-6 max-w-3xl"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-amber mb-6">
            Our Approach
          </p>
          <h2 className="font-display text-3xl md:text-6xl text-concrete leading-tight mb-6">
            Nothing on site is guesswork.
          </h2>
          <p className="text-concrete/60 text-base md:text-lg">
            Every decision — survey mark, pile depth, concrete pour — is
            documented, checked, and traceable back to the drawing it came from.
          </p>
        </motion.div>
      </div>
    </section>
  )
}