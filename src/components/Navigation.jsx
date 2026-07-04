import { Leaf, Moon, Rocket } from 'lucide-react'

const links = [
  { href: '#overview', label: 'Overview' },
  { href: '#insight', label: 'Insight' },
  { href: '#concept', label: 'Concept' },
  { href: '#system', label: 'System' },
  { href: '#play', label: 'Play' },
  { href: '#cmf', label: 'CMF' },
  { href: '#value', label: 'Value' },
]

function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-moon-ink/10 bg-moon-paper/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <a href="#hero" className="flex min-w-fit items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moon-ink text-moon-paper shadow-soft">
            <Moon className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold text-moon-ink">MOON CAMP</span>
            <span className="mt-1 hidden text-xs text-moon-muted sm:block">Wooden Story Toy</span>
          </span>
        </a>

        <div className="ml-auto flex min-w-0 items-center gap-2 overflow-x-auto rounded-full border border-moon-ink/10 bg-moon-creamSoft/70 p-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-moon-muted transition hover:bg-moon-paper hover:text-moon-ink sm:px-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-moon-sage/25 px-3 py-2 text-xs font-medium text-moon-sageDeep lg:flex">
          <Leaf className="h-4 w-4" />
          FSC + Open-ended
        </div>
        <Rocket className="hidden h-5 w-5 text-moon-orange lg:block" />
      </nav>
    </header>
  )
}

export default Navigation
