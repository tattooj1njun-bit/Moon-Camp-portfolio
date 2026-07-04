import { Download, FileImage, Printer } from 'lucide-react'
import { moonCampAssets } from '../data/assets'
import Section from './Section'

const deliverables = [
  {
    title: 'A3 竖版海报',
    text: '偏视觉传播：强化最终造型图、项目标题、口号与核心设计关键词。',
    image: moonCampAssets.poster,
    png: '/mooncamp-assets/mooncamp-a3-poster.png',
    pdf: '/mooncamp-assets/mooncamp-a3-poster.pdf',
  },
  {
    title: 'A3 竖版展板',
    text: '偏作品集陈述：整合背景、洞察、系统模块、玩法流程、CMF、安全与价值。',
    image: moonCampAssets.board,
    png: '/mooncamp-assets/mooncamp-a3-board.png',
    pdf: '/mooncamp-assets/mooncamp-a3-board.pdf',
  },
]

function PrintDeliverables() {
  return (
    <Section
      id="deliverables"
      kicker="A3 Print Deliverables"
      title="海报与展板已按 A3 竖版比例输出"
      lead="网站中可直接预览两张交付图，也可以打开 PNG 或 PDF 文件继续打印、排版或提交。"
      tone="paper"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {deliverables.map((item) => (
          <article key={item.title} className="soft-card overflow-hidden">
            <div className="bg-moon-creamSoft p-5">
              <img
                src={item.image}
                alt={`${item.title}预览`}
                className="mx-auto aspect-[297/420] max-h-[680px] w-full rounded-2xl border border-moon-ink/10 bg-moon-paper object-cover shadow-soft"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-moon-ink text-moon-paper">
                  <Printer className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-moon-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-moon-muted">297 × 420 mm portrait</p>
                </div>
              </div>
              <p className="text-base leading-7 text-moon-muted">{item.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={item.png}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-moon-ink px-4 py-2 text-sm font-semibold text-moon-paper transition hover:bg-moon-woodDeep"
                >
                  <FileImage className="h-4 w-4" />
                  PNG
                </a>
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-moon-ink/10 bg-moon-paper px-4 py-2 text-sm font-semibold text-moon-ink transition hover:bg-moon-creamSoft"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default PrintDeliverables
