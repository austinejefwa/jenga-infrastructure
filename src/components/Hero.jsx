import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden blueprint-grid">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0F14_75%)]" />

      <div className="hidden lg:block absolute bottom-8 left-6 md:left-10 font-mono text-[11px] tracking-widest text-sea/70">
        SITE: KILINDINI HARBOUR<br />
        04.0435°S, 39.6682°E<br />
        MOMBASA, KENYA
      </div>
      <div className="hidden lg:block absolute bottom-8 right-6 md:right-10 font-mono text-[11px] tracking-widest text-sea/70 text-right">
        EST. 2026<br />
        JENGA INFRASTRUCTURE CO.
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-amber mb-6"
        >
          Port &amp; Civil Infrastructure Delivery
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[13vw] md:text-[6.5vw] leading-[0.95] tracking-tight text-concrete font-medium max-w-5xl"
        >
          We build the ground
          <br />
          nations move on.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 max-w-xl text-concrete/70 text-base md:text-lg"
        >
          Jenga Infrastructure Co. delivers port, marine, and civil works from
          survey to handover — coordinated against contract, schedule, and
          site reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 mb-16 lg:mb-0 flex items-center gap-2 font-mono text-xs text-concrete/50"
        >
          <span className="inline-block w-8 h-px bg-amber" />
          Scroll to survey the work
        </motion.div>
      </div>
    </section>
  )
}