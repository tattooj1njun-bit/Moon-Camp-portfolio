/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        moon: {
          canvas: '#F7F0E4',
          paper: '#FFFDF5',
          cream: '#F3E4CC',
          creamSoft: '#FBF4E9',
          line: '#DED2C2',
          ink: '#2E2A23',
          muted: '#756D62',
          wood: '#C99A61',
          woodDeep: '#9B6D3F',
          woodSoft: '#E6CBA2',
          blue: '#AFC7D8',
          blueDeep: '#5F7F90',
          orange: '#EAA45C',
          orangeDeep: '#B8662C',
          sage: '#A7B89D',
          sageDeep: '#6F8568',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(46, 42, 35, 0.08)',
        lift: '0 18px 42px rgba(46, 42, 35, 0.13)',
        line: 'inset 0 0 0 1px rgba(46, 42, 35, 0.09)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 18% 16%, rgba(234, 164, 92, 0.18), transparent 28rem), radial-gradient(circle at 84% 8%, rgba(175, 199, 216, 0.24), transparent 25rem), radial-gradient(circle at 78% 70%, rgba(167, 184, 157, 0.18), transparent 25rem), linear-gradient(135deg, #FFFDF5 0%, #F7F0E4 48%, #F3E4CC 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        connectPulse: {
          '0%, 100%': { opacity: '0.42', transform: 'scaleX(0.92)' },
          '50%': { opacity: '0.9', transform: 'scaleX(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 760ms ease both',
        floatSoft: 'floatSoft 5s ease-in-out infinite',
        connectPulse: 'connectPulse 3.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
