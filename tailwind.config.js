export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--void) / <alpha-value>)', ink: 'rgb(var(--ink) / <alpha-value>)',
        bone: 'rgb(var(--bone) / <alpha-value>)', mist: 'rgb(var(--mist) / <alpha-value>)',
        lapis: '#3d5af1', volt: '#bdf51c', saffron: '#ffb454', amber: '#b35a00',
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: { glow: '0 10px 40px -10px rgba(61,90,241,.45)', warm: '0 10px 30px -10px rgba(255,150,40,.55)' },
    },
  },
  plugins: [],
}
