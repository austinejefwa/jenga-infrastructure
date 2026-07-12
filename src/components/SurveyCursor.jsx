import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function SurveyCursor() {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const rafRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 })
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    const isCoarse = window.matchMedia('(hover: none)').matches
    if (isCoarse) return

    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) })
      })
      const target = e.target
      setIsPointer(!!target.closest('a, button, [data-cursor-pointer]'))
    }

    const handleEnter = () => setVisible(true)
    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseenter', handleEnter)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    setVisible(true)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [x, y])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0, translateX: '-50%', translateY: '-50%' }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <motion.div
        animate={{ scale: isPointer ? 1.6 : 1, rotate: isPointer ? 45 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative w-6 h-6"
      >
        <div className="absolute top-1/2 left-0 w-full h-px bg-amber -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-amber -translate-x-1/2" />
        <div className="absolute inset-0 border border-amber/60 rounded-full" />
      </motion.div>
      <div className="absolute left-5 top-5 whitespace-nowrap font-mono text-[10px] tracking-wider text-amber/80">
        {String(coords.x).padStart(4, '0')}, {String(coords.y).padStart(4, '0')}
      </div>
    </motion.div>
  )
}