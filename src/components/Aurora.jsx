/** Slow drifting colour blobs behind the whole page. */
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="blob absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-lapis/20 blur-3xl" style={{ animation: 'drift1 22s ease-in-out infinite' }} />
      <div className="blob absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-saffron/25 blur-3xl" style={{ animation: 'drift2 26s ease-in-out infinite' }} />
      <div className="blob absolute bottom-[-10rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-[#9a7bff]/15 blur-3xl" style={{ animation: 'drift3 30s ease-in-out infinite' }} />
    </div>
  )
}
