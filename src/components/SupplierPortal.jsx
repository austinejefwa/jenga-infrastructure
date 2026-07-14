import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BIDS = [
  { title: 'Concrete Blocks Supply — Container Terminal Expansion', category: 'Materials', closes: '14 days' },
  { title: 'Steel Fabrication — Berth Handrails & Fenders', category: 'Fabrication', closes: '9 days' },
  { title: 'Sand & Aggregate Supply — Access Road Works', category: 'Materials', closes: '21 days' },
]

export default function SupplierPortal() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ company: '', category: 'Materials', phone: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-amber mb-3">
          For Local Suppliers
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-4">
          Supplier &amp; subcontractor bids
        </h2>
        <p className="text-concrete/50 text-sm max-w-xl mb-14">
          Register your business and bid on open micro-contracts for materials
          and fabrication work on our active projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-sea mb-4">
              Open Opportunities
            </p>
            <div className="space-y-3">
              {BIDS.map((b) => (
                <div key={b.title} className="border border-steel/60 bg-harbor p-5">
                  <p className="font-mono text-[10px] text-amber uppercase tracking-widest mb-2">
                    {b.category} · Closes in {b.closes}
                  </p>
                  <p className="text-concrete text-sm">{b.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-steel/60 bg-ink p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-sea mb-5">
              Register as a Supplier
            </p>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <p className="font-display text-xl text-amber mb-2">Registered</p>
                  <p className="font-mono text-xs text-concrete/50">
                    Demo mode — this form doesn't submit yet. Backend registration coming soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full bg-harbor border border-steel/60 px-4 py-3 font-mono text-xs text-concrete placeholder:text-concrete/30 outline-none focus:border-amber"
                  />
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-harbor border border-steel/60 px-4 py-3 font-mono text-xs text-concrete outline-none focus:border-amber"
                  >
                    <option>Materials</option>
                    <option>Fabrication</option>
                    <option>Logistics</option>
                    <option>Labor</option>
                  </select>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone / contact"
                    className="w-full bg-harbor border border-steel/60 px-4 py-3 font-mono text-xs text-concrete placeholder:text-concrete/30 outline-none focus:border-amber"
                  />
                  <button
                    type="submit"
                    data-cursor-pointer
                    className="w-full bg-amber text-ink font-mono text-xs uppercase tracking-widest py-4 hover:bg-concrete transition-colors"
                  >
                    Submit Registration
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}