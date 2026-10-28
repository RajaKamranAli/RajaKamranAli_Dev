/** Card that turns over on hover, focus or tap to show the detail on its back. */
export default function FlipCard({ front, back, className = '' }) {
  return (
    <div tabIndex={0} className={`group [perspective:1000px] outline-none ${className}`}>
      <div className="relative h-full min-h-[11rem] transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
        <div className="glass absolute inset-0 flex flex-col justify-between rounded-2xl p-5 [backface-visibility:hidden]">{front}</div>
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-[#0b1020] p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">{back}</div>
      </div>
    </div>
  )
}
