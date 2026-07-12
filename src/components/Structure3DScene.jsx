import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

const HOTSPOTS = [
  { pos: [0, 2.6, 0.6], title: 'Boom', desc: 'Extends over the vessel to lift containers from deck to quay.' },
  { pos: [1.3, 0.9, 0.9], title: 'Trolley', desc: 'Travels the boom length carrying the spreader and load.' },
  { pos: [0, -1.4, 0.9], title: 'Gantry Legs', desc: 'Steel legs run on rail, distributing load across the quay.' },
]

function Hotspot({ pos, title, desc }) {
  const [open, setOpen] = useState(false)
  return (
    <group position={pos}>
      <mesh onClick={() => setOpen((o) => !o)}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#E8A33D" emissive="#E8A33D" emissiveIntensity={open ? 1.2 : 0.4} />
      </mesh>
      {open && (
        <Html distanceFactor={8} position={[0.2, 0, 0]}>
          <div className="bg-ink/95 border border-amber/40 px-4 py-3 w-[200px] font-mono text-[11px] text-concrete pointer-events-none">
            <p className="text-amber uppercase tracking-widest mb-1">{title}</p>
            <p className="text-concrete/70">{desc}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function Structure3DScene() {
  const craneRef = useRef()

  useFrame((state) => {
    if (craneRef.current) {
      craneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08
    }
  })

  return (
    <group ref={craneRef}>
      {/* Legs */}
      <mesh position={[-1.4, -1.4, 0]}>
        <boxGeometry args={[0.25, 3.4, 0.25]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[1.4, -1.4, 0]}>
        <boxGeometry args={[0.25, 3.4, 0.25]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Base rail */}
      <mesh position={[0, -3.1, 0]}>
        <boxGeometry args={[3.4, 0.15, 0.6]} />
        <meshStandardMaterial color="#131B24" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Boom */}
      <mesh position={[0.4, 2.6, 0]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[4.2, 0.18, 0.3]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Trolley */}
      <mesh position={[1.3, 2.5, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.4]} />
        <meshStandardMaterial color="#E8A33D" emissive="#E8A33D" emissiveIntensity={0.3} />
      </mesh>

      {/* Cabin */}
      <mesh position={[-1.4, 0.3, 0.4]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#4A9B8E" metalness={0.3} roughness={0.6} />
      </mesh>

      {HOTSPOTS.map((h) => (
        <Hotspot key={h.title} {...h} />
      ))}
    </group>
  )
}