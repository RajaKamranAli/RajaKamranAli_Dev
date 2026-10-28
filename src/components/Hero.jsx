import { prefersReduced, navigateTo } from '../motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Circuit from './Circuit'
import FlipWords from './FlipWords'
import Marquee from './Marquee'
import { Magnetic, Counter } from './ui'
import { PROFILE, TECH_MARQUEE } from '../data'

const Chars = ({ text }) => text.split('').map((c, i) => <span key={i} className="fc inline-block" style={{ transformOrigin: '50% 100%' }}>{c}</span>)

export default function Hero({ ready }) {
  const root = useRef(null), photo = useRef(null)
  useEffect(() => {
    if (!ready || prefersReduced()) return
    let off = () => {}
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.fc', { rotateX: -100, opacity: 0, y: 34, duration: 1, stagger: .035, ease: 'power3.out' }, 0)
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power3.inOut' }, .7)
        .from('.hero-fade', { opacity: 0, y: 20, duration: .9, stagger: .1 }, .8)
        .from('.hero-photo', { yPercent: 14, opacity: 0, duration: 1.5, ease: 'power4.out' }, .2)
        .from('.hero-chip', { scale: 0, opacity: 0, duration: .8, stagger: .12, ease: 'back.out(1.8)' }, 1.1)
      const px = gsap.quickTo('.pz', 'x', { duration: .9, ease: 'power3' }), py = gsap.quickTo('.pz', 'y', { duration: .9, ease: 'power3' })
      const mm = (e) => { const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5; px(nx * -22); py(ny * -12) }
      addEventListener('pointermove', mm); off = () => removeEventListener('pointermove', mm)
      gsap.to('.hero-photo', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-copy', { yPercent: -10, opacity: .35, ease: 'none', scrollTrigger: { trigger: root.current, start: '40% top', end: 'bottom top', scrub: true } })
    }, root)
    return () => { off(); ctx.revert() }
  }, [ready])
  const go = (id) => (e) => { e.preventDefault(); navigateTo(id) }
  const chip = 'hero-chip chip-float absolute rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur'
  return (
    <section id="top" ref={root} aria-label="Introduction" className="relative overflow-hidden rounded-b-[2.5rem] bg-[#050605] pt-28 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_75%_55%,rgba(189,245,28,.2),transparent),radial-gradient(60%_40%_at_10%_100%,rgba(189,245,28,.07),transparent)]" />
      <Circuit className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent_5%,#000_55%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-[5.9rem] h-px bg-gradient-to-r from-volt/0 via-volt/50 to-volt/0" />
      <div className="wrap relative grid min-h-[calc(100svh-7rem)] items-end gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <div className="hero-copy self-center py-12">
          <h1 className="text-[clamp(2.6rem,6.2vw,5.8rem)] uppercase leading-[.98] tracking-[-.02em] [perspective:900px]" aria-label="Engineering intelligent systems.">
            <span aria-hidden="true" className="block font-light"><Chars text="Engineering" /></span>
            <span aria-hidden="true" className="block font-light"><Chars text="Intelligent" /></span>
            <span aria-hidden="true" className="block font-extrabold text-volt"><Chars text="Systems." /></span>
          </h1>
          <div className="hero-rule mt-8 h-px w-full max-w-sm bg-volt/70" />
          <p className="hero-fade mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{PROFILE.name}</p>
          <p className="hero-fade mt-1 text-xl text-volt"><FlipWords words={PROFILE.roles} /></p>
          <p className="hero-fade mt-5 max-w-[48ch] text-base leading-relaxed text-white/65">I lead language-model work at AIOU CeLTS, created <a className="text-white underline decoration-volt underline-offset-4" href={PROFILE.grammora} target="_blank" rel="noreferrer">Grammora.ai</a>, and ship ASP.NET Core and SQL Server systems for clients in Australia and Pakistan.</p>
          <div className="hero-fade mt-8 flex flex-wrap gap-4">
            <Magnetic href="#projects" variant="volt" onClick={go('projects')}>Explore my work</Magnetic>
            <Magnetic href="#contact" variant="line" onClick={go('contact')}>Let’s collaborate</Magnetic>
          </div>
          <p className="hero-fade mt-8 text-sm text-white/40">rajakamranali.vercel.app</p>
        </div>
        <div className="hero-photo relative mx-auto w-full max-w-md self-end lg:max-w-none">
          <div className="pz">
            <img ref={photo} src="/img/portrait-dark.webp" width="860" height="1141" fetchpriority="high" alt="Kamran Ali smiling, wearing a navy suit" className="relative mx-auto block w-full max-w-[28rem] lg:max-w-none" />
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050605] to-transparent" />
          <span aria-hidden="true" className={`${chip} left-2 top-[18%]`}>ML</span>
          <span aria-hidden="true" className={`${chip} right-2 top-[30%] [animation-delay:-1.5s]`}>.NET</span>
          <span aria-hidden="true" className={`${chip} left-[6%] top-[52%] [animation-delay:-3s]`}>SQL</span>
        </div>
      </div>
      <div className="wrap relative mb-10 mt-2"><dl className="hero-fade grid max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[.04]">
        {[[5, '+', 'production applications'], [9, '', 'Urdu NLP modules shipped'], [6, '', 'month team build, on time']].map(([n, s, l]) => (
          <div key={l} className="flex flex-col px-4 py-4 sm:px-6"><dt className="order-2 text-xs text-white/55 sm:text-sm">{l}</dt><dd className="text-2xl font-semibold text-volt sm:text-4xl"><Counter to={n} suffix={s} /></dd></div>))}
      </dl></div>
      <Marquee items={TECH_MARQUEE} className="border-t border-white/10 py-6 text-3xl font-semibold tracking-tight text-white/75 sm:text-5xl" />
    </section>
  )
}
