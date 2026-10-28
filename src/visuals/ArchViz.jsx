/** Backend architecture: client → API → middleware → services → data/secrets. */
export default function ArchViz({ className = '' }) {
  const Box = ({ x, y, w = 120, h = 46, t, s, c = '#4f6bff' }) => (
    <g><rect x={x} y={y} width={w} height={h} rx="12" fill="rgba(255,255,255,.9)" stroke={c} strokeOpacity=".55" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fill="#0b1020" fontSize="12" fontWeight="600">{t}</text>
      <text x={x + w / 2} y={y + 36} textAnchor="middle" fill="#5a637d" fontSize="10">{s}</text></g>)
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Backend architecture diagram: React client, ASP.NET Core API, middleware, services, SQL Server, Azure Key Vault">
      <g stroke="#f08a00" strokeOpacity=".85" strokeWidth="1.3" fill="none" className="flow">
        <path d="M140 150 H190" /><path d="M310 150 H350" /><path d="M470 150 C 500 150 500 70 530 70" /><path d="M470 150 H530" /><path d="M470 150 C 500 150 500 230 530 230" />
      </g>
      <Box x={20} y={127} t="React client" s="Browser" />
      <Box x={190} y={127} t="ASP.NET Core API" s=".NET 8 · REST" c="#f08a00" />
      <Box x={350} y={127} t="Middleware" s="Auth · logging · limits" />
      <Box x={530} y={47} w={130} t="SQL Server" s="Procedures · views" />
      <Box x={530} y={127} w={130} t="Azure Key Vault" s="Secrets" />
      <Box x={530} y={207} w={130} t="File services" s="PDF · ABA" />
      <text x="20" y="285" fill="#5a637d" fontSize="11">Every request passes through the same middleware pipeline.</text>
    </svg>
  )
}
