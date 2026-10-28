import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { prefersReduced } from '../motion'

/** Cycles through phrases with a 3D flip, like a departures board. */
export default function FlipWords({ words, interval = 2600, className = '' }) {
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % words.length), interval); return () => clearInterval(id) }, [words.length, interval])
  const off = prefersReduced()
  return (
    <span className={`relative inline-block ${className}`} style={{ perspective: 600 }} role="text" aria-label={words.join(', ')} aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={words[i]} aria-hidden="true" className="inline-block whitespace-nowrap" style={{ transformOrigin: '50% 100%' }}
          initial={off ? { opacity: 0 } : { rotateX: -90, opacity: 0, y: 8 }} animate={off ? { opacity: 1 } : { rotateX: 0, opacity: 1, y: 0 }} exit={off ? { opacity: 0 } : { rotateX: 90, opacity: 0, y: -8 }}
          transition={{ duration: .5, ease: [.2, .7, .2, 1] }}>{words[i]}</motion.span>
      </AnimatePresence>
    </span>
  )
}
