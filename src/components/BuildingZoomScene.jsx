import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const INTERIOR_HOTSPOTS = [
  { pos: [-0.9, -0.3, 0.6], title: 'Reception Bay', desc: 'Ground floor entry and site coordination desk.', showAfter: 0.55 },
  { pos: [0.9, 1.1, -0.2], title: 'Site Office', desc: 'Upper floor office for engineers and project staff.', showAfter: 0.6 },
  { pos: [0, -0.9, -0.7], title: 'Structural Core', desc: 'Central columns transferring load to foundation.', showAfter: 0.65 },
]

function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function Hotspot({ pos, title, desc, showAfter, progressRef }) {
  const [open, setOpen] = useState(false)
  const groupRef = useRef()

  useFrame(() => {
    const p = progressRef.current
    if (groupRef.current) {
      groupRef.current.visible = p >= showAfter
    }
  })

  return (
    <group ref={groupRef} position={pos}>
      <mesh onClick={() => setOpen((o) => !o)}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#E8A33D" emissive="#E8A33D" emissiveIntensity={open ? 1.2 : 0.5} />
      </mesh>
      {open && (
        <Html distanceFactor={6} position={[0.15, 0, 0]}>
          <div className="bg-ink/95 border border-amber/40 px-4 py-3 w-[190px] font-mono text-[11px] text-concrete pointer-events-none">
            <p className="text-amber uppercase tracking-widest mb-1">{title}</p>
            <p className="text-concrete/70">{desc}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function BuildingZoomScene({ progressRef }) {
  const { camera } = useThree()
  const facadeRef = useRef()
  const roofRef = useRef()
  const targetVec = useRef(new THREE.Vector3())

  const KEYFRAMES = [
    { pos: [7, 4.5, 8], look: [0, 0.8, 0] },
    { pos: [4, 2.6, 4.5], look: [0, 0.6, 0] },
    { pos: [1.4, 1.2, 2], look: [0, 0.3, -0.5] },
    { pos: [0.2, 0.6, 0.8], look: [0, 0.2, -1.5] },
  ]

  useFrame(() => {
    const p = ease(Math.min(Math.max(progressRef.current, 0), 1))
    const segments = KEYFRAMES.length - 1
    const scaled = p * segments
    const idx = Math.min(Math.floor(scaled), segments - 1)
    const localT = scaled - idx

    const from = KEYFRAMES[idx]
    const to = KEYFRAMES[idx + 1]

    camera.position.set(
      lerp(from.pos[0], to.pos[0], localT),
      lerp(from.pos[1], to.pos[1], localT),
      lerp(from.pos[2], to.pos[2], localT)
    )
    targetVec.current.set(
      lerp(from.look[0], to.look[0], localT),
      lerp(from.look[1], to.look[1], localT),
      lerp(from.look[2], to.look[2], localT)
    )
    camera.lookAt(targetVec.current)

    const facadeOpacity = 1 - Math.min(Math.max((p - 0.35) / 0.35, 0), 1)
    if (facadeRef.current) {
      facadeRef.current.material.opacity = facadeOpacity
    }
    if (roofRef.current) {
      roofRef.current.material.opacity = Math.max(facadeOpacity, 0.15)
    }
  })

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#131B24" />
      </mesh>

      <mesh position={[0, -1.5, -0.5]}>
        <boxGeometry args={[2.4, 0.08, 2]} />
        <meshStandardMaterial color="#1F2E3A" />
      </mesh>
      <mesh position={[0, 0.5, -0.5]}>
        <boxGeometry args={[2.4, 0.08, 2]} />
        <meshStandardMaterial color="#1F2E3A" />
      </mesh>
      <mesh position={[0, 2.3, -0.5]}>
        <boxGeometry args={[2.4, 0.08, 2]} />
        <meshStandardMaterial color="#1F2E3A" />
      </mesh>

      {[[-1, -1.5], [1, -1.5], [-1, 0.5], [1, 0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]}>
          <cylinderGeometry args={[0.06, 0.06, 3.8, 8]} />
          <meshStandardMaterial color="#4A9B8E" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}

      <mesh position={[-0.9, -1.3, 0.6]}>
        <boxGeometry args={[0.7, 0.35, 0.35]} />
        <meshStandardMaterial color="#E8A33D" emissive="#E8A33D" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.9, -0.3, -0.2]}>
        <boxGeometry args={[0.5, 0.3, 0.35]} />
        <meshStandardMaterial color="#C9CDD3" />
      </mesh>
      <mesh position={[0.9, 1.7, -0.2]}>
        <boxGeometry args={[0.5, 0.3, 0.35]} />
        <meshStandardMaterial color="#C9CDD3" />
      </mesh>

      <mesh ref={facadeRef} position={[0, 0.5, 1]}>
        <boxGeometry args={[2.6, 4.2, 0.06]} />
        <meshStandardMaterial color="#1F2E3A" transparent opacity={1} metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[-1.3, 0.5, -0.5]}>
        <boxGeometry args={[0.06, 4.2, 3]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[1.3, 0.5, -0.5]}>
        <boxGeometry args={[0.06, 4.2, 3]} />
        <meshStandardMaterial color="#1F2E3A" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh ref={roofRef} position={[0, 2.62, -0.5]}>
        <boxGeometry args={[2.6, 0.06, 3]} />
        <meshStandardMaterial color="#131B24" transparent opacity={1} />
      </mesh>

      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 1.04]}>
          <boxGeometry args={[0.5, 3.6, 0.02]} />
          <meshStandardMaterial color="#E8A33D" emissive="#E8A33D" emissiveIntensity={0.15} transparent opacity={0.4} />
        </mesh>
      ))}

      {INTERIOR_HOTSPOTS.map((h) => (
        <Hotspot key={h.title} {...h} progressRef={progressRef} />
      ))}
    </group>
  )
}