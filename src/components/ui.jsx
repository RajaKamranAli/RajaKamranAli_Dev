import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { prefersReduced } from '../motion'
import Heading from './Heading'
import Scramble from './Scramble'

export const useReduced = () => prefersReduced()

/** Section wrapper: landmark + heading id for accessibility. */
export function Section({ id, title, kicker, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`sec ${className}`}>
      <div className="wrap">
        {title && (
          <div className="mb-14 max-w-3xl">
            {kicker && <p className="mb-4 text-sm text-amber"><Scramble text={kicker} /></p>}
            <Heading id={`${id}-h`}>{title}</Heading>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/** Single reveal used for grouped content (not on every element). */
export function Reveal({ children, delay = 0, className = '' }) {
  const reduce = prefersReduced()
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .7, delay, ease: [.2, .7, .2, 1] }}>
      {children}
    </motion.div>
  )
}

/** Pointer-driven 3D tilt for glass panels. */
export function Tilt({ children, className = '', max = 6 }) {
  const ref = useRef(null)
  const reduce = prefersReduced()
  const move = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    ref.current.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`
    ref.current.style.setProperty('--mx', `${(x + .5) * 100}%`)
    ref.current.style.setProperty('--my', `${(y + .5) * 100}%`)
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave}
      className={`glass rounded-3xl transition-transform duration-200 ease-out ${className}`}
      style={{ backgroundImage: 'radial-gradient(400px circle at var(--mx,50%) var(--my,0%), rgba(79,107,255,.14), transparent 60%)' }}>
      {children}
    </div>
  )
}

/** Button that leans toward the cursor. */
export function Magnetic({ href, children, variant = 'primary', ...rest }) {
  const ref = useRef(null)
  const reduce = prefersReduced()
  const move = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .28}px)`
  }
  return (
    <a ref={ref} href={href} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = '')}
      className={`btn ${{ primary: 'btn-primary', volt: 'btn-volt', line: 'btn-line' }[variant] || 'btn-ghost'}`} {...rest}>{children}</a>
  )
}

export function Counter({ to, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => { const p = Math.min(1, (t - t0) / 1400); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

/** Chip list that pops in one by one. */
export function ChipList({ items, className = '' }) {
  const reduce = prefersReduced()
  return (
    <motion.ul className={`flex flex-wrap gap-2 ${className}`} initial="h" whileInView="s" viewport={{ once: true, margin: '-40px' }} variants={{ s: { transition: { staggerChildren: .045 } } }}>
      {items.map((t) => <motion.li key={t} className="chip" variants={reduce ? {} : { h: { opacity: 0, scale: .6, y: 10 }, s: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 20 } } }} whileHover={reduce ? undefined : { y: -3, scale: 1.06 }}>{t}</motion.li>)}
    </motion.ul>
  )
}
