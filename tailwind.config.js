/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#001428',
        'primary-container': '#0f2942',
        'on-primary': '#ffffff',
        'on-primary-container': '#7991af',
        background: '#f8f9ff',
        'on-background': '#0b1c30',
        surface: '#f8f9ff',
        'surface-bright': '#f8f9ff',
        'surface-dim': '#cbdbf5',
        'surface-variant': '#d3e4fe',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#43474d',
        outline: '#74777e',
        'outline-variant': '#c3c6ce',
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFBE82',
          dark: '#99732B',
          warm: '#B8860B',
          // Tom de texto com contraste AA (>= 4.5:1) sobre fundos claros
          ink: '#8A6420',
          subtle: '#FBF7EE',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Jakarta Fallback"', 'Arial', 'sans-serif'],
      },
      spacing: {
        13: '3.25rem',
      },
      scale: {
        102: '1.02',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
