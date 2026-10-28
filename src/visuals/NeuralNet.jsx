/** Layered feed-forward network with animated signal flow. Pure SVG. */
export default function NeuralNet({ className = '' }) {
  const layers = [4, 6, 7, 6, 3]
  const X = (i) => 45 + i * 142, Y = (i, n, H = 300) => H / 2 + (i - (n - 1) / 2) * 40
  const edges = []
  layers.forEach((n, l) => { if (l === layers.length - 1) return
    for (let a = 0; a < n; a++) for (let b = 0; b < layers[l + 1]; b++) if ((a * 7 + b * 3 + l) % 3 !== 0)
      edges.push({ k: `${l}-${a}-${b}`, x1: X(l), y1: Y(a, n), x2: X(l + 1), y2: Y(b, layers[l + 1]), hot: (a + b + l) % 5 === 0 }) })
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Neural network diagram with signals flowing left to right">
      <defs><radialGradient id="nn-g"><stop offset="0" stopColor="#ffb454" /><stop offset="1" stopColor="#ffb454" stopOpacity="0" /></radialGradient></defs>
      {edges.map((e) => <line key={e.k} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={e.hot ? '#ffb454' : '#4f6bff'} strokeOpacity={e.hot ? .75 : .25} strokeWidth={e.hot ? 1.3 : .8} className={e.hot ? 'flow' : ''} />)}
      {layers.map((n, l) => Array.from({ length: n }).map((_, i) => (
        <circle key={`${l}-${i}`} cx={X(l)} cy={Y(i, n)} r={l === 2 ? 6 : 5} fill="#ffffff" stroke={l === 4 ? '#ffb454' : '#4f6bff'} strokeWidth="1.6" className="pulse-dot" style={{ animationDelay: `${(l * 0.3 + i * .1).toFixed(2)}s` }} />
      )))}
      {['Tokens', 'Embed', 'Attention', 'Decode', 'Output'].map((t, l) => <text key={t} x={X(l)} y="292" textAnchor="middle" fill="#5a637d" fontSize="11">{t}</text>)}
    </svg>
  )
}
