export default function Footer() {
  return (
    <footer id="contact" className="border-t border-steel/60 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-display text-lg text-concrete mb-2">
            Jenga <span className="text-amber">Infrastructure</span>
          </p>
          <p className="font-mono text-xs text-concrete/50 max-w-xs">
            Port, marine &amp; civil infrastructure delivery — Mombasa, Kenya.
          </p>
        </div>
        <div className="font-mono text-xs text-concrete/50">
          <p className="text-amber mb-2 uppercase tracking-widest">Contact</p>
          <p>hello@jengainfra.co.ke</p>
          <p>Mombasa, Kenya</p>
        </div>
      </div>
      <p className="max-w-7xl mx-auto mt-12 font-mono text-[10px] text-concrete/30">
        © 2026 Jenga Infrastructure Co.
      </p>
    </footer>
  )
}