import Structure3DViewer from './Structure3DViewer'

export default function Structure3DSection() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 border-t border-steel/60">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-sea mb-3">
          Interactive Model
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-concrete mb-4">
          Inspect the equipment
        </h2>
        <p className="text-concrete/60 max-w-xl mb-12">
          A ship-to-shore gantry crane, modeled for reference. Rotate, zoom,
          and click the amber points for component detail.
        </p>
        <Structure3DViewer />
      </div>
    </section>
  )
}