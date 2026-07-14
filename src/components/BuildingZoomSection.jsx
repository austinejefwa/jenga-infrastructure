import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import BuildingZoomScene from './BuildingZoomScene'

export default function BuildingZoomSection() {
  const containerRef = useRef(null)
  const progressRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
  })

  return (
    <section ref={containerRef} className="relative h-[280vh] border-t border-steel/60">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-28 left-6 md:left-10 z-10 max-w-sm">
          <p className="font-mono text-xs tracking-widest uppercase text-amber mb-3">
            Exterior to Interior
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-concrete mb-3">
            Walk through the build
          </h2>
          <p className="font-mono text-[11px] text-concrete/40">
            Keep scrolling — the camera flies from the exterior facade into a
            structural cutaway of the site office.
          </p>
        </div>

        <Canvas camera={{ position: [7, 4.5, 8], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 6, 4]} intensity={1.1} color="#E8A33D" />
          <directionalLight position={[-5, -2, -4]} intensity={0.3} color="#4A9B8E" />
          <BuildingZoomScene progressRef={progressRef} />
        </Canvas>

        <div className="absolute bottom-8 left-6 md:left-10 font-mono text-[10px] text-concrete/30">
          Scroll-driven camera — click amber points once inside for detail
        </div>
      </div>
    </section>
  )
}