import { prefersReduced } from '../motion'
import { useState, useEffect } from 'react'
import { NAV, PROFILE } from '../data'
import { navigateTo } from '../motion'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const [hide, setHide] = useState(false)
  useEffect(() => {
    let last = 0
    const on = () => { setSolid(scrollY > 40); setHide(scrollY > 300 && scrollY > last); last = scrollY }; on(); addEventListener('scroll', on, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { removeEventListener('scroll', on); io.disconnect() }
  }, [])
  const go = (id) => (e) => { e.preventDefault(); setOpen(false); navigateTo(id) }
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'py-3' : 'py-5'} ${hide && !open ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="wrap">
        <nav aria-label="Primary" className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all glass [background-image:none] bg-white/90`}>
          <a href="#top" onClick={go('top')} className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Kamran Ali, home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-saffron text-lg font-semibold leading-none text-[#0b1020]">K</span>Kamran Ali
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map(([id, l]) => <li key={id}><a href={`#${id}`} onClick={go(id)} aria-current={active === id ? 'true' : undefined}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${active === id ? 'bg-bone/10 text-bone' : 'text-mist hover:text-bone'}`}>{l}</a></li>)}
          </ul>
          <div className="hidden items-center gap-4 lg:flex"><a href="#contact" onClick={go('contact')} className="btn btn-primary !py-2">Let’s collaborate</a></div>
          <button className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span className="relative block h-3 w-5"><i className={`absolute left-0 top-0 h-px w-5 bg-bone transition ${open ? 'translate-y-1.5 rotate-45' : ''}`} /><i className={`absolute bottom-0 left-0 h-px w-5 bg-bone transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`} /></span>
          </button>
        </nav>
        {open && (
          <ul id="mobile-menu" className="glass mt-2 rounded-3xl p-3 lg:hidden">
            {NAV.map(([id, l]) => <li key={id}><a href={`#${id}`} onClick={go(id)} className="block rounded-2xl px-4 py-3 text-lg">{l}</a></li>)}
            <li><a href={`mailto:${PROFILE.email}`} className="btn btn-primary mt-2 w-full">Let’s collaborate</a></li>
          </ul>
        )}
      </div>
    </header>
  )
}
