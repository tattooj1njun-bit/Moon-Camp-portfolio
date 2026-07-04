import { Brain, GraduationCap, MessageSquareText, Shapes } from 'lucide-react'
import { educationValues } from '../data/portfolio'
import Section from './Section'

const icons = [Shapes, Brain, MessageSquareText, GraduationCap]

function LearningMini({ index }) {
  const colors = ['bg-moon-blue/60', 'bg-moon-orange/50', 'bg-moon-sage/60', 'bg-moon-woodSoft']

  return (
    <div className="mt-6 grid h-24 grid-cols-3 gap-2 rounded-2xl border border-moon-ink/10 bg-moon-creamSoft/70 p-3">
      {Array.from({ length: 6 }).map((_, itemIndex) => (
        <span
          key={`${index}-${itemIndex}`}
          className={`${colors[(index + itemIndex) % colors.length]} ${
            itemIndex % 3 === 0 ? 'rounded-full' : 'rounded-xl'
          } shadow-line`}
        />
      ))}
    </div>
  )
}

function EducationValue() {
  return (
    <Section
      id="education"
      kicker="Education Value"
      title="轻教育不是说教，而是在游戏中自然发生"
      lead="通过可见的空间拼接、可讲述的任务和可重来的组合，MOON CAMP 将学习价值嵌入玩具行为本身。"
      tone="blue"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {educationValues.map((value, index) => {
          const Icon = icons[index] ?? GraduationCap

          return (
            <article key={value.title} className="soft-card hover-lift p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-moon-blue/30 text-moon-blueDeep">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-moon-ink">{value.title}</h3>
              <p className="mt-3 text-base leading-7 text-moon-muted">{value.text}</p>
              <LearningMini index={index} />
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default EducationValue
