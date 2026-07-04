import { Orbit, Repeat, Sparkles, WandSparkles } from 'lucide-react'
import Section from './Section'

function Concept() {
  return (
    <Section
      id="concept"
      kicker="Concept"
      title="MOON CAMP"
      lead="一套以月球营地为主题的模块化木质故事建构玩具。"
      tone="paper"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="soft-card overflow-hidden">
          <div className="wood-grain h-36 border-b border-moon-ink/10" />
          <div className="p-7 sm:p-9">
            <p className="text-lg leading-9 text-moon-muted">
              MOON CAMP 是一套面向 4-8 岁儿童的模块化木质故事建构玩具。它以“月球营地”为主题，通过火箭、基地、地形、角色和任务卡等模块，鼓励儿童自由搭建、探索和讲述故事。产品不设固定答案，而是让孩子在反复组合中创造属于自己的宇宙冒险。
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Orbit,
              title: '月球营地主题',
              text: '用足够陌生又易理解的宇宙情境激发想象。',
            },
            {
              icon: Repeat,
              title: '反复组合',
              text: '模块可以拆解、换位、连接，让每次游戏不同。',
            },
            {
              icon: WandSparkles,
              title: '故事任务',
              text: '任务卡把静态造型转化为可推进的情节。',
            },
            {
              icon: Sparkles,
              title: '没有标准答案',
              text: '保留儿童解释空间，避免玩法过早耗尽。',
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="soft-card hover-lift p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-moon-orange/20 text-moon-orangeDeep">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-moon-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-moon-muted">{item.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default Concept
