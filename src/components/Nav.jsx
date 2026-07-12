import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-steel/60 bg-ink/70 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
          <a href="/" className="font-display text-sm md:text-base tracking-widest uppercase text-concrete">
            Jenga <span className="text-amber">Infrastructure</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-concrete/70">
            <a href="#projects" className="hover:text-amber transition-colors" data-cursor-pointer>Projects</a>
            <a href="#about" className="hover:text-amber transition-colors" data-cursor-pointer>About</a>
            <a href="#contact" className="hover:text-amber transition-colors" data-cursor-pointer>Contact</a>
          </nav>
          <a
            href="#contact"
            data-cursor-pointer
            className="hidden md:block text-xs font-mono uppercase tracking-wider border border-amber/50 text-amber px-4 py-2 hover:bg-amber hover:text-ink transition-colors"
          >
            Start a project
          </a>
          <button
            onClick={() => setOpen(true)}
            data-cursor-pointer
            className="md:hidden flex flex-col gap-1.5 w-7"
            aria-label="Open menu"
          >
            <span className="h-px w-full bg-concrete" />
            <span className="h-px w-full bg-concrete" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/98 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-steel/60">
              <span className="font-display text-sm tracking-widest uppercase text-concrete">
                Jenga <span className="text-amber">Infrastructure</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-concrete text-2xl leading-none">
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-8 px-6 py-16 font-mono text-2xl uppercase tracking-wider text-concrete">
              {['Projects', 'About', 'Contact'].map((label, i) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="hover:text-amber transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}