import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

// Simplified reference bands based on NCA Kenya's public classification structure.
// This is an estimation tool only — always confirm with NCA directly.
function classify(value) {
  if (value >= 500_000_000) return { code: 'NCA 1', desc: 'Major infrastructure / mega-projects' }
  if (value >= 100_000_000) return { code: 'NCA 2', desc: 'Large commercial / industrial works' }
  if (value >= 50_000_000) return { code: 'NCA 3', desc: 'Mid-scale commercial works' }
  if (value >= 20_000_000) return { code: 'NCA 4', desc: 'Medium-sized building works' }
  if (value >= 10_000_000) return { code: 'NCA 5', desc: 'Small commercial / large residential' }
  if (value >= 5_000_000) return { code: 'NCA 6', desc: 'Standard residential works' }
  if (value >= 1_000_000) return { code: 'NCA 7', desc: 'Small residential works' }
  return { code: 'NCA 8', desc: 'Minor works / renovations' }
}

export default function NCACalculator() {
  const [value, setValue] = useState('')
  const [floors, setFloors] = useState('')
  const [type, setType] = useState('Commercial')

  const numericValue = Number(value.replace(/,/g, '')) || 0

  const result = useMemo(() => {
    if (numericValue <= 0) return null
    const nca = classify(numericValue)
    const permitFeeRate = type === 'Marine' || type === 'Industrial' ? 0.006 : 0.004
    const estimatedFee = Math.round(numericValue * permitFeeRate)
    const safetyOfficerRequired = numericValue >= 5_000_000
    const structuralEngineerRequired = numericValue >= 10_000_000 || Number(floors) >= 4
    return { nca, estimatedFee, safetyOfficerRequired, structuralEngineerRequired }
  }, [numericValue, type, floors])

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-amber mb-3">
          Free Tool
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-4">
          NCA Compliance Estimator
        </h2>
        <p className="text-concrete/50 text-sm max-w-xl mb-12">
          Get an instant estimate of your project's NCA classification, indicative
          permit fee, and required professional sign-offs. Reference only —
          confirm with NCA directly before submission.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-steel/60 bg-harbor p-7 space-y-6">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-concrete/50 block mb-2">
                Project Value (KES)
              </label>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 25000000"
                className="w-full bg-ink border border-steel/60 px-4 py-3 font-mono text-sm text-concrete placeholder:text-concrete/30 outline-none focus:border-amber"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-concrete/50 block mb-2">
                Number of Floors
              </label>
              <input
                value={floors}
                onChange={(e) => setFloors(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 3"
                className="w-full bg-ink border border-steel/60 px-4 py-3 font-mono text-sm text-concrete placeholder:text-concrete/30 outline-none focus:border-amber"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-concrete/50 block mb-2">
                Structure Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-ink border border-steel/60 px-4 py-3 font-mono text-sm text-concrete outline-none focus:border-amber"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Marine</option>
              </select>
            </div>
          </div>

          <div className="border border-steel/60 bg-ink p-7 flex flex-col justify-center">
            {!result ? (
              <p className="font-mono text-xs text-concrete/30 text-center">
                Enter a project value to see your estimate
              </p>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                <div>
                  <p className="font-mono text-[10px] text-amber uppercase tracking-widest mb-1">Classification</p>
                  <p className="font-display text-2xl text-concrete">{result.nca.code}</p>
                  <p className="font-mono text-[11px] text-concrete/40">{result.nca.desc}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-amber uppercase tracking-widest mb-1">Est. Permit Fee</p>
                  <p className="font-display text-xl text-concrete">
                    KES {result.estimatedFee.toLocaleString()}
                  </p>
                </div>
                <div className="pt-2 border-t border-steel/60 space-y-2">
                  <p className="font-mono text-[11px] text-concrete/60">
                    {result.safetyOfficerRequired ? '✓' : '—'} Registered Safety Officer required
                  </p>
                  <p className="font-mono text-[11px] text-concrete/60">
                    {result.structuralEngineerRequired ? '✓' : '—'} Registered Structural Engineer sign-off required
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}