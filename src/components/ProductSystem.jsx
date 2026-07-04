import { Bot, Box, Map, Rocket, SquareStack } from 'lucide-react'
import { moonCampAssets } from '../data/assets'
import { productModules } from '../data/portfolio'
import Section from './Section'

const icons = [Rocket, Box, Map, Bot, SquareStack]

const swatchClasses = {
  orange: 'bg-moon-orange/20 text-moon-orangeDeep',
  blue: 'bg-moon-blue/30 text-moon-blueDeep',
  wood: 'bg-moon-woodSoft/60 text-moon-woodDeep',
  sage: 'bg-moon-sage/30 text-moon-sageDeep',
  cream: 'bg-moon-cream text-moon-woodDeep',
}

function ModulePreview({ tone }) {
  const fill =
    tone === 'orange'
      ? 'bg-moon-orange'
      : tone === 'blue'
        ? 'bg-moon-blue'
        : tone === 'sage'
          ? 'bg-moon-sage'
          : tone === 'cream'
            ? 'bg-moon-cream'
            : 'bg-moon-wood'

  return (
    <div className="mt-6 flex h-24 items-end gap-2 rounded-2xl border border-moon-ink/10 bg-moon-creamSoft/70 p-4">
      <div className={`h-12 w-12 rounded-2xl ${fill} shadow-line`} />
      <div className={`h-16 w-20 rounded-t-[2rem] rounded-b-xl ${fill} shadow-line`} />
      <div className={`h-10 w-10 rounded-full ${fill} shadow-line`} />
    </div>
  )
}

function ProductSystem() {
  return (
    <Section
      id="system"
      kicker="Product System"
      title="五类模块共同构成可扩展的故事建构系统"
      lead="每个模块既能独立触发游戏，又能与其他模块形成空间、角色与任务的组合关系。"
      tone="wood"
    >
      <figure className="soft-card mb-8 overflow-hidden">
        <div className="relative aspect-[16/9] min-h-[260px]">
          <img
            src={moonCampAssets.productSystem}
            alt="MOON CAMP 模块化木质月球营地玩具系统图，包含火箭、基地、地形、角色、探测车和任务卡"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl border border-moon-paper/40 bg-moon-paper/80 px-5 py-4 text-sm leading-6 text-moon-muted shadow-line backdrop-blur sm:left-auto sm:max-w-sm">
            以完整产品系统图展示模块比例、材质语言和故事道具之间的关系。
          </figcaption>
        </div>
      </figure>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {productModules.map((item, index) => {
          const Icon = icons[index] ?? Box

          return (
            <article key={item.title} className="soft-card hover-lift flex flex-col p-6">
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${swatchClasses[item.tone]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-moon-ink">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-moon-muted">{item.text}</p>
              <ModulePreview tone={item.tone} />
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default ProductSystem
