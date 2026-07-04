import { Leaf, Paintbrush, ShieldCheck, TreePine } from 'lucide-react'
import { cmfColors, materials } from '../data/portfolio'
import Section from './Section'

const materialIcons = [TreePine, Paintbrush, ShieldCheck, Leaf]

function Cmf() {
  return (
    <Section
      id="cmf"
      kicker="CMF Design"
      title="以天然木材为主，辅以柔和低饱和色彩"
      lead="CMF 策略强调自然触感、环保安全和轻教育感，让产品既适合儿童操作，也能被家长接受为长期陪伴型玩具。"
      tone="cream"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-moon-ink">材料</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {materials.map((material, index) => {
              const Icon = materialIcons[index] ?? Leaf

              return (
                <article key={material} className="soft-card flex items-center gap-4 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moon-sage/30 text-moon-sageDeep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-base font-semibold text-moon-ink">{material}</p>
                </article>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-moon-ink">颜色</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {cmfColors.map((color) => (
              <article key={color.name} className="soft-card overflow-hidden">
                <div className="h-28 border-b border-moon-ink/10" style={{ backgroundColor: color.color }} />
                <div className="p-5">
                  <p className="text-sm font-semibold text-moon-muted">{color.name}</p>
                  <p className="mt-2 text-lg font-semibold text-moon-ink">{color.cn}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Cmf
