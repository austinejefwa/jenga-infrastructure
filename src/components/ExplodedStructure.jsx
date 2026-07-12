import { useState } from 'react'
import { motion } from 'framer-motion'

const LAYERS = [
  { title: 'Deck', desc: 'Reinforced concrete deck slab, rated for container handling loads.' },
  { title: 'Fenders & Bollards', desc: 'Absorb berthing impact and secure vessels alongside.' },
  { title: 'Sheet Pile Wall', desc: 'Steel sheet piling retains the quay face against sea pressure.' },
  { title: 'Rock Fill & Revetment', desc: 'Graded rock backfill stabilizes the structure and dissipates wave energy.' },
  { title: 'Seabed Foundation', desc: 'Piled foundation transfers load to competent bearing strata below the seabed.' },
]

export default function ExplodedStructure() {
  const [exploded, setExploded] = useState(false)

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Cross-Section — Berth Structure
        </p>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <h2 className="font-display text-3xl md:text-5xl text-concrete">
            What's beneath the deck
          </h2>
          <button
            onClick={() => setExploded((e) => !e)}
            data-cursor-pointer
            className="font-mono text-xs uppercase tracking-widest border border-amber/50 text-amber px-5 py-3 hover:bg-amber hover:text-ink transition-colors"
          >
            {exploded ? 'Collapse view' : 'Explode view'}
          </button>
        </div>

        <div className="relative flex flex-col items-center gap-3">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.title}
              animate={{
                y: exploded ? i * 14 : 0,
                x: exploded ? (i % 2 === 0 ? -40 : 40) : 0,
              }}
              transition={{ type: 'spring', damping: 18, stiffness: 120, delay: i * 0.05 }}
              className="relative w-full max-w-2xl"
            >
              <div className="h-16 md:h-20 border border-steel/60 bg-harbor flex items-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sea/10 to-transparent" />
                <span className="font-mono text-[10px] text-amber mr-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-lg text-concrete">{layer.title}</span>
              </div>
              <motion.p
                animate={{ opacity: exploded ? 1 : 0, height: exploded ? 'auto' : 0 }}
                transition={{ duration: 0.3, delay: exploded ? i * 0.05 + 0.15 : 0 }}
                className="font-mono text-xs text-concrete/60 px-6 pt-2 max-w-lg overflow-hidden"
              >
                {layer.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}