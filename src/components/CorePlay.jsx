import { ArrowRight, BookOpen, Boxes, Hand, MessageCircle, RefreshCw, UserRound } from 'lucide-react'
import { playSteps } from '../data/portfolio'
import Section from './Section'

const icons = [Boxes, UserRound, Hand, ArrowRight, MessageCircle, RefreshCw]

function CorePlay() {
  return (
    <Section
      id="play"
      kicker="Core Play"
      title="从搭建到讲述，形成循环式游戏体验"
      lead="玩法不是一次性完成任务，而是通过重新组合持续生成新的空间与故事。"
      tone="paper"
    >
      <div className="soft-card overflow-hidden p-5 sm:p-7">
        <div className="grid gap-4 lg:grid-cols-6">
          {playSteps.map((step, index) => {
            const Icon = icons[index] ?? BookOpen

            return (
              <div key={step.title} className="relative">
                {index < playSteps.length - 1 && (
                  <div className="absolute left-[calc(100%-0.25rem)] top-10 z-0 hidden h-px w-6 origin-left animate-connectPulse bg-moon-wood/60 lg:block" />
                )}
                <article className="relative z-10 h-full rounded-2xl border border-moon-ink/10 bg-moon-creamSoft/70 p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-moon-ink text-moon-paper">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-moon-woodDeep">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-moon-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-moon-muted">{step.text}</p>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default CorePlay
