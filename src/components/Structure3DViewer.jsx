import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Structure3DScene from './Structure3DScene'
import PilingRigScene from './PilingRigScene'

const MODELS = [
  { id: 'crane', label: 'Gantry Crane', Scene: Structure3DScene },
  { id: 'rig', label: 'Piling Rig', Scene: PilingRigScene },
]

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="#E8A33D" wireframe />
    </mesh>
  )
}

export default function Structure3DViewer() {
  const [isLowPower, setIsLowPower] = useState(false)
  const [activeModel, setActiveModel] = useState('crane')

  useEffect(() => {
    const coarse = window.matchMedia('(hover: none)').matches
    const narrow = window.innerWidth < 640
    setIsLowPower(coarse && narrow)
  }, [])

  const ActiveScene = MODELS.find((m) => m.id === activeModel).Scene

  if (isLowPower) {
    return (
      <div className="w-full h-[420px] border border-steel/60 bg-harbor flex items-center justify-center flex-col gap-3 blueprint-grid">
        <p className="font-mono text-xs text-amber uppercase tracking-widest">3D view</p>
        <p className="font-mono text-xs text-concrete/50 px-8 text-center">
          Full 3D model available on desktop for the best experience.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {MODELS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModel(m.id)}
            data-cursor-pointer
            className={`font-mono text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${
              activeModel === m.id
                ? 'border-amber text-amber'
                : 'border-steel/60 text-concrete/50 hover:border-concrete/60'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[500px] border border-steel/60 bg-harbor" data-cursor-pointer>
        <Canvas camera={{ position: [4, 1.5, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 6, 4]} intensity={1.2} color="#E8A33D" />
          <directionalLight position={[-5, -2, -4]} intensity={0.3} color="#4A9B8E" />
          <Suspense fallback={<Loader />}>
            <ActiveScene key={activeModel} />
            <Environment preset="night" />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={3} maxDistance={9} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-concrete/40 pointer-events-none">
          Drag to rotate · Scroll to zoom · Click amber points for detail
        </div>
      </div>
    </div>
  )
}