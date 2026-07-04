import { Moon, Rocket } from 'lucide-react'

function FinalSummary() {
  return (
    <section id="summary" className="section-shell pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-moon-ink/10 bg-moon-ink p-8 text-moon-paper shadow-soft sm:p-12 lg:p-16">
        <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-moon-blue/30" />
        <div className="absolute -bottom-16 left-12 h-36 w-36 rounded-full bg-moon-orange/25" />
        <div className="relative max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-moon-paper/20 bg-moon-paper/10 px-4 py-2 text-sm font-semibold text-moon-paper/80">
            <Moon className="h-4 w-4" />
            Final Summary
          </div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">一个可以不断重新组合的故事世界</h2>
          <p className="mt-7 text-lg leading-9 text-moon-paper/80">
            MOON CAMP 不是一个单一玩法的木质玩具，而是一个可以被不断重新组合的故事世界。它希望通过自然材料、模块结构和开放式任务，让儿童在搭建中学习，在探索中表达，在陪伴中创造属于自己的宇宙。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {['Natural material', 'Modular system', 'Open-ended task', 'Story expression'].map((item) => (
              <span key={item} className="rounded-full bg-moon-paper/10 px-4 py-2 text-sm font-medium text-moon-paper/80">
                {item}
              </span>
            ))}
          </div>
        </div>
        <Rocket className="absolute bottom-8 right-8 hidden h-16 w-16 text-moon-orange sm:block" />
      </div>
    </section>
  )
}

export default FinalSummary
