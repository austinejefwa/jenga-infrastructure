import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const PROJECTS = [
  {
    slug: 'container-terminal',
    name: 'Second Container Terminal Expansion',
    type: 'Port Infrastructure',
    location: 'Kilindini Harbour, Mombasa',
    tone: 'from-sea/25',
  },
  {
    slug: 'berth-works',
    name: 'Kilindini Harbour Berth Works',
    type: 'Marine & Civil Works',
    location: 'Mombasa Port',
    tone: 'from-amber/25',
  },
  {
    slug: 'floating-bridge',
    name: 'Likoni Floating Bridge',
    type: 'Bridge Infrastructure',
    location: 'Likoni Channel, Mombasa',
    tone: 'from-sea/25',
  },
]

function Column({ project, index, progress }) {
  const start = index * 0.28
  const end = start + 0.35

  const y = useTransform(progress, [start, end], ['40%', '0%'])
  const opacity = useTransform(progress, [start, start + 0.15], [0.2, 1])

  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setPos({ x: px * 100, y: py * 100 })
    setTilt({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 10 })
  }

  const handleLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <Link to={`/projects/${project.slug}`} data-cursor-pointer>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        style={{ transformPerspective: 1000 }}
        className="group relative h-[70vh] w-[80vw] md:w-[420px] flex-shrink-0 overflow-hidden border border-steel/60 bg-harbor cursor-pointer"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.tone} to-ink blueprint-grid opacity-60`} />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 300px at ${pos.x}% ${pos.y}%, rgba(232,163,61,0.18), transparent 70%)`,
          }}
        />

        <motion.div
          style={{ y, opacity }}
          className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-ink via-ink/85 to-transparent"
        >
          <p className="font-mono text-[10px] tracking-widest uppercase text-amber mb-2">
            {project.type}
          </p>
          <h3 className="font-display text-2xl text-concrete mb-2">{project.name}</h3>
          <p className="font-mono text-xs text-concrete/50">{project.location}</p>
          <p className="font-mono text-[10px] text-sea mt-3 uppercase tracking-wider">
            View case study →
          </p>
        </motion.div>

        <div className="absolute top-4 right-4 font-mono text-[10px] text-concrete/30">
          {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
        </div>
      </motion.div>
    </Link>
  )
}

export default function ProjectsSlider() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-62%'])

  return (
    <section id="projects" ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden" style={{ perspective: 1000 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full mb-10">
          <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
            Site Survey — Selected Works
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-concrete">
            Projects on the ground
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-10">
          {PROJECTS.map((p, i) => (
            <Column key={p.name} project={p} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full mt-10 flex items-center gap-2 font-mono text-xs text-concrete/40">
          <span className="inline-block w-8 h-px bg-amber" />
          Keep scrolling to move through the site
        </div>
      </div>
    </section>
  )
}