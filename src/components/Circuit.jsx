/** Procedurally drawn circuit-board traces with signals travelling along some of them. */
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647 }
export default function Circuit({ className = '' }) {
  const r = rng(11), paths = [], nodes = []
  for (let i = 0; i < 22; i++) {
    let x = Math.round(r() * 24) * 25, y = Math.round(r() * 16) * 25, d = `M${x} ${y}`
    for (let k = 0; k < 3 + Math.floor(r() * 3); k++) {
      const len = (2 + Math.floor(r() * 5)) * 25, dir = r() > .5 ? 1 : -1
      if (k % 2 === 0) { x += len * dir; d += ` H${x}` } else { y += len * dir; d += ` V${y}` }
      if (r() > .55) { x += 25 * dir; y += 25 * dir; d += ` L${x} ${y}` }
    }
    paths.push({ d, live: i % 4 === 0, delay: (i % 7) * .8 }); nodes.push([x, y])
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className={className}>
      <g fill="none" stroke="#bdf51c" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((p, i) => <path key={i} d={p.d} strokeOpacity=".16" strokeWidth="1" />)}
        {paths.filter((p) => p.live).map((p, i) => <path key={`l${i}`} d={p.d} strokeOpacity=".9" strokeWidth="1.6" pathLength="100" strokeDasharray="6 94" className="circuit-run" style={{ animationDelay: `${p.delay}s` }} />)}
      </g>
      {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="none" stroke="#bdf51c" strokeOpacity=".4" />)}
    </svg>
  )
}
