/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          foreground: '#FFFFFF',
        },
        background: {
          DEFAULT: '#0A0A0F',
          secondary: '#111827',
          tertiary: '#18181B',
        },
        card: {
          DEFAULT: '#1E293B',
          hover: '#25334B',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        border: {
          DEFAULT: '#27272A',
          light: '#3F3F46',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 60px -15px rgba(124, 58, 237, 0.4)',
      }
    },
  },
  plugins: [],
}
