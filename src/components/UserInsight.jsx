import { Blocks, MessageCircle, MonitorOff, Smile } from 'lucide-react'
import { userInsights } from '../data/portfolio'
import Section from './Section'

const icons = [Smile, Blocks, MessageCircle, MonitorOff]
const tones = ['bg-moon-orange/20 text-moon-orangeDeep', 'bg-moon-woodSoft/50 text-moon-woodDeep', 'bg-moon-blue/30 text-moon-blueDeep', 'bg-moon-sage/30 text-moon-sageDeep']

function InsightMini({ index }) {
  const layouts = [
    ['rounded-full bg-moon-orange/70', 'rounded-2xl bg-moon-blue/70', 'rounded-xl bg-moon-woodSoft'],
    ['rounded-xl bg-moon-wood', 'rounded-2xl bg-moon-sage/70', 'rounded-full bg-moon-paper'],
    ['rounded-full bg-moon-blue/70', 'rounded-[1.2rem] bg-moon-orange/60', 'rounded-xl bg-moon-paper'],
    ['rounded-2xl bg-moon-sage/70', 'rounded-full bg-moon-cream', 'rounded-xl bg-moon-woodSoft'],
  ]

  return (
    <div className="mt-6 flex h-24 items-end justify-center gap-3 rounded-2xl border border-moon-ink/10 bg-moon-creamSoft/70 p-4">
      {layouts[index].map((item, shapeIndex) => (
        <span
          key={`${item}-${shapeIndex}`}
          className={`${item} block shadow-line ${
            shapeIndex === 0 ? 'h-14 w-12' : shapeIndex === 1 ? 'h-20 w-16' : 'h-10 w-14'
          }`}
        />
      ))}
    </div>
  )
}

function UserInsight() {
  return (
    <Section
      id="insight"
      kicker="User Insight"
      title="儿童不是被动操作玩具，而是在创造自己的小宇宙"
      lead="用户行为显示，真正能持续吸引儿童的玩具往往同时具备角色、空间、情节和陪伴关系。"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userInsights.map((insight, index) => {
          const Icon = icons[index]

          return (
            <article key={insight.title} className="soft-card hover-lift p-6">
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${tones[index]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-moon-ink">{insight.title}</h3>
              <p className="mt-3 text-base leading-7 text-moon-muted">{insight.text}</p>
              <InsightMini index={index} />
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default UserInsight
