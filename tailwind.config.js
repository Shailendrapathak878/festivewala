/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#24113D',
          royal: '#45216B',
          light: '#F3ECFA',
          gold: '#D4AF37',
          'gold-light': '#F2D98B',
          champagne: '#F2D98B',
          ivory: '#FAF7F0',
          white: '#FFFFFF',
          dark: '#21182A',
          muted: '#766D7D',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'royal': '0 12px 32px -8px rgba(36, 17, 61, 0.28)',
        'card-luxury': '0 4px 20px -2px rgba(36, 17, 61, 0.05), 0 2px 6px -1px rgba(36, 17, 61, 0.03)',
        'card-luxury-hover': '0 20px 40px -6px rgba(36, 17, 61, 0.12), 0 8px 16px -2px rgba(36, 17, 61, 0.06)',
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
