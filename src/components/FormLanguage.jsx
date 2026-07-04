import { BadgeCheck, Maximize, Palette, ShieldCheck } from 'lucide-react'
import { formKeywords } from '../data/portfolio'
import Section from './Section'

function FormLanguage() {
  return (
    <Section
      id="form"
      kicker="Form Language"
      title="用圆润比例和原木触感建立安全、亲和的太空想象"
      tone="paper"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <article className="soft-card p-7 sm:p-9">
          <p className="text-lg leading-9 text-moon-muted">
            整体采用圆角、大曲面、低饱和配色和原木纹理，避免尖锐边缘，增强亲和感和安全感。造型不追求写实，而是保留儿童想象空间，让火箭、基地和角色都具有简化、可爱、易识别的视觉特征。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {formKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-moon-ink/10 bg-moon-creamSoft px-4 py-2 text-sm font-semibold text-moon-muted"
              >
                {keyword}
              </span>
            ))}
          </div>
        </article>

        <div className="soft-card relative min-h-[360px] overflow-hidden p-6">
          <div className="absolute inset-0 paper-texture" />
          <div className="relative grid h-full min-h-[308px] grid-cols-2 gap-4">
            <div className="rounded-[2rem] bg-moon-woodSoft/80 p-5 shadow-line">
              <Palette className="h-6 w-6 text-moon-woodDeep" />
              <p className="mt-4 text-sm font-semibold text-moon-woodDeep">低饱和色彩</p>
              <div className="mt-8 h-20 rounded-[2rem] bg-moon-orange/70" />
            </div>
            <div className="rounded-[2rem] bg-moon-blue/60 p-5 shadow-line">
              <ShieldCheck className="h-6 w-6 text-moon-blueDeep" />
              <p className="mt-4 text-sm font-semibold text-moon-blueDeep">无尖锐边缘</p>
              <div className="mt-8 h-20 rounded-full bg-moon-paper/80" />
            </div>
            <div className="rounded-[2rem] bg-moon-sage/70 p-5 shadow-line">
              <Maximize className="h-6 w-6 text-moon-sageDeep" />
              <p className="mt-4 text-sm font-semibold text-moon-sageDeep">可扩展结构</p>
              <div className="mt-8 grid grid-cols-3 gap-2">
                <span className="h-10 rounded-xl bg-moon-paper/80" />
                <span className="h-10 rounded-xl bg-moon-paper/80" />
                <span className="h-10 rounded-xl bg-moon-paper/80" />
              </div>
            </div>
            <div className="rounded-[2rem] bg-moon-cream p-5 shadow-line">
              <BadgeCheck className="h-6 w-6 text-moon-orangeDeep" />
              <p className="mt-4 text-sm font-semibold text-moon-orangeDeep">简化识别</p>
              <div className="mt-8 h-20 rounded-t-[2rem] rounded-b-xl bg-moon-paper/90" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FormLanguage
