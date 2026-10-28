import { prefersReduced } from '../motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/** Counter + name reveal, then the curtain lifts and the page starts. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (prefersReduced()) { onDone(); return }
    document.body.style.overflow = 'hidden'
    const o = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = ''; onDone() } })
    tl.from('.pl-name > span', { yPercent: 110, duration: .9, ease: 'power4.out', stagger: .08 })
      .to(o, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => setN(Math.round(o.v)) }, 0)
      .to('.pl-name > span', { yPercent: -110, duration: .6, ease: 'power3.in', stagger: .05 }, '+=.1')
      .to(root.current, { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '-=.2')
      .set(root.current, { display: 'none' })
    return () => { tl.kill(); document.body.style.overflow = '' }
  }, [])
  if (prefersReduced()) return null
  return (
    <div ref={root} className="fixed inset-0 z-[100] grid place-items-center bg-void" role="status" aria-label="Loading">
      <div className="text-center">
        <p className="pl-name flex justify-center gap-4 overflow-hidden text-5xl font-semibold tracking-tight sm:text-7xl">
          <span className="block">Kamran</span><span className="block text-amber">Ali</span>
        </p>
      </div>
      <p className="absolute bottom-8 right-8 text-6xl font-semibold tabular-nums text-bone/30 sm:text-8xl" aria-hidden="true">{n}</p>
    </div>
  )
}
