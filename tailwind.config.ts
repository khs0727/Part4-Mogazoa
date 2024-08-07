import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [{ pattern: /text-tagColor-\d+/ }, { pattern: /bg-tagBgColor-\d+/ }],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // add color
        black: {
          400: '#2E2E3A',
          450: '#252530',
          500: '#21212A',
          600: '#17171C',
        },
        white: '#F1F1F5',
        gray: {
          500: '#9FA6B2',
          600: '#6E6E82',
          650: '#353542',
          700: '#333233',
        },
        blue: '#5097FA',
        indigo: '#5363FF',
        yellow: '#FFC83C',
        green: '#05D58B',
        greenBg: '#23362f',
        BgBlack: '#1C1C22',
        pink: '#FF2F9F',
        pinkBg: '#3c2631',
        red: '#FF0000',
        tagColor: {
          '0': '#C5D17C',
          '1': '#F75532',
          '2': '#A952FF',
          '3': '#49AF1A',
          '4': '#D676C1',
          '5': '#FF7E46',
          '6': '#23B581',
          '7': '#FD529A',
          '8': '#747AFF',
          '9': '#3098E3',
          '10': '#FFBB00',
          '11': '#76C7C0',
          '12': '#7FFF00',
          '13': '#DC143C',
          '14': '#9400D3',
          '15': '#00BFFF',
        },
        tagBgColor: {
          '0': '#2D2E2B',
          '1': '#322124',
          '2': '#2A2138',
          '3': '#202A22',
          '4': '#2E2532',
          '5': '#322626',
          '6': '#1C2B2C',
          '7': '#32212E',
          '8': '#252538',
          '9': '#1E2836',
          '10': '#33312D',
          '11': '#2A2E2F',
          '12': '#1E2D22',
          '13': '#32202B',
          '14': '#2A2132',
          '15': '#1E2832',
        },
      },
      gradation: 'linear-gradient(to right, #5097FA, #5363FF)',
      // fill button
      backgroundImage: (theme) => ({
        gradation: 'linear-gradient(to right, #5097FA, #5363FF)',
        'gradation-hover': 'linear-gradient(to right, #353542, #353542)',
        'gradation-secondary': 'linear-gradient(to right, #5097FA, #5363FF)',
        'gradation-secondary-hover': 'linear-gradient(to right, #3a8bfc, #2b40fd)',
      }),
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'], // hover 변형을 추가
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
