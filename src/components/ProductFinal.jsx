import { Boxes, Image, Layers3, ScanSearch } from 'lucide-react'
import { moonCampAssets } from '../data/assets'
import Section from './Section'

function ProductFinal() {
  return (
    <Section
      id="final-product"
      kicker="Final Product Image"
      title="最终造型图：可被拆解、连接与重新讲述的月球营地"
      lead="最终图将产品作为一套完整玩具系统呈现，而不是单一物件：儿童可以从火箭出发，连接基地与地形，并用角色和任务卡持续生成新故事。"
      tone="paper"
    >
      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
        <figure className="soft-card overflow-hidden">
          <img
            src={moonCampAssets.finalToy}
            alt="MOON CAMP 模块化木质故事建构玩具最终造型图"
            className="h-full min-h-[520px] w-full bg-moon-creamSoft object-cover object-center"
          />
        </figure>

        <div className="grid gap-4">
          {[
            {
              icon: Image,
              title: '整体产品感',
              text: '以三分之二俯视角展示完整套装，清楚看到火箭、基地、月面地形与任务卡。',
            },
            {
              icon: Layers3,
              title: '模块层级',
              text: '基地单元、连接件、地形板和角色形成不同尺度，支持扩展与重新组合。',
            },
            {
              icon: Boxes,
              title: '木质建构语言',
              text: '圆角、原木纹理和低饱和色彩共同传达安全、自然和轻教育属性。',
            },
            {
              icon: ScanSearch,
              title: '故事线索',
              text: '任务卡、探测车和角色道具让静态造型转化为可讲述的冒险过程。',
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="soft-card hover-lift p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-moon-woodSoft/60 text-moon-woodDeep">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-moon-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-moon-muted">{item.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default ProductFinal
