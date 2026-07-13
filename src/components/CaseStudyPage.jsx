import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import terminalImg from '../assets/terminal.jpg'
import bridgeImg from '../assets/bridge.jpg'
import berthImg from '../assets/berth.jpg'

const CASE_STUDIES = {
  'container-terminal': {
    name: 'Second Container Terminal Expansion',
    type: 'Port Infrastructure',
    location: 'Kilindini Harbour, Mombasa',
    image: terminalImg,
    summary: 'Expansion of container handling capacity through new berth construction, gantry crane installation, and yard reconfiguration.',
    stats: [
      { label: 'Contract Framework', value: 'FIDIC (Cl. 20.1, 3.5)' },
      { label: 'Funding', value: 'JICA-financed' },
      { label: 'Scope', value: 'Berth, yard, crane rail' },
      { label: 'Status', value: 'Placeholder data' },
    ],
  },
  'berth-works': {
    name: 'Kilindini Harbour Berth Works',
    type: 'Marine & Civil Works',
    location: 'Mombasa Port',
    image: berthImg,
    summary: 'Marine civil works including sheet piling, concrete quay deck, and revetment stabilization along the berth face.',
    stats: [
      { label: 'Contract Framework', value: 'FIDIC (Cl. 20.1, 3.5)' },
      { label: 'Funding', value: 'JICA-financed' },
      { label: 'Scope', value: 'Sheet piling, deck, revetment' },
      { label: 'Status', value: 'Placeholder data' },
    ],
  },
  'floating-bridge': {
    name: 'Likoni Floating Bridge',
    type: 'Bridge Infrastructure',
    location: 'Likoni Channel, Mombasa',
    image: bridgeImg,
    summary: 'Pontoon bridge infrastructure connecting the Likoni channel, coordinated for marine traffic and pedestrian safety.',
    stats: [
      { label: 'Contract Framework', value: 'FIDIC (Cl. 20.1, 3.5)' },
      { label: 'Funding', value: 'JICA-financed' },
      { label: 'Scope', value: 'Pontoon deck, anchoring' },
      { label: 'Status', value: 'Placeholder data' },
    ],
  },
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = CASE_STUDIES[slug]

  if (!study) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-6">
        <p className="font-mono text-amber text-xs uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display text-3xl text-concrete mb-6">Project not found</h1>
        <Link to="/" className="font-mono text-xs text-sea underline" data-cursor-pointer>Back to home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <Link to="/#projects" data-cursor-pointer className="font-mono text-xs text-concrete/50 hover:text-amber transition-colors mb-10 inline-block">
          ← Back to projects
        </Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-xs tracking-widest uppercase text-amber mb-3">{study.type}</p>
          <h1 className="font-display text-3xl md:text-5xl text-concrete mb-3">{study.name}</h1>
          <p className="font-mono text-xs text-concrete/50 mb-10">{study.location}</p>
          <div className="aspect-video border border-steel/60 overflow-hidden mb-10">
            <img src={study.image} alt={study.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-concrete/70 text-base md:text-lg leading-relaxed mb-12 max-w-2xl">{study.summary}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.stats.map((s) => (
              <div key={s.label} className="border border-steel/60 p-5">
                <p className="font-mono text-[10px] text-amber uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-concrete text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}