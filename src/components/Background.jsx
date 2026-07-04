import { BookOpen, Boxes, Puzzle } from 'lucide-react'
import Section from './Section'

function Background() {
  return (
    <Section
      id="background"
      kicker="Background"
      title="木质玩具需要从单次玩法走向长期陪伴"
      tone="cream"
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <article className="soft-card p-7 sm:p-9">
          <p className="text-lg leading-9 text-moon-muted">
            目前木质玩具主要分为教育型和娱乐型两类。教育型玩具强调认知训练，如蒙氏教具、拼图、数学积木；娱乐型玩具强调场景乐趣，如木质小火车、场景屋和角色玩具。但许多木质玩具玩法较固定，生命周期较短，孩子玩几次后容易失去兴趣。因此，本项目希望探索一种能够持续激发儿童创造力、空间建构能力和故事表达能力的木质玩具系统。
          </p>
          <div className="mt-8 rounded-2xl border border-moon-ink/10 bg-moon-creamSoft/80 p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              <div className="rounded-2xl bg-moon-blue/40 p-5 shadow-line">
                <div className="mb-4 flex gap-2">
                  <span className="h-5 w-5 rounded-full bg-moon-paper/80" />
                  <span className="h-5 w-10 rounded-full bg-moon-paper/80" />
                </div>
                <p className="text-lg font-semibold text-moon-ink">教育型</p>
                <p className="mt-1 text-sm text-moon-muted">认知训练</p>
              </div>
              <span className="hidden h-px w-8 bg-moon-wood/60 sm:block" />
              <div className="rounded-2xl bg-moon-orange/25 p-5 shadow-line">
                <div className="mb-4 flex gap-2">
                  <span className="h-5 w-10 rounded-full bg-moon-paper/80" />
                  <span className="h-5 w-5 rounded-full bg-moon-paper/80" />
                </div>
                <p className="text-lg font-semibold text-moon-ink">固定玩法</p>
                <p className="mt-1 text-sm text-moon-muted">兴趣衰减</p>
              </div>
              <span className="hidden h-px w-8 bg-moon-wood/60 sm:block" />
              <div className="rounded-2xl bg-moon-sage/40 p-5 shadow-line">
                <div className="mb-4 flex gap-2">
                  <span className="h-5 w-5 rounded-full bg-moon-paper/80" />
                  <span className="h-5 w-5 rounded-full bg-moon-paper/80" />
                  <span className="h-5 w-5 rounded-full bg-moon-paper/80" />
                </div>
                <p className="text-lg font-semibold text-moon-ink">开放系统</p>
                <p className="mt-1 text-sm text-moon-muted">持续创造</p>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              icon: Puzzle,
              title: '教育型',
              text: '强调认知训练与规则学习，目标明确但叙事空间有限。',
            },
            {
              icon: BookOpen,
              title: '娱乐型',
              text: '强调场景和角色乐趣，但常依赖固定剧情与单一场景。',
            },
            {
              icon: Boxes,
              title: '机会缺口',
              text: '把模块建构与故事任务结合，形成可重复展开的游戏系统。',
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="soft-card hover-lift p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-moon-blue/30 text-moon-blueDeep">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-moon-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-moon-muted">{item.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default Background
