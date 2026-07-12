import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yFar = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const yNear = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative h-[130vh] overflow-hidden border-t border-steel/60">
      <motion.div style={{ y: yFar }} className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="sticky top-0 h-screen flex items-center">
        <motion.div style={{ y: yNear, opacity }} className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-amber mb-6">
            Why we build this way
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-concrete leading-tight">
            Infrastructure outlives the contract that built it.
            <br />
            <span className="text-concrete/50">Every detail on site is a decision someone will live with for decades.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  )
}