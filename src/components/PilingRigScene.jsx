import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

const HOTSPOTS = [
  { pos: [0, 2.8, 0.3], title: 'Leader Mast', desc: 'Guides the hammer vertically to maintain pile alignment during driving.' },
  { pos: [0, 1.2, 0.5], title: 'Hydraulic Hammer', desc: 'Delivers repeated impact force to drive the pile to design depth.' },
  { pos: [-1.2, -1.5, 0.4], title: 'Crawler Base', desc: 'Tracked chassis providing stability across soft or uneven ground.' },
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

export default function PilingRigScene() {
  const rigRef = useRef()

  useFrame((state) => {
    if (rigRef.current) {
      rigRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.06
    }
  })

  return (
    <group ref={rigRef}>
      {/* Crawler base */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[1.6, 0.4, 1]} />
        <meshStandardMaterial color="#131B24" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.9, -1.9, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.9, -1.9, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Leader mast */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.18, 5.2, 0.18]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Hydraulic hammer */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.35, 0.6, 0.35]} />
        <meshStandardMaterial color="#E8A33D" emissive="#E8A33D" emissiveIntensity={0.3} />
      </mesh>

      {/* Pile */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.2, 12]} />
        <meshStandardMaterial color="#4A9B8E" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0.5, -1.2, 0.3]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#C9CDD3" metalness={0.2} roughness={0.6} />
      </mesh>

      {HOTSPOTS.map((h) => (
        <Hotspot key={h.title} {...h} />
      ))}
    </group>
  )
}