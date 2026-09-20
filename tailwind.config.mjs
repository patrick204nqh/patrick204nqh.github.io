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
        ink: '#0a2e4a',
        'ink-dim': 'rgba(10,46,74,0.72)',
        'ink-muted': 'rgba(10,46,74,0.5)',
        surface: '#ffffff',
        'surface-alt': '#eef5fb',
        border: 'rgba(10,46,74,0.1)',
        accent: { DEFAULT: '#2f7fc4', hover: '#1e6bb0', dim: 'rgba(47,127,196,0.1)', glow: 'rgba(47,127,196,0.06)' },
        'sky-top': '#7dc4fc',
        'sky-bottom': '#d9ecfb',
        sea: '#a9cfe8',
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
