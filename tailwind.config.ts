import { nextui } from '@nextui-org/react';
import { Config } from 'tailwindcss/types/config';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        show: 'show .2s linear 1',
        blink: 'blink 1s linear infinite',
      },
      keyframes: {
        show: {
          '0%': { opacity: '0' },
        },
        blink: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '51%': { opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['var(--font-orbitron)'],
        mono: ['var(--font-orbitron)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '0.25rem',
          medium: '0.5rem',
          large: '0.75rem',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#000000',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#ffffff',
              foreground: '#000000',
            },
            success: '#1CFE17',
            warning: '#FFB119',
            danger: '#FF2323',
            divider: '#A0A0A0',
          },
        },
      },
    }),
  ],
} as Config;
