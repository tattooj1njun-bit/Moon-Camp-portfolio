import { CheckCircle, ShieldCheck } from 'lucide-react'
import { moonCampAssets } from '../data/assets'
import { safetyItems } from '../data/portfolio'
import Section from './Section'

function SafetyDesign() {
  return (
    <Section
      id="safety"
      kicker="Safety Design"
      title="面向 4-8 岁儿童的结构安全与材料安全"
      lead="安全策略从尺寸、边缘、磁吸、表面处理和清洁维护五个方面控制风险。"
      tone="paper"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <figure className="soft-card overflow-hidden">
          <div className="relative aspect-[4/3]">
            <img
              src={moonCampAssets.detailCloseup}
              alt="MOON CAMP 儿童木质玩具圆角、舱门和材料安全细节图"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl bg-moon-paper/80 px-5 py-4 text-sm leading-6 text-moon-muted shadow-line backdrop-blur">
              细节重点：大圆角、隐藏连接、无尖锐外露结构和易清洁表面。
            </figcaption>
          </div>
        </figure>

        <div className="grid gap-4 sm:grid-cols-2">
          {safetyItems.map((item, index) => (
            <article key={item} className="soft-card hover-lift p-5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-moon-ink text-moon-paper">
                {index === 0 ? <ShieldCheck className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
              </div>
              <p className="text-base font-semibold leading-7 text-moon-ink">{item}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="soft-card p-7">
          <p className="text-sm font-semibold uppercase text-moon-woodDeep">Safety Sketch</p>
          <h3 className="mt-3 text-2xl font-semibold text-moon-ink">把安全设计前置到造型和结构阶段</h3>
          <p className="mt-4 text-base leading-8 text-moon-muted">
            通过大倒角、隐藏磁吸、稳定底盘和可清洁表面，减少儿童操作中的误吞、夹手、倾倒和材料风险。
          </p>
        </div>
        <div className="soft-card grid min-h-[260px] grid-cols-2 gap-4 p-5 sm:grid-cols-4">
          {[
            ['R8', '大倒角', 'rounded-[2rem] bg-moon-woodSoft'],
            ['Ø', '防误吞', 'rounded-full bg-moon-blue/50'],
            ['MAG', '隐藏磁吸', 'rounded-2xl bg-moon-sage/50'],
            ['MAT', '环保涂装', 'rounded-[1.6rem] bg-moon-orange/30'],
          ].map(([mark, label, shape]) => (
            <div key={label} className="flex flex-col items-center justify-center rounded-2xl bg-moon-creamSoft/70 p-4 text-center shadow-line">
              <span className={`flex h-20 w-20 items-center justify-center ${shape} text-lg font-semibold text-moon-ink shadow-line`}>
                {mark}
              </span>
              <span className="mt-4 text-sm font-semibold text-moon-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default SafetyDesign
