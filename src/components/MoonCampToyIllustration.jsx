function MoonCampToyIllustration() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-moon-ink/10 bg-moon-paper shadow-soft">
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-5 rounded-[1.5rem] border border-moon-ink/10 bg-gradient-to-br from-moon-creamSoft via-moon-paper to-moon-blue/30" />

      <div className="absolute left-6 top-7 h-28 w-28 rounded-full bg-moon-paper/70 shadow-line sm:left-10 sm:h-36 sm:w-36">
        <div className="moon-crater absolute left-7 top-8 h-5 w-8 rounded-full bg-moon-line/70" />
        <div className="moon-crater absolute bottom-8 right-8 h-4 w-6 rounded-full bg-moon-line/60" />
        <div className="moon-crater absolute bottom-12 left-12 h-3 w-3 rounded-full bg-moon-line/70" />
      </div>

      <div className="absolute right-9 top-10 h-3 w-3 rounded-full bg-moon-orange/80 shadow-[0_0_0_7px_rgba(234,164,92,0.16)]" />
      <div className="absolute right-28 top-20 h-2 w-2 rounded-full bg-moon-blueDeep/40" />
      <div className="absolute bottom-24 left-8 h-2 w-2 rounded-full bg-moon-sageDeep/40" />

      <div className="absolute bottom-10 left-1/2 h-24 w-[82%] -translate-x-1/2 rounded-[50%] bg-moon-line/80 shadow-line" />
      <div className="absolute bottom-12 left-1/2 h-20 w-[74%] -translate-x-1/2 rounded-[50%] bg-moon-cream" />
      <div className="moon-crater absolute bottom-20 left-[18%] h-4 w-16 rounded-full bg-moon-line/70" />
      <div className="moon-crater absolute bottom-24 right-[18%] h-5 w-20 rounded-full bg-moon-line/60" />

      <div className="absolute bottom-[5.7rem] left-[14%] h-20 w-28 rounded-t-[2.2rem] rounded-b-xl border border-moon-ink/10 bg-moon-blue/75 shadow-line">
        <div className="absolute left-1/2 top-4 h-9 w-11 -translate-x-1/2 rounded-t-full rounded-b-lg bg-moon-paper/70 shadow-line" />
        <div className="absolute -right-9 bottom-1 h-12 w-12 rounded-xl border border-moon-ink/10 bg-moon-sage/80 shadow-line" />
        <div className="absolute -left-5 bottom-3 h-10 w-10 rounded-xl border border-moon-ink/10 bg-moon-woodSoft shadow-line" />
      </div>

      <div className="absolute bottom-[5.6rem] right-[15%] h-28 w-16 animate-floatSoft">
        <div className="rocket-body absolute inset-x-2 top-0 h-24 bg-moon-orange shadow-line" />
        <div className="absolute left-1/2 top-8 h-7 w-7 -translate-x-1/2 rounded-full border-4 border-moon-orangeDeep/30 bg-moon-blue" />
        <div className="rocket-fin-left absolute bottom-0 left-0 h-9 w-7 bg-moon-woodDeep" />
        <div className="rocket-fin-right absolute bottom-0 right-0 h-9 w-7 bg-moon-woodDeep" />
        <div className="absolute bottom-0 left-1/2 h-8 w-6 -translate-x-1/2 rounded-b-full bg-moon-cream" />
      </div>

      <div className="absolute bottom-[4.6rem] left-[45%] grid grid-cols-3 gap-2">
        {['bg-moon-wood', 'bg-moon-sage', 'bg-moon-blue'].map((color) => (
          <div key={color} className={`h-9 w-9 rounded-lg border border-moon-ink/10 ${color} shadow-line`} />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 rounded-full border border-moon-ink/10 bg-moon-paper/80 px-4 py-2 text-xs font-semibold text-moon-muted shadow-line">
        Modular wooden story system
      </div>
    </div>
  )
}

export default MoonCampToyIllustration
