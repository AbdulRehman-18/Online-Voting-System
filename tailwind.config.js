/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
      },
      colors: {
        background: '#030303',
        surface: '#0A0A0B',
        'surface-dark': '#070708',
        primary: {
          DEFAULT: '#FF3D8A',
          50: '#FFE5EE',
          100: '#FFCCE0',
          200: '#FF99C1',
          300: '#FF66A3',
          400: '#FF3D8A',
          500: '#FF0066',
          600: '#CC0052',
          700: '#99003D',
          800: '#660029',
          900: '#330014',
        },
        accent: {
          DEFAULT: '#7000FF',
          50: '#F2E6FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#7000FF',
          600: '#5A00CC',
          700: '#430099',
          800: '#2D0066',
          900: '#160033',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.08) 0%, rgba(255, 61, 138, 0.08) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #030303 0%, #0A0A0B 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        gradient: 'gradient 8s linear infinite',
        marquee: 'marquee 20s linear infinite',
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(112, 0, 255, 0.15)',
        'glow-md': '0 0 30px -8px rgba(112, 0, 255, 0.2)',
        'glow-lg': '0 0 40px -10px rgba(112, 0, 255, 0.25)',
      },
    },
  },
  plugins: [],
};