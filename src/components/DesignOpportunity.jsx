import { Lightbulb } from 'lucide-react'
import { opportunities } from '../data/portfolio'
import Section from './Section'

function DesignOpportunity() {
  return (
    <Section
      id="opportunity"
      kicker="Design Opportunity"
      title="将重复游玩率转化为开放式故事机制"
      lead="机会点集中在如何让玩具保持新鲜感，同时支持儿童独立游戏、亲子陪伴和多人合作。"
      tone="blue"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((item, index) => (
          <article key={item} className="module-notch soft-card hover-lift overflow-hidden p-6 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="rounded-full bg-moon-ink px-4 py-2 text-sm font-semibold text-moon-paper">
                HMW 0{index + 1}
              </span>
              <Lightbulb className="h-5 w-5 text-moon-orange" />
            </div>
            <h3 className="text-2xl font-semibold leading-9 text-moon-ink">{item}</h3>
          </article>
        ))}
      </div>
      <div className="mt-8 soft-card overflow-hidden p-6 sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-moon-woodDeep">Opportunity Map</p>
            <h3 className="mt-3 text-2xl font-semibold text-moon-ink">从“多玩几次”转向“每次都不同”</h3>
            <p className="mt-4 text-base leading-7 text-moon-muted">
              设计策略不是增加复杂规则，而是让模块、角色和任务彼此触发，形成低门槛、高变化的创造循环。
            </p>
          </div>
          <div className="relative min-h-[260px] rounded-2xl bg-moon-creamSoft/80 p-6 shadow-line">
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-moon-ink text-center text-sm font-semibold leading-5 text-moon-paper shadow-soft">
              Story<br />Loop
            </div>
            {[
              ['模块变化', 'left-5 top-7 bg-moon-woodSoft'],
              ['角色代入', 'right-5 top-7 bg-moon-orange/40'],
              ['任务触发', 'bottom-7 left-5 bg-moon-blue/40'],
              ['亲子讲述', 'bottom-7 right-5 bg-moon-sage/40'],
            ].map(([label, position, color]) => (
              <div
                key={label}
                className={`absolute ${position} flex h-24 w-28 items-center justify-center rounded-2xl ${color} text-center text-sm font-semibold text-moon-ink shadow-line`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default DesignOpportunity
