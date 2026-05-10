import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'bg-primary': 'hsl(var(--bg-primary))',
        'bg-secondary': 'hsl(var(--bg-secondary))',
        'bg-card': 'hsl(var(--bg-card))',
        paper: 'hsl(var(--paper))',
        'paper-aged': 'hsl(var(--paper-aged))',
        'accent-gold': 'hsl(var(--accent-gold))',
        'accent-rust': 'hsl(var(--accent-rust))',
        'accent-blue': 'hsl(var(--accent-blue))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--bg-primary))',
        foreground: 'hsl(var(--text-primary))',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        warm: '0 6px 20px -8px rgba(201, 167, 92, 0.15), 0 2px 6px -2px rgba(0,0,0,0.4)',
        paper: '0 0 0 1px hsl(var(--border)), 0 12px 30px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-0': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out-0': { from: { opacity: '1' }, to: { opacity: '0' } },
        'zoom-in-95': { from: { transform: 'scale(0.95)' }, to: { transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out',
        'slide-in-right': 'slide-in-right 300ms ease-out',
      },
    },
  },
  plugins: [],
}

export default config
