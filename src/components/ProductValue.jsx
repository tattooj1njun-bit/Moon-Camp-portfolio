import { HeartHandshake, LineChart, UserRound } from 'lucide-react'
import { productValues } from '../data/portfolio'
import Section from './Section'

const icons = [UserRound, HeartHandshake, LineChart]

function ProductValue() {
  return (
    <Section
      id="value"
      kicker="Product Value"
      title="从儿童体验、家庭陪伴到系列化扩展"
      lead="产品价值不是单点造型，而是围绕可持续游玩建立用户、家长与商业三层收益。"
      tone="sage"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {productValues.map((value, index) => {
          const Icon = icons[index] ?? UserRound

          return (
            <article key={value.title} className="soft-card hover-lift p-7">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-moon-cream text-moon-woodDeep">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-moon-ink">{value.title}</h3>
              <p className="mt-4 text-base leading-8 text-moon-muted">{value.text}</p>
            </article>
          )
        })}
      </div>
      <div className="mt-8 soft-card p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-moon-woodDeep">Series Expansion</p>
            <h3 className="mt-2 text-2xl font-semibold text-moon-ink">同一套建构逻辑可延展为系列化主题</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-moon-muted">核心结构保持一致，通过地形、角色和任务卡替换，扩展新主题包。</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['火星探索包', '深海探索包', '恐龙世界包', '城市建造包'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-moon-ink/10 bg-moon-creamSoft/75 p-4 shadow-line">
              <div className="mb-4 flex h-20 items-end gap-2 rounded-2xl bg-moon-paper/75 p-3">
                <span className={`${index === 0 ? 'h-12' : 'h-10'} w-12 rounded-2xl bg-moon-woodSoft`} />
                <span className="h-14 w-10 rounded-full bg-moon-blue/50" />
                <span className="h-8 w-8 rounded-xl bg-moon-orange/60" />
              </div>
              <p className="font-semibold text-moon-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default ProductValue
