import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingIntro() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 300)
          return 100
        }
        return p + 4
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center blueprint-grid"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-amber mb-6"
          >
            Surveying site
          </motion.p>
          <div className="w-48 h-px bg-steel relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-amber"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-[10px] text-concrete/40 mt-4">
            {String(progress).padStart(3, '0')}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}