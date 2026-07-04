const toneClasses = {
  plain: '',
  paper: 'bg-moon-paper/60',
  cream: 'bg-moon-creamSoft/70',
  blue: 'bg-moon-blue/20',
  sage: 'bg-moon-sage/20',
  wood: 'bg-moon-woodSoft/20',
}

function Section({ id, kicker, title, lead, children, tone = 'plain', className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${toneClasses[tone] ?? ''} ${className}`}>
      <div className="section-shell">
        {(kicker || title || lead) && (
          <div className="mb-10 sm:mb-14">
            {kicker && <p className="section-kicker">{kicker}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            {lead && <p className="section-lead">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section
