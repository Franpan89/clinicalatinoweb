import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ──────────────────────────────────────────────
        // Brand palette — extraída del manual / logo
        // ──────────────────────────────────────────────
        brand: {
          green: '#B9DB5C',  // inicio del gradiente — verde lima
          teal: '#2BB3B2',   // centro del gradiente — acento principal
          blue: '#2C6FB1',   // final del gradiente — corporativo
          gray: '#6E7F8E',   // gris tipográfico del logo
          dark: '#1A3B5C',   // azul profundo · texto principal · headers oscuros
          surface: '#F4F6F8', // fondo suave neutro
        },

        // ──────────────────────────────────────────────
        // Aliases retrocompatibles (mapeados a brand)
        // navy → brand-dark · gold → brand-teal · cream → brand-surface
        // ──────────────────────────────────────────────
        navy: {
          DEFAULT: '#1A3B5C',
          light: '#2C6FB1',
          dark: '#0F2436',
        },
        gold: {
          DEFAULT: '#2BB3B2',
          light: '#4DC2C1',
          pale: '#D7EEED',
          dark: '#1F8B8A',
        },
        cream: {
          DEFAULT: '#F4F6F8',
          dark: '#E5E9ED',
        },
      },
      fontFamily: {
        // Lato para todo — el manual exige una sola familia tipográfica.
        // Mantengo los alias para no romper componentes existentes.
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        lato: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        outfit: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #B9DB5C 0%, #5BB89A 30%, #2BB3B2 60%, #2C6FB1 100%)',
        'brand-gradient-vertical':
          'linear-gradient(180deg, #B9DB5C 0%, #2BB3B2 50%, #2C6FB1 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, rgba(185,219,92,0.10) 0%, rgba(43,179,178,0.10) 50%, rgba(44,111,177,0.10) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
