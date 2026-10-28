import { prefersReduced } from '../motion'
import { useEffect, useState } from 'react'

const Frame = ({ title, children, dark = false, className = '' }) => (
  <div className={`overflow-hidden rounded-2xl border shadow-[0_24px_60px_-28px_rgba(11,16,32,.45)] ${dark ? 'border-white/10 bg-[#0b1020]' : 'border-bone/10 bg-white'} ${className}`}>
    <div className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${dark ? 'border-white/10' : 'border-bone/10'}`}>
      <i className="h-2.5 w-2.5 rounded-full bg-[#ff6b5e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#ffbd44]" /><i className="h-2.5 w-2.5 rounded-full bg-[#2dc653]" />
      <span className={`ml-3 truncate text-xs ${dark ? 'text-[#98a0b8]' : 'text-mist'}`}>{title}</span>
    </div>{children}
  </div>
)
const Skel = ({ w, accent }) => <i className={`block h-2.5 rounded-full ${accent ? 'bg-saffron/70' : 'bg-bone/10'}`} style={{ width: w }} />

/** Terminal-style C# environment shown in perspective. */
export function CodeEnv() {
  const lines = [
    ['public class AbaFileBuilder', '#8da2ff'], ['{', '#98a0b8'],
    ['  public string Build(IEnumerable<Payment> p)', '#e9e6dd'], ['  {', '#98a0b8'],
    ['    var sb = new StringBuilder();', '#e9e6dd'], ['    sb.AppendLine(Descriptive(bank));', '#ffb454'],
    ['    foreach (var x in p) sb.AppendLine(Detail(x));', '#e9e6dd'], ['    sb.AppendLine(Trailer(p));', '#ffb454'],
    ['    return sb.ToString();', '#e9e6dd'], ['  }', '#98a0b8'], ['}', '#98a0b8'],
  ]
  const [n, setN] = useState(0)
  useEffect(() => { if (prefersReduced()) return setN(lines.length)
    const id = setInterval(() => setN((v) => (v >= lines.length + 4 ? 0 : v + 1)), 380); return () => clearInterval(id) }, [])
  return (
    <div style={{ perspective: 1100 }} className="w-full">
      <div style={{ transform: 'rotateY(-14deg) rotateX(6deg)' }} className="transition-transform duration-700 hover:[transform:rotateY(-4deg)_rotateX(2deg)]">
        <Frame dark title="AbaFileBuilder.cs — Payments.Api">
          <pre className="m-0 min-h-[270px] overflow-hidden p-5 font-mono text-[12px] leading-6" aria-label="C# code that builds an ABA payment file">
            {lines.slice(0, n).map(([t, c], i) => <div key={i} style={{ color: c }}><span className="mr-4 select-none text-white/25">{String(i + 1).padStart(2, ' ')}</span>{t}</div>)}
            <span className="pulse-dot inline-block h-4 w-2 translate-y-0.5 bg-saffron" />
          </pre>
        </Frame>
      </div>
    </div>
  )
}

export function GrammoraMock() {
  return (
    <Frame title="grammora.ai — Paraphrase">
      <div className="grid gap-px bg-bone/10 sm:grid-cols-2">
        <div className="space-y-3 bg-white p-5"><p className="mb-1 text-xs text-mist">Your text</p><Skel w="92%" /><Skel w="78%" /><Skel w="60%" /></div>
        <div className="space-y-3 bg-[#f1f4fb] p-5"><p className="mb-1 flex items-center gap-2 text-xs text-amber"><i className="pulse-dot h-1.5 w-1.5 rounded-full bg-saffron" />Paraphrased</p><Skel w="88%" accent /><Skel w="82%" accent /><Skel w="54%" accent /></div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-bone/10 px-5 py-3"><span className="chip">Trained from scratch</span><span className="chip">Own tokenizer</span><span className="chip">Live in production</span></div>
    </Frame>
  )
}

export function DashboardMock() {
  const bars = [38, 52, 44, 68, 59, 76, 64, 88, 72, 95]
  return (
    <Frame title="Form Panda — STC dashboard">
      <div className="grid gap-4 p-5 sm:grid-cols-3">
        {[['Open applications', 'Queue'], ['Certificates created', 'Month'], ['Compliance checks', 'Passing']].map(([a, b], i) => (
          <div key={a} className="rounded-xl border border-bone/10 bg-[#f6f8fc] p-3"><p className="text-[11px] text-mist">{a}</p><div className="mt-2 h-1.5 overflow-hidden rounded bg-bone/10"><div className="h-full rounded bg-lapis" style={{ width: `${55 + i * 15}%` }} /></div><p className="mt-2 text-[11px] text-amber">{b}</p></div>))}
        <div className="flex h-28 items-end gap-1.5 sm:col-span-3" aria-hidden="true">{bars.map((h, i) => <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-lapis/30 to-lapis" style={{ height: `${h}%` }} />)}</div>
      </div>
    </Frame>
  )
}

export function SurveyMock() {
  const rows = [['Urdu', 78], ['English', 64], ['Regional languages', 41], ['Mixed', 29]]
  return (
    <Frame title="languagepolicyframework.com">
      <div className="space-y-3 p-5">{rows.map(([l, v]) => (
        <div key={l}><div className="mb-1 text-[11px] text-mist">{l}</div>
          <div className="h-2 overflow-hidden rounded bg-bone/10"><div className="h-full rounded bg-gradient-to-r from-lapis to-saffron" style={{ width: `${v}%` }} /></div></div>))}
        <p className="pt-1 text-[11px] text-mist">Layout preview with sample values, not survey results.</p></div>
    </Frame>
  )
}

export function LlmMock() {
  const pts = Array.from({ length: 24 }, (_, i) => `${i * 14},${22 + 68 * Math.exp(-i / 6) + Math.sin(i * 2) * 2}`).join(' ')
  return (
    <Frame title="Urdu LLM — Qwen3-8B fine-tune">
      <svg viewBox="0 0 330 110" className="w-full p-4" role="img" aria-label="Training loss curve falling over time"><polyline points={pts} fill="none" stroke="#f08a00" strokeWidth="2" /><line x1="0" y1="100" x2="330" y2="100" stroke="rgba(11,16,32,.15)" /></svg>
      <div className="flex flex-wrap gap-2 border-t border-bone/10 px-5 py-3"><span className="chip">Summarization</span><span className="chip">Paraphrasing</span><span className="chip">Synonyms</span></div>
    </Frame>
  )
}

export function LekhariMock() {
  return (
    <Frame title="Lekhari — writing assistant">
      <div className="space-y-3 p-5"><Skel w="90%" /><div className="flex items-center gap-2"><Skel w="40%" /><i className="block h-2.5 w-16 rounded-full bg-saffron/60" /><Skel w="20%" /></div><Skel w="55%" />
        <div className="flex gap-2 pt-2"><span className="chip">Suggest</span><span className="chip">Rewrite</span></div></div>
    </Frame>
  )
}

export const MOCKS = { grammora: GrammoraMock, 'urdu-llm': LlmMock, survey: SurveyMock, formpanda: DashboardMock, lekhari: LekhariMock }
