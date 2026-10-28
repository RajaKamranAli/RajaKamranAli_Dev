import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/** Dot + lagging ring. Elements with data-cursor="Label" grow the ring and show the label. */
export default function Cursor() {
  const dot = useRef(null), ring = useRef(null)
  const [label, setLabel] = useState('')
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')
    const dx = gsap.quickTo(dot.current, 'x', { duration: .05 }), dy = gsap.quickTo(dot.current, 'y', { duration: .05 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring.current, 'y', { duration: .45, ease: 'power3' })
    const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
    const over = (e) => {
      const t = e.target.closest('[data-cursor]'), a = e.target.closest('a,button')
      setLabel(t ? t.dataset.cursor : '')
      gsap.to(ring.current, { scale: t ? 3.4 : a ? 1.8 : 1, duration: .35, ease: 'power3.out' })
    }
    addEventListener('pointermove', move); addEventListener('pointerover', over)
    return () => { removeEventListener('pointermove', move); removeEventListener('pointerover', over); document.documentElement.classList.remove('has-cursor') }
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(pointer:fine)]:block">
      <div ref={ring} className="-ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full border border-saffron/70 mix-blend-normal">
        <span className="text-[4px] font-semibold text-[#0b1020]" style={{ opacity: label ? 1 : 0 }}>{label}</span>
      </div>
      <div ref={dot} className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-saffron" />
    </div>
  )
}
