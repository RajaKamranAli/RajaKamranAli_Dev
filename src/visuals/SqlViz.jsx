/** Relational schema visual with a scanning index beam. Pure SVG. */
const T = (x, y, name, cols, accent) => ({ x, y, name, cols, accent })
export default function SqlViz({ className = '' }) {
  const tables = [
    T(20, 30, 'Applications', ['Id  PK', 'ClientId  FK', 'Status', 'CreatedAt'], '#ffb454'),
    T(250, 10, 'Certificates', ['Id  PK', 'ApplicationId  FK', 'Quantity', 'Vintage'], '#4f6bff'),
    T(250, 150, 'Installers', ['Id  PK', 'Accreditation', 'Region'], '#4f6bff'),
    T(20, 160, 'AuditLog', ['Id  PK', 'EntityId  FK', 'Action', 'At'], '#4f6bff'),
  ]
  const W = 190
  return (
    <svg viewBox="0 0 470 300" className={className} role="img" aria-label="SQL Server schema with related tables and an index scan">
      <defs><linearGradient id="beam" x1="0" x2="1"><stop offset="0" stopColor="#ffb454" stopOpacity="0" /><stop offset=".5" stopColor="#ffb454" stopOpacity=".55" /><stop offset="1" stopColor="#ffb454" stopOpacity="0" /></linearGradient>
        <clipPath id="sqlclip"><rect width="470" height="300" rx="16" /></clipPath></defs>
      <g stroke="#4f6bff" strokeOpacity=".6" fill="none" strokeWidth="1.2">
        <path d="M210 70 C 235 70 225 60 250 60" className="flow" /><path d="M210 90 C 240 130 225 190 250 190" className="flow" /><path d="M115 130 V160" className="flow" />
      </g>
      {tables.map((t) => (
        <g key={t.name}>
          <rect x={t.x} y={t.y} width={W} height={30 + t.cols.length * 22} rx="12" fill="rgba(255,255,255,.9)" stroke="rgba(11,16,32,.16)" />
          <rect x={t.x} y={t.y} width={W} height="30" rx="12" fill={t.accent} fillOpacity=".16" />
          <text x={t.x + 14} y={t.y + 20} fill={t.accent === '#ffb454' ? '#b35a00' : '#3550f0'} fontSize="12" fontWeight="600">{t.name}</text>
          {t.cols.map((c, i) => <text key={c} x={t.x + 14} y={t.y + 50 + i * 22} fill="#2a3350" fontSize="11" fontFamily="JetBrains Mono, monospace">{c}</text>)}
        </g>
      ))}
      <g clipPath="url(#sqlclip)"><rect className="scan" x="0" y="0" width="470" height="46" fill="url(#beam)" /></g>
      <text x="20" y="296" fill="#5a637d" fontSize="11">Covering indexes on the hot paths</text>
    </svg>
  )
}
