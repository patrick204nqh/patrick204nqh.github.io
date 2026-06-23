/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        ink: '#e8edf5',
        'ink-dim': 'rgba(232,237,245,0.65)',
        'ink-muted': 'rgba(232,237,245,0.45)',
        surface: '#0b0e17',
        'surface-alt': '#111624',
        border: 'rgba(255,255,255,0.06)',
        accent: { DEFAULT: '#7ab7ef', hover: '#a3cffa', dim: 'rgba(122,183,239,0.15)', glow: 'rgba(122,183,239,0.08)' },
        'sky-top': '#0c0f25',
        'sky-bottom': '#161b33',
        sea: '#020414',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' },
        ring: 'var(--ring)',
      },
      borderRadius: {
        pill: '100px',
        glass: '20px',
        card: '12px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
