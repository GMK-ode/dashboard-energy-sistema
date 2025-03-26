/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      // Breakpoints para TV
      screens: {
        'tv-sm': '1280px',
        'tv': '1920px',
        'tv-lg': '2560px',
        'tv-4k': '3840px',
      },
      
      // Tamanhos usando suas variáveis de fonte
      fontSize: {
        'tv-xs': ['var(--font-size-xs)', 'var(--line-height-xs)'],
        'tv-sm': ['var(--font-size-sm)', 'var(--line-height-sm)'],
        // ... outros tamanhos
      },
      
      // Espaçamento proporcional
      spacing: {
        'tv-sm': '1.25rem',
        'tv': '1.5rem',
        'tv-lg': '2rem',
      },
      
      // Animações
      animation: {
        'move-infinite': 'move-infinite 28s linear infinite',
      },
    },
  },
  plugins: [
    // Suporte ao tema dark
    function({ addVariant }) {
      addVariant('dark', '&:is(.dark *)');
    },
    
    // Plugin para foco em TV
    function({ addUtilities }) {
      const tvFocus = {
        '.tv-focus': {
          'outline': 'none',
          'box-shadow': '0 0 0 4px var(--ring)',
        },
        '@screen tv': {
          '.tv-focus': {
            'box-shadow': '0 0 0 8px var(--ring)',
          },
        },
      }
      addUtilities(tvFocus)
    },
  ],
}