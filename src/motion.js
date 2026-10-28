// Motion is always on. (Kept as a function so components can still call prefersReduced().)
export const getMotion = () => 'on'
export const prefersReduced = () => false

// Page transition: curtain wipes the screen, jumps to the section, then lifts.
export const navigateTo = (id) => dispatchEvent(new CustomEvent('pt:go', { detail: id }))
