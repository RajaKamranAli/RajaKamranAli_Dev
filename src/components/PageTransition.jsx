import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReduced } from '../motion'

/** Full-screen curtain that wipes up, jumps to the target section, then lifts away. */
export default function PageTransition() {
  const panel = useRef(null), label = useRef(null), busy = useRef(false)
  useEffect(() => {
    const names = { top: 'Home', about: 'About', stack: 'Stack', services: 'Services', projects: 'Projects', production: 'Production', experience: 'Experience', contact: 'Contact', achievements: 'Highlights', social: 'Links' }
    const jump = (id) => {
      const el = document.getElementById(id); if (!el) return
      const y = id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY - 40
      window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : window.scrollTo(0, y)
    }
    const go = (e) => {
      const id = e.detail
      if (prefersReduced()) { jump(id); return }
      if (busy.current) return
      busy.current = true
      label.current.textContent = names[id] || ''
      gsap.timeline({ onComplete: () => { busy.current = false } })
        .set(panel.current, { yPercent: 100, display: 'grid' })
        .to(panel.current, { yPercent: 0, duration: .65, ease: 'power4.inOut' })
        .fromTo(label.current, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'power3.out' }, '-=.25')
        .add(() => jump(id))
        .to(label.current, { yPercent: -120, opacity: 0, duration: .4, ease: 'power3.in' }, '+=.15')
        .to(panel.current, { yPercent: -100, duration: .7, ease: 'power4.inOut' }, '-=.1')
        .set(panel.current, { display: 'none' })
    }
    addEventListener('pt:go', go); return () => removeEventListener('pt:go', go)
  }, [])
  return (
    <div ref={panel} aria-hidden="true" className="fixed inset-0 z-[95] hidden place-items-center bg-gradient-to-br from-[#3d5af1] to-[#2a3fc2]" style={{ borderRadius: '0 0 50% 50% / 0 0 8% 8%' }}>
      <div className="overflow-hidden"><p ref={label} className="text-6xl font-semibold tracking-tight text-white sm:text-8xl" /></div>
    </div>
  )
}
