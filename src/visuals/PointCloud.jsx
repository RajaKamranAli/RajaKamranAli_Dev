import { prefersReduced } from '../motion'
import { useEffect, useRef } from 'react'

const TAGS = ['ML', '.NET', 'SQL']
const rand = (a, b) => a + Math.random() * (b - a)

function build(mode, n) {
  const pts = []
  for (let i = 0; i < n; i++) {
    let x, y, z
    if (mode === 'brain') {
      // two lobes: ellipsoid shells offset on x
      const lobe = i % 2 ? 1 : -1
      const u = Math.random() * Math.PI * 2, v = Math.acos(rand(-1, 1)), r = rand(.82, 1)
      x = lobe * .34 + Math.sin(v) * Math.cos(u) * .62 * r
      y = Math.cos(v) * .62 * r
      z = Math.sin(v) * Math.sin(u) * .78 * r
    } else {
      // loose galaxy disc thickened into a sphere-ish cloud
      const u = Math.random() * Math.PI * 2, v = Math.acos(rand(-1, 1)), r = Math.pow(Math.random(), .45)
      x = Math.sin(v) * Math.cos(u) * r; y = Math.cos(v) * r * .85; z = Math.sin(v) * Math.sin(u) * r
    }
    pts.push({ x, y, z, ch: TAGS[i % TAGS.length], hot: Math.random() < .1, tag: Math.random() < .28, ph: Math.random() * 6.28 })
  }
  return pts
}

/**
 * Canvas 3D point cloud. mode 'tech': ML, .NET and SQL tags drifting as a neural field.
 * mode 'brain': two-lobed LLM brain with travelling attention arcs.
 */
export default function PointCloud({ mode = 'tech', count = 150, className = '', label }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    const reduce = prefersReduced()
    let w, h, dpr, raf, vis = true
    const pts = build(mode, count)
    const arcs = Array.from({ length: mode === 'brain' ? 14 : 6 }, () => ({ a: 0, b: 0, t: Math.random() }))
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect(); w = r.width; h = r.height
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onMove = (e) => { const r = cv.getBoundingClientRect(); m.tx = ((e.clientX - r.left) / r.width - .5); m.ty = ((e.clientY - r.top) / r.height - .5) }
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting }); io.observe(cv)
    resize(); addEventListener('resize', resize); addEventListener('pointermove', onMove)
    let ang = 0
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!vis) return
      ctx.clearRect(0, 0, w, h)
      m.x += (m.tx - m.x) * .05; m.y += (m.ty - m.y) * .05
      if (!reduce) ang += .0027
      const ay = ang + m.x * 1.4, ax = m.y * .9
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax)
      const S = Math.min(w, h) * .46, f = 2.6
      const P = pts.map((p) => {
        let x = p.x * cy - p.z * sy, z = p.x * sy + p.z * cy
        let y = p.y * cx - z * sx; z = p.y * sx + z * cx
        const k = f / (f + z)
        return { sx: w / 2 + x * S * k, sy: h / 2 + y * S * k, k, z, p }
      })
      // links
      ctx.lineWidth = .6
      const LD = (S * .26) ** 2
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j += 2) {
        const dx = P[i].sx - P[j].sx, dy = P[i].sy - P[j].sy, d = dx * dx + dy * dy
        if (d < LD) { ctx.strokeStyle = `rgba(61,90,241,${(1 - d / LD) * .32 * P[i].k})`; ctx.beginPath(); ctx.moveTo(P[i].sx, P[i].sy); ctx.lineTo(P[j].sx, P[j].sy); ctx.stroke() }
      }
      // attention arcs (saffron)
      const time = performance.now() / 1000
      arcs.forEach((a) => {
        a.t += .006; if (a.t > 1) { a.t = 0; a.a = (Math.random() * P.length) | 0; a.b = (Math.random() * P.length) | 0 }
        const A = P[a.a], B = P[a.b]; if (!A || !B) return
        if (Math.hypot(A.sx - B.sx, A.sy - B.sy) > S * .7) { a.t = 1; return }
        const mx = (A.sx + B.sx) / 2, my = (A.sy + B.sy) / 2 - 40
        ctx.strokeStyle = `rgba(240,138,0,${Math.sin(a.t * Math.PI) * .8})`; ctx.lineWidth = 1.1
        ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.quadraticCurveTo(mx, my, B.sx, B.sy); ctx.stroke()
      })
      // nodes / glyphs
      P.sort((a, b) => b.z - a.z).forEach(({ sx: x, sy: y, k, p }) => {
        const a = Math.max(.3, Math.min(1, k * k * .8))
        if (mode === 'tech' && p.tag) {
          const col = p.ch === 'ML' ? '179,90,0' : p.ch === '.NET' ? '61,90,241' : '11,16,32'
          const fs = Math.round(13 * k + 3), pad = 6 * k
          ctx.font = `600 ${fs}px "Bricolage Grotesque", system-ui, sans-serif`
          const tw = ctx.measureText(p.ch).width
          ctx.fillStyle = `rgba(255,255,255,${Math.min(.95, a + .1)})`; ctx.strokeStyle = `rgba(${col},${a * .5})`; ctx.lineWidth = 1
          ctx.beginPath(); ctx.roundRect(x - pad, y - fs, tw + pad * 2, fs * 1.5, fs); ctx.fill(); ctx.stroke()
          ctx.fillStyle = `rgba(${col},${Math.min(1, a + .2)})`; ctx.fillText(p.ch, x, y)
        } else {
          ctx.fillStyle = p.hot ? `rgba(240,138,0,${a})` : `rgba(61,90,241,${a})`
          ctx.beginPath(); ctx.arc(x, y, (p.hot ? 2.6 : 1.7) * k + Math.sin(time * 2 + p.ph) * .25, 0, 6.283); ctx.fill()
        }
      })
    }
    frame()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', onMove); io.disconnect() }
  }, [mode, count])
  return <canvas ref={ref} className={`h-full w-full ${className}`} role="img" aria-label={label || 'Interactive 3D network of connected ML, .NET and SQL nodes'} />
}
