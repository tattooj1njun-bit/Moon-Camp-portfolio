import { Home, Users, UserRound } from 'lucide-react'
import { moonCampAssets } from '../data/assets'
import { scenarios } from '../data/portfolio'
import Section from './Section'

const icons = [UserRound, Home, Users]
const backgrounds = ['bg-moon-blue/30', 'bg-moon-orange/20', 'bg-moon-sage/30']
const scenarioImages = [moonCampAssets.independentPlay, moonCampAssets.parentChildPlay, moonCampAssets.multiPlay]

function ScenarioScene({ index }) {
  return (
    <div className="mt-5 flex h-28 items-end justify-center gap-3 rounded-2xl border border-moon-ink/10 bg-moon-paper/70 p-4">
      <span className={`${index === 1 ? 'h-16' : 'h-12'} w-8 rounded-t-full rounded-b-xl bg-moon-wood shadow-line`} />
      {index !== 0 && <span className="h-11 w-7 rounded-t-full rounded-b-xl bg-moon-blue shadow-line" />}
      {index === 2 && <span className="h-10 w-7 rounded-t-full rounded-b-xl bg-moon-sage shadow-line" />}
      <span className="h-14 w-20 rounded-t-[2rem] rounded-b-xl bg-moon-cream shadow-line" />
      <span className="h-9 w-9 rounded-full bg-moon-orange/75 shadow-line" />
    </div>
  )
}

function UserScenario() {
  return (
    <Section
      id="scenario"
      kicker="User Scenario"
      title="适用于独立、亲子与多人协作的低屏幕场景"
      lead="MOON CAMP 不是把儿童固定在一种玩法里，而是让同一套模块在不同陪伴关系中产生不同价值。"
      tone="sage"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {scenarios.map((scenario, index) => {
          const Icon = icons[index]

          return (
            <article key={scenario.title} className="soft-card hover-lift overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={scenarioImages[index]}
                  alt={`MOON CAMP ${scenario.title}场景图`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-moon-ink/40 to-transparent" />
                <div className={`absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl ${backgrounds[index]} text-moon-ink shadow-line backdrop-blur`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-moon-ink">{scenario.title}</h3>
                <p className="mt-3 text-base leading-7 text-moon-muted">{scenario.text}</p>
                <ScenarioScene index={index} />
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default UserScenario
