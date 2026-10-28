import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Section, Reveal, Tilt, Magnetic, ChipList } from './ui'
import Heading from './Heading'
import Marquee from './Marquee'
import { prefersReduced, navigateTo } from '../motion'
import ScrubText from './ScrubText'
import FlipCard from './FlipCard'
import PointCloud from '../visuals/PointCloud'
import NeuralNet from '../visuals/NeuralNet'
import SqlViz from '../visuals/SqlViz'
import ArchViz from '../visuals/ArchViz'
import { CodeEnv, MOCKS } from '../visuals/Mockups'
import * as D from '../data'

function ParallaxImg() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  return <div ref={ref} className="h-full w-full overflow-hidden"><motion.img style={prefersReduced() ? undefined : { y, scale: 1.2 }} src="/img/original.webp" width="900" height="1125" loading="lazy" alt="Kamran Ali standing in a navy three-piece suit" className="h-full w-full object-cover object-top" /></div>
}

export function About() {
  return (
    <Section id="about" kicker="About me">
      <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-3 rounded-[2.2rem] bg-gradient-to-br from-lapis/25 to-saffron/30" />
            <motion.div initial={prefersReduced() ? false : { clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [.76, 0, .24, 1] }} className="relative" data-cursor="Flip">
              <div tabIndex={0} aria-label="Photo of Kamran Ali. Hover, focus or tap to flip." className="group aspect-[4/5] [perspective:1200px] outline-none">
                <div className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(11,16,32,.5)] [backface-visibility:hidden]">
                    <ParallaxImg />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1020]/45 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-[#0b1020]">Islamabad, Pakistan</p>
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(11,16,32,.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img src="/img/original2.webp" width="900" height="1287" loading="lazy" alt="Kamran Ali smiling in a navy blazer" className="h-full w-full object-cover object-top" />
                    <p className="absolute bottom-4 left-4 rounded-full bg-[#0b1020]/85 px-4 py-1.5 text-sm font-medium text-white">AIOU CeLTS · Aussource</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <p className="mt-3 text-center text-sm text-mist">Hover or tap the photo to flip it.</p>
          </div>
        </Reveal>
        <div>
          <ScrubText className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl" text="I started in classic backend work: APIs, payment files, stored procedures. Then I took on a harder problem, building language models for Pakistani languages that large labs have little data for." />
          <Reveal className="mt-8 space-y-5">
            <p className="lead">Today I do both. At AIOU CeLTS I lead the team that prepares data, trains and ships Urdu models. At Aussource I build .NET services and SQL Server schemas for Australian compliance platforms.</p>
            <div className="flex flex-wrap gap-2 pt-2">{D.EDUCATION.map(([a, b, c]) => <span key={a} className="chip">{a} · {b} · {c}</span>)}</div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

export function Stack() {
  return (
    <Section id="stack" title="The tools I reach for" kicker="Skills and tech stack">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {D.STACK.map((g, i) => (
          <Reveal key={g.group} delay={i * .05} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <Tilt className="h-full p-6" max={4}>
              <h3 className="mb-4 text-xl font-semibold">{g.group}</h3>
              <ChipList items={g.items} />
            </Tilt>
          </Reveal>
        ))}
        <Reveal className="lg:col-span-6"><p className="text-sm text-mist">Also certified in: {D.CERTS.join(', ')}.</p></Reveal>
      </div>
    </Section>
  )
}

const SERVICES = [
  { id: 'dotnet', n: '01', t: '.NET engineering', d: 'ASP.NET Core APIs with custom middleware, Azure Key Vault secrets, and ABA and PDF file generation.', pts: D.DOTNET_POINTS.map((p) => p[0]), v: () => (<div className="grid min-w-0 grid-cols-1 gap-4"><ArchViz className="w-full" /><CodeEnv /></div>) },
  { id: 'sql', n: '02', t: 'SQL Server', d: 'Schemas, stored procedures and indexing for compliance systems where the rules live in the database.', pts: D.SQL_POINTS, v: () => <SqlViz className="w-full" /> },
  { id: 'ai', n: '03', t: 'AI and language models', d: 'Data preparation, Qwen3-8B fine-tuning, a from-scratch paraphraser, and deployment to production.', pts: D.AI_MODULES.slice(0, 5), v: () => (<div className="grid min-w-0 grid-cols-1 gap-4"><NeuralNet className="w-full" /><div className="h-56"><PointCloud mode="brain" count={90} label="Rotating brain of connected nodes" /></div></div>) },
]
function ServiceCard({ s, i, progress }) {
  const scale = useTransform(progress, [i / SERVICES.length, 1], [1, 1 - (SERVICES.length - 1 - i) * .05])
  const V = s.v
  return (
    <div className="sticky" style={{ top: `${96 + i * 22}px` }}>
      <motion.article id={s.id} aria-labelledby={`${s.id}-h`} style={{ scale }} className="origin-top overflow-hidden rounded-[2rem] border border-bone/10 bg-ink p-6 shadow-[0_-20px_60px_rgba(11,16,32,.12)] sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
          <div>
            <p className="text-sm text-amber">{s.n}</p>
            <h3 id={`${s.id}-h`} className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{s.t}</h3>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-mist">{s.d}</p>
            <ul className="mt-6 flex flex-wrap gap-2">{s.pts.map((p) => <li key={p} className="chip">{p}</li>)}</ul>
          </div>
          <V />
        </div>
      </motion.article>
    </div>
  )
}
export function Services() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <Section id="services" title="What I build" kicker="Engineering and AI">
      <div ref={ref} className="space-y-10 pb-24">
        {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} i={i} progress={scrollYProgress} />)}
      </div>
    </Section>
  )
}

