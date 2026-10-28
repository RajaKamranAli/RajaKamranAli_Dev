import { prefersReduced } from '../motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export default function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReduced()) return
    const words = ref.current.querySelectorAll('.w')
    const tw = gsap.fromTo(words, { opacity: .16 }, { opacity: 1, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true } })
    return () => { tw.scrollTrigger?.kill(); tw.kill() }
  }, [])
  return <p ref={ref} className={className} aria-label={text}>{text.split(' ').map((w, i) => <span key={i} className="w" aria-hidden="true">{w} </span>)}</p>
}
