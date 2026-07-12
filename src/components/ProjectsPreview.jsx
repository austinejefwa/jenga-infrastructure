import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    name: 'Second Container Terminal Expansion',
    type: 'Port Infrastructure',
    location: 'Kilindini Harbour, Mombasa',
    tone: 'from-sea/20',
  },
  {
    name: 'Kilindini Harbour Berth Works',
    type: 'Marine & Civil Works',
    location: 'Mombasa Port',
    tone: 'from-amber/20',
  },
  {
    name: 'Likoni Floating Bridge',
    type: 'Bridge Infrastructure',
    location: 'Likoni Channel, Mombasa',
    tone: 'from-sea/20',
  },
]

function ProjectCard({ project }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-pointer
      className="group relative h-[420px] overflow-hidden border border-steel/60 bg-harbor cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.tone} to-ink blueprint-grid opacity-60`} />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 280px at ${pos.x}% ${pos.y}%, rgba(232,163,61,0.16), transparent 70%)`,
        }}
      />

      <motion.div
        animate={{ y: hovered ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink via-ink/80 to-transparent"
      >
        <p className="font-mono text-[10px] tracking-widest uppercase text-amber mb-2">
          {project.type}
        </p>
        <h3 className="font-display text-xl text-concrete mb-1">{project.name}</h3>
        <p className="font-mono text-xs text-concrete/50">{project.location}</p>
      </motion.div>
    </div>
  )
}

export default function ProjectsPreview() {
  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
              Site Survey — Selected Works
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-concrete">
              Projects on the ground
            </h2>
          </div>
          <p className="font-mono text-xs text-concrete/50 max-w-xs">
            Placeholder entries — swap in real project photography and
            details before launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}