export function Projects() {
  const [f, setF] = useState('All')
  const cats = ['All', 'AI', '.NET']
  const list = D.PROJECTS.filter((p) => f === 'All' || p.cat === f)
  return (
    <Section id="projects" title="Featured projects" kicker="Case studies">
      <div role="tablist" aria-label="Filter projects" className="mb-8 flex gap-2">
        {cats.map((c) => <button key={c} role="tab" aria-selected={f === c} onClick={() => setF(c)} className={`relative rounded-full px-5 py-2 text-sm transition-colors ${f === c ? 'text-[#0b1020]' : 'glass text-bone hover:border-lapis/60'}`}>
          {f === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-saffron" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}<span className="relative">{c}</span></button>)}
      </div>
      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => {
            const M = MOCKS[p.id], wide = p.feature && f === 'All'
            return (
              <motion.article key={p.id} layout initial={{ opacity: 0, y: 40, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: .94 }} transition={{ duration: .5, ease: [.2, .7, .2, 1] }}
                data-cursor={p.href ? 'Visit' : undefined} className={`glass group overflow-hidden rounded-3xl p-5 sm:p-7 ${wide ? 'lg:col-span-2 grid gap-8 lg:grid-cols-2 lg:items-center' : ''}`}>
                <div>
                  <p className="text-sm text-amber">{p.kind}</p>
                  <h3 className={`mt-2 font-semibold tracking-tight ${wide ? 'text-4xl sm:text-5xl' : 'text-2xl'}`}>{p.title}</h3>
                  <p className="mt-4 max-w-[52ch] leading-relaxed text-mist">{p.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">{p.stack.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                  {p.href && <a href={p.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber underline-offset-4 hover:underline">Visit {p.title}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
                </div>
                <div className={`transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] ${wide ? '' : 'mt-6'}`}><M /></div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

export function Production() {
  return (
    <>
    <Marquee items={['Machine learning', '.NET 8', 'SQL Server', 'Azure', 'Urdu LLMs']} className="mb-6 py-6 text-6xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgb(var(--bone)/.35)] sm:text-8xl" />
    <Section id="production" title="Running in production" kicker="5+ applications delivered">
      <div role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {D.PRODUCTION.map((a, i) => (
          <motion.div key={a.name} role="listitem" initial={prefersReduced() ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: i * .08, ease: [.2, .7, .2, 1] }}>
            <FlipCard className="h-full"
              front={<><span className="inline-flex items-center gap-2 text-xs text-amber"><i className="pulse-dot h-1.5 w-1.5 rounded-full bg-saffron" />{a.status}</span><div><h3 className="font-semibold">{a.name}</h3><p className="mt-1 text-sm text-mist">{a.tag}</p></div></>}
              back={<><span className="text-xs text-volt">{a.name}</span><p className="text-sm leading-relaxed text-white/85">{a.note}</p></>} />
          </motion.div>))}
      </div>
      <p className="mt-4 text-sm text-mist">Hover, focus or tap a card to turn it over.</p>
    </Section>
    </>
  )
}

export function Experience() {
  const tl = useRef(null)
  const { scrollYProgress: sp } = useScroll({ target: tl, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(sp, { stiffness: 90, damping: 24 })
  return (
    <Section id="experience" title="Experience" kicker="Where I’ve worked">
      <ol ref={tl} className="relative space-y-6 border-l border-bone/10 pl-6 sm:pl-10">
        <motion.span aria-hidden="true" style={{ scaleY: prefersReduced() ? 1 : line }} className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-lapis via-saffron to-lapis" />
        {D.EXPERIENCE.map((e, i) => (
          <li key={e.role + i} className="relative">
            <span aria-hidden="true" className="absolute -left-[31px] top-7 grid h-4 w-4 place-items-center rounded-full border border-saffron bg-void sm:-left-[47px]"><i className="h-1.5 w-1.5 rounded-full bg-saffron" /></span>
            <motion.div initial={prefersReduced() ? false : { opacity: 0, x: i % 2 ? 80 : -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .9, ease: [.2, .7, .2, 1] }}><div className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-2xl font-semibold">{e.role}</h3><span className="text-sm text-amber">{e.when}</span></div>
              <p className="mt-1 text-mist">{e.org}</p>
              <ul className="mt-5 space-y-2 text-mist">{e.points.map((p) => <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-bone/30" />{p}</li>)}</ul>
            </div></motion.div>
          </li>))}
      </ol>
    </Section>
  )
}

export function Achievements() {
  return (
    <Section id="achievements" title="Highlights">
      <div className="grid gap-px overflow-hidden rounded-3xl bg-bone/10 sm:grid-cols-2">
        {D.ACHIEVEMENTS.map(([t, d]) => <motion.div key={t} initial={prefersReduced() ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="fill-up bg-void p-8"><span className="fu" aria-hidden="true" /><h3 className="relative text-xl font-semibold">{t}</h3><p className="relative mt-2 text-mist">{d}</p></motion.div>)}
      </div>
    </Section>
  )
}

export function Social() {
  const L = [['LinkedIn', 'Experience, recommendations and updates', D.PROFILE.linkedin], ['GitHub', 'Code and experiments', D.PROFILE.github], ['Grammora.ai', 'Try the Urdu paraphraser', D.PROFILE.grammora]]
  return (
    <Section id="social" title="Find me elsewhere">
      <div className="grid gap-5 md:grid-cols-3">
        {L.map(([n, d, h]) => <Reveal key={n}><a href={h} target="_blank" rel="noreferrer" className="glass fill-up group block rounded-3xl p-7 transition-all hover:-translate-y-1 hover:border-lapis/60 hover:shadow-glow" data-cursor="Open"><span className="fu" aria-hidden="true" />
          <h3 className="relative flex items-center justify-between text-2xl font-semibold">{n}<span aria-hidden="true" className="text-amber transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></h3><p className="relative mt-2 text-mist">{d}</p><span className="sr-only">(opens in a new tab)</span></a></Reveal>)}
      </div>
    </Section>
  )
}

export function Contact() {
  return (
    <>
    <Marquee reverse outline items={['Let’s build something', 'ML · .NET · SQL', 'Let’s collaborate']} className="py-8 text-6xl font-semibold tracking-tight sm:text-8xl" />
    <Section id="contact">
      <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
        <div aria-hidden="true" className="absolute -right-10 top-0 h-full w-[45%] opacity-70"><PointCloud mode="tech" count={80} label="" /></div>
        <img src="/img/portrait.webp" width="860" height="1141" loading="lazy" alt="" aria-hidden="true" className="absolute -bottom-2 right-4 hidden h-[88%] w-auto opacity-95 lg:block" />
        <Heading id="contact-h" className="h2 relative max-w-2xl">Have a model to train or a system to ship?</Heading>
        <p className="lead relative mt-6">I’m open to .NET, SQL Server and Urdu AI projects. Tell me what you’re building and when it has to ship.</p>
        <div className="relative mt-10 flex flex-wrap gap-4">
          <Magnetic href={`mailto:${D.PROFILE.email}?subject=Project%20enquiry`}>Email {D.PROFILE.email}</Magnetic>
          <Magnetic href={`https://wa.me/${D.PROFILE.phone.replace(/\D/g, '')}`} variant="ghost" target="_blank" rel="noreferrer">Message on WhatsApp</Magnetic>
        </div>
        <p className="relative mt-8 text-sm text-mist">{D.PROFILE.location} · {D.PROFILE.phone}</p>
      </div>
    </Section>
    </>
  )
}
