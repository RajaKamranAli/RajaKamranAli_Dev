import { prefersReduced } from '../motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Endless strip. Scrolling speeds it up and flips direction with the scroll. */
export default function Marquee({ items, className = '', reverse = false, outline = false }) {
  const track = useRef(null)
  useEffect(() => {
    if (prefersReduced()) return
    const tween = gsap.fromTo(track.current, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, repeat: -1, duration: 38, ease: 'none' })
    const st = ScrollTrigger.create({ onUpdate: (s) => { gsap.to(tween, { timeScale: s.direction * (1 + Math.abs(s.getVelocity()) / 260), duration: .3, overwrite: true }); gsap.to(tween, { timeScale: s.direction, delay: .4, duration: 1 }) } })
    return () => { tween.kill(); st.kill() }
  }, [])
  const row = items.map((t) => <span key={t} className={`flex items-center gap-10 whitespace-nowrap ${outline ? 'outline-text' : ''}`}>{t}<i aria-hidden="true" className="h-2 w-2 rotate-45 bg-saffron" /></span>)
  return (
    <div className={`overflow-hidden ${className}`} aria-label={items.join(', ')} role="group">
      <div ref={track} className="flex w-max gap-10 will-change-transform" aria-hidden="true"><div className="flex gap-10">{row}</div><div className="flex gap-10">{row}</div></div>
    </div>
  )
}
