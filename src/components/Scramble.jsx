import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../motion'

const CH = 'abcdefghijklmnopqrstuvwxyz'
/** Text that resolves letter by letter when it scrolls into view. */
export default function Scramble({ text, className = '' }) {
  const ref = useRef(null)
  const [out, setOut] = useState(prefersReduced() ? text : text.replace(/\S/g, ' '))
  useEffect(() => {
    if (prefersReduced()) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); const t0 = performance.now(), D = 900
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / D), n = Math.floor(p * text.length)
        setOut(text.split('').map((c, k) => (c === ' ' ? ' ' : k < n ? c : CH[(Math.random() * 26) | 0])).join(''))
        if (p < 1) requestAnimationFrame(tick); else setOut(text)
      }
      requestAnimationFrame(tick)
    }, { threshold: .6 })
    io.observe(ref.current); return () => io.disconnect()
  }, [text])
  return <span ref={ref} className={className} aria-label={text}><span aria-hidden="true">{out}</span></span>
}
