import { ArrowDown, Blocks, Leaf, Rocket } from 'lucide-react'
import { moonCampAssets } from '../data/assets'

function Hero() {
  return (
    <section id="hero" className="section-shell flex min-h-[calc(100vh-68px)] items-center pt-12">
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14">
        <div className="fade-in min-w-0">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-moon-ink/10 bg-moon-paper/70 px-4 py-2 text-sm text-moon-muted shadow-line">
            <Rocket className="h-4 w-4 text-moon-orange" />
            产品设计作品集单页
          </div>

          <p className="mb-4 text-sm font-semibold uppercase text-moon-woodDeep">Modular Wooden Story Toy</p>
          <h1 className="text-6xl font-semibold leading-none text-moon-ink sm:text-7xl lg:text-8xl">MOON CAMP</h1>
          <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug text-moon-ink sm:text-3xl">
            面向 4-8 岁儿童的模块化木质故事建构玩具设计
          </p>
          <p className="mt-6 max-w-xl text-xl italic leading-8 text-moon-muted">Every child deserves a universe.</p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-moon-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-moon-ink/10 bg-moon-ink px-4 py-2 text-moon-paper">
              产品设计-2302班
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-moon-ink/10 bg-moon-paper/70 px-4 py-2 text-moon-ink">
              金晓俊
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-moon-ink/10 bg-moon-paper/70 px-4 py-2">
              <Leaf className="h-4 w-4 text-moon-sageDeep" />
              Sustainable material
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-moon-ink/10 bg-moon-paper/70 px-4 py-2">
              <Blocks className="h-4 w-4 text-moon-blueDeep" />
              Open-ended construction
            </span>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#overview"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-moon-ink px-6 py-3 text-sm font-semibold text-moon-paper transition hover:bg-moon-woodDeep"
            >
              查看设计过程
              <ArrowDown className="h-4 w-4" />
            </a>
            <span className="text-sm text-moon-muted">Research / System / CMF / Education Value</span>
          </div>
        </div>

        <div className="fade-in min-w-0" style={{ animationDelay: '120ms' }}>
          <figure className="relative mx-auto overflow-hidden rounded-[2rem] border border-moon-ink/10 bg-moon-paper p-3 shadow-soft">
            <div className="absolute inset-0 paper-texture" />
            <img
              src={moonCampAssets.finalToy}
              alt="MOON CAMP 模块化木质月球营地玩具最终造型图"
              className="relative aspect-[4/5] w-full rounded-[1.55rem] bg-moon-creamSoft object-cover object-center"
            />
            <figcaption className="relative mt-3 flex flex-col gap-2 rounded-2xl bg-moon-creamSoft/80 px-4 py-3 text-sm text-moon-muted sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold text-moon-ink">Final toy concept render</span>
              <span>火箭 / 基地 / 地形 / 角色 / 任务卡</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Hero
