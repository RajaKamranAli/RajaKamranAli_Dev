import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import PageTransition from './components/PageTransition'
import Aurora from './components/Aurora'
import * as S from './components/Sections'
import { PROFILE } from './data'
import { navigateTo, prefersReduced } from './motion'

function FootName() {
  const letters = PROFILE.name.split('')
  const off = prefersReduced()
  const item = { hide: { y: '110%' }, show: { y: 0, transition: { duration: 1, ease: [.2, .7, .2, 1] } } }
  return (
    <motion.div aria-hidden="true" initial={off ? 'show' : 'hide'} whileInView="show" viewport={{ once: true, amount: .2 }} transition={{ staggerChildren: .05 }}
      className="wrap flex justify-center overflow-hidden pt-6 text-[clamp(3.5rem,17vw,16rem)] font-semibold leading-[.85] tracking-[-.05em] text-bone/90">
      {letters.map((l, i) => <motion.span key={i} className="inline-block" variants={item}>{l === ' ' ? '\u00a0' : l}</motion.span>)}
    </motion.div>
  )
}

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    if (prefersReduced()) return
    const lenis = new Lenis({ duration: 1.1 })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    // Glass panels drift slightly slower than the page for depth.
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-depth]').forEach((el) => gsap.to(el, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }))
    })
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null; ctx.revert() }
  }, [])
  return (
    <div className="grain">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-[#0b1020]">Skip to content</a>
      <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-saffron" />
      <Aurora />
      <PageTransition />
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero ready={ready} /><S.About /><S.Stack /><S.Services /><S.Projects /><S.Production /><S.Experience /><S.Achievements /><S.Social /><S.Contact />
      </main>
      <footer className="relative z-10 overflow-hidden">
        <FootName />
        <div className="wrap flex flex-wrap justify-between gap-2 py-8 text-sm text-mist">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <button type="button" onClick={() => navigateTo('top')} className="link-u">Back to top</button>
          <span>Designed and built in Islamabad</span>
        </div>
      </footer>
    </div>
  )
}
