import { Clock, KeyRound, Package, Users } from 'lucide-react'
import { keywords, overviewItems } from '../data/portfolio'
import Section from './Section'

const icons = [Package, Users, Users, Clock]

function ProjectOverview() {
  return (
    <Section
      id="overview"
      kicker="Project Overview"
      title="从木质玩具到可持续故事系统"
      lead="MOON CAMP 将建构、角色扮演与任务叙事结合，让玩具在反复拼接和重新讲述中延长生命周期。"
      tone="paper"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewItems.map((item, index) => {
          const Icon = icons[index] ?? Package

          return (
            <article key={item.label} className="soft-card hover-lift p-6">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-moon-cream text-moon-woodDeep">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-moon-muted">{item.label}</p>
              <p className="mt-3 text-lg font-semibold leading-7 text-moon-ink">{item.value}</p>
            </article>
          )
        })}
      </div>

      <div className="mt-8 soft-card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-moon-ink text-moon-paper">
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-moon-muted">设计关键词</p>
            <p className="mt-1 text-base font-semibold text-moon-ink">材料、叙事、拼接与开放性</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-moon-ink/10 bg-moon-creamSoft px-4 py-2 text-sm font-medium text-moon-muted"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default ProjectOverview
