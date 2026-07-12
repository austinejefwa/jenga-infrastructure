import { motion } from 'framer-motion'
import austinePhoto from '../assets/austine.jpg'

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 relative"
        >
          <div className="relative border border-steel/60 overflow-hidden aspect-[4/5]">
            <img
              src={austinePhoto}
              alt="Austine on site, Mombasa"
              className="w-full h-full object-cover grayscale-[30%] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-widest text-amber uppercase">
              On site — Mombasa
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-3"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-sea mb-4">
            Project Manager
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-concrete mb-6">
            Austine
          </h2>
          <p className="text-concrete/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            1 year of experience in infrastructure project coordination, with
            hands-on exposure to JICA-funded port development works and
            FIDIC-based contract administration — including claims and
            determinations under Sub-Clauses 20.1 and 3.5. Background in
            Projects Development &amp; Management, focused on keeping
            complex, multi-stakeholder infrastructure projects on schedule
            and in compliance.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md font-mono text-xs">
            <div className="border border-steel/60 p-4">
              <p className="text-amber mb-1">Focus</p>
              <p className="text-concrete/60">Port &amp; civil infrastructure</p>
            </div>
            <div className="border border-steel/60 p-4">
              <p className="text-amber mb-1">Contract framework</p>
              <p className="text-concrete/60">FIDIC (Cl. 20.1, 3.5)</p>
            </div>
            <div className="border border-steel/60 p-4">
              <p className="text-amber mb-1">Funding context</p>
              <p className="text-concrete/60">JICA-financed works</p>
            </div>
            <div className="border border-steel/60 p-4">
              <p className="text-amber mb-1">Base</p>
              <p className="text-concrete/60">Mombasa, Kenya</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}