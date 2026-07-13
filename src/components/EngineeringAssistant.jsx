import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KNOWLEDGE = [
  {
    keywords: ['fidic', 'clause', '20.1', 'claim'],
    answer: "Under FIDIC Sub-Clause 20.1, a contractor must give notice of a claim within 28 days of becoming aware of the event. Late notice can bar the claim unless the Engineer determines otherwise under the applicable conditions.",
  },
  {
    keywords: ['jica', 'funding', 'funded'],
    answer: "JICA-funded works follow Japan International Cooperation Agency procurement and reporting standards alongside the project's contract framework — typically FIDIC — with additional compliance and audit requirements.",
  },
  {
    keywords: ['timeline', 'how long', 'duration', 'schedule'],
    answer: "Timelines vary by scope — port berth works typically run 12–24 months from survey to handover, depending on marine conditions, procurement, and contractor mobilization.",
  },
  {
    keywords: ['quote', 'cost', 'price', 'budget'],
    answer: "Costing depends on scope, site conditions, and funding structure. Use the 'Request a Quote' button above and our team will follow up with a scoped estimate.",
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone'],
    answer: "You can reach us via the contact section below, or click 'Book a Consultation' in the hero section to start a conversation.",
  },
  {
    keywords: ['crane', 'equipment', 'gantry'],
    answer: "Our equipment section above includes an interactive 3D model of a ship-to-shore gantry crane and a piling rig — drag to rotate, scroll to zoom, and click the amber points for component detail.",
  },
]

const FALLBACK = "That's a specific one — for detailed technical or contractual questions, it's best to reach out directly via 'Book a Consultation' so we can give you an accurate answer."

function getAnswer(question) {
  const q = question.toLowerCase()
  const match = KNOWLEDGE.find((k) => k.keywords.some((kw) => q.includes(kw)))
  return match ? match.answer : FALLBACK
}

export default function EngineeringAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi — ask me about FIDIC clauses, JICA funding, timelines, or our equipment. I'm a scoped assistant, not a live AI, so I answer from a fixed set of common questions." },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: getAnswer(userMsg.text) }])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor-pointer
        className="fixed bottom-6 right-6 z-40 bg-amber text-ink font-mono text-xs uppercase tracking-widest px-5 py-4 shadow-lg hover:bg-concrete transition-colors"
      >
        Ask an Engineer
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[560px] border border-steel/60 bg-ink flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-steel/60">
              <p className="font-mono text-xs uppercase tracking-widest text-amber">
                Site Assistant
              </p>
              <button onClick={() => setOpen(false)} className="text-concrete/60 text-xl leading-none" data-cursor-pointer>
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`font-mono text-xs leading-relaxed max-w-[85%] px-4 py-3 ${
                    m.role === 'user'
                      ? 'ml-auto bg-harbor text-concrete border border-steel/60'
                      : 'bg-amber/10 text-concrete/90 border border-amber/30'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="font-mono text-xs text-concrete/40 px-4">Typing…</div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 p-3 border-t border-steel/60">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about FIDIC, JICA, timelines..."
                className="flex-1 bg-harbor border border-steel/60 px-3 py-3 font-mono text-xs text-concrete placeholder:text-concrete/30 outline-none focus:border-amber"
              />
              <button
                onClick={handleSend}
                data-cursor-pointer
                className="bg-amber text-ink font-mono text-xs uppercase px-4 py-3 hover:bg-concrete transition-colors"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}