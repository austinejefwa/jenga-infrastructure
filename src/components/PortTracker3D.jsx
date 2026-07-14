import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'

const SITES = [
  { id: 'kipevu', name: 'Kipevu Oil Terminal', pos: [-2, 0, 1], progress: 62, status: 'Active' },
  { id: 'dongokundu', name: 'Dongo Kundu Bypass', pos: [1.5, 0, -1.2], progress: 78, status: 'Active' },
  { id: 'terminal2', name: 'Second Container Terminal', pos: [0, 0, 1.8], progress: 45, status: 'Active' },
  { id: 'likoni', name: 'Likoni Floating Bridge', pos: [-1.2, 0, -1.8], progress: 90, status: 'Near Completion' },
]

function SiteMarker({ site, onSelect, isActive }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 2 + site.pos[0]) * 0.05
    }
  })

  return (
    <group position={site.pos}>
      <mesh
        ref={ref}
        onClick={() => onSelect(site.id)}
        onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
      >
        <coneGeometry args={[0.15, 0.4, 4]} />
        <meshStandardMaterial
          color={isActive ? '#E8A33D' : '#4A9B8E'}
          emissive={isActive ? '#E8A33D' : '#4A9B8E'}
          emissiveIntensity={isActive ? 1 : 0.4}
        />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 24]} />
        <meshBasicMaterial color={isActive ? '#E8A33D' : '#4A9B8E'} transparent opacity={0.5} />
      </mesh>
      {isActive && (
        <Html distanceFactor={7} position={[0.25, 0.3, 0]}>
          <div className="bg-ink/95 border border-amber/40 px-4 py-3 w-[220px] font-mono text-[11px] text-concrete pointer-events-none">
            <p className="text-amber uppercase tracking-widest mb-1">{site.name}</p>
            <p className="text-concrete/60 mb-2">{site.status}</p>
            <div className="h-1 bg-steel/40 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-amber" style={{ width: `${site.progress}%` }} />
            </div>
            <p className="text-concrete/40 mt-1">{site.progress}% complete</p>
          </div>
        </Html>
      )}
    </group>
  )
}

function Scene({ active, onSelect }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#E8A33D" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[8, 8, 20, 20]} />
        <meshStandardMaterial color="#131B24" wireframe />
      </mesh>
      {SITES.map((site) => (
        <SiteMarker key={site.id} site={site} onSelect={onSelect} isActive={active === site.id} />
      ))}
      <OrbitControls enablePan={false} minDistance={4} maxDistance={10} maxPolarAngle={Math.PI / 2.2} autoRotate autoRotateSpeed={0.4} />
    </>
  )
}

export default function PortTracker3D() {
  const [active, setActive] = useState('kipevu')
  const activeSite = SITES.find((s) => s.id === active)

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Live Site Overview
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-4">
          Mombasa mega-projects tracker
        </h2>
        <p className="font-mono text-[11px] text-concrete/30 mb-10">
          Illustrative progress markers — connect to real project data before public launch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 relative h-[420px] border border-steel/60 bg-harbor" data-cursor-pointer>
            <Canvas camera={{ position: [3, 3, 5], fov: 45 }}>
              <Scene active={active} onSelect={setActive} />
            </Canvas>
          </div>
          <div className="md:col-span-1 flex flex-col gap-2">
            {SITES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                data-cursor-pointer
                className={`text-left font-mono text-[11px] uppercase tracking-wider px-4 py-4 border transition-colors ${
                  active === s.id ? 'border-amber text-amber' : 'border-steel/60 text-concrete/50 hover:border-concrete/60'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}