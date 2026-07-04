import { DoorOpen, Magnet, Radius, Sparkles } from 'lucide-react'
import { moonCampAssets } from '../data/assets'
import Section from './Section'

const details = [
  {
    icon: DoorOpen,
    title: '可开启舱门',
    text: '火箭和基地预留可放置角色的内部空间，支持角色进出和剧情转场。',
  },
  {
    icon: Magnet,
    title: '隐藏式连接',
    text: '连接件被整合进模块结构，避免外露磁珠，同时保留快速拼接体验。',
  },
  {
    icon: Radius,
    title: '大圆角处理',
    text: '边缘采用大 R 角和细磨砂表面，降低磕碰风险并提升握持舒适度。',
  },
  {
    icon: Sparkles,
    title: '材料触感',
    text: '榉木纹理、哑光水性漆与硅胶软部件共同形成温暖、自然的触觉层次。',
  },
]

function DetailDesign() {
  return (
    <Section
      id="detail"
      kicker="Detail Design"
      title="用细节让故事系统更易操作、更安全"
      lead="细节设计围绕儿童手部尺度、角色放置、模块连接和材料触感展开，保证玩具既好玩也经得起反复使用。"
      tone="wood"
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <figure className="soft-card overflow-hidden">
          <img
            src={moonCampAssets.detailCloseup}
            alt="MOON CAMP 火箭模块舱门、圆角、木纹和连接细节特写"
            loading="lazy"
            decoding="async"
            className="h-full min-h-[360px] w-full object-cover object-center"
          />
        </figure>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {details.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="soft-card hover-lift p-5">
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-moon-cream text-moon-woodDeep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-moon-ink">{item.title}</h3>
                </div>
                <p className="text-sm leading-6 text-moon-muted">{item.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default DetailDesign
