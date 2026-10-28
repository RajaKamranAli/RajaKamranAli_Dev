import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReduced } from '../motion'

/** Headline whose words rise out of a mask when scrolled into view. */
export default function Heading({ children, id, className = 'h2', as: Tag = 'h2' }) {
  const ref = useRef(null)
  const text = String(children)
  useEffect(() => {
    if (prefersReduced()) return
    const words = ref.current.querySelectorAll('.hw')
    const tw = gsap.from(words, { yPercent: 115, rotate: 4, duration: 1, ease: 'power4.out', stagger: .07, scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    return () => { tw.scrollTrigger?.kill(); tw.kill() }
  }, [])
  return (
    <Tag id={id} ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[.12em] align-bottom"><span className="hw inline-block origin-left">{w}&nbsp;</span></span>)}
    </Tag>
  )
}
