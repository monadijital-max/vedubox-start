import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8f9ff',
        histudy: {
          beige: '#fcf9f5',
          coral: '#383FD8',
          coralDark: '#252ac9',
          sand: '#f5efe8',
          slate: '#2c333f',
          leaf: '#4a90e2',
        },
        'on-background': '#0b1c30',
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          variant: '#d3e4fe',
          tint: '#4149e0',
          'lowest': '#ffffff',
          'low': '#eff4ff',
          'container': '#e5eeff',
          'high': '#dce9ff',
          'highest': '#d3e4fe',
        },
        'on-surface': '#0b1c30',
        'on-surface-variant': '#454555',
        'inverse-surface': '#213145',
        'inverse-on-surface': '#eaf1ff',
        outline: {
          DEFAULT: '#767687',
          variant: '#c6c5d8',
        },
        primary: {
          DEFAULT: '#383fd8',
          on: '#ffffff',
          container: '#535bf1',
          'on-container': '#f3f1ff',
          fixed: '#e0e0ff',
          'fixed-dim': '#bfc2ff',
          'on-fixed': '#01006e',
          'on-fixed-variant': '#252ac9',
        },
        secondary: {
          DEFAULT: '#712ae2',
          on: '#ffffff',
          container: '#8a4cfc',
          'on-container': '#fffbff',
          fixed: '#eaddff',
          'fixed-dim': '#d2bbff',
          'on-fixed': '#25005a',
          'on-fixed-variant': '#5a00c6',
        },
        tertiary: {
          DEFAULT: '#7a4c00',
          on: '#ffffff',
          container: '#9b6200',
          'on-container': '#fff0e3',
          fixed: '#ffddb8',
          'fixed-dim': '#ffb95f',
          'on-fixed': '#2a1700',
          'on-fixed-variant': '#653e00',
        },
        error: {
          DEFAULT: '#ba1a1a',
          on: '#ffffff',
          container: '#ffdad6',
          'on-error-container': '#93000a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',     // 4px
        DEFAULT: '0.5rem',  // 8px
        md: '0.75rem',     // 12px
        lg: '1rem',        // 16px
        xl: '1rem',        // 16px (Updated as requested)
        '2xl': '1.5rem',   // 24px
        full: '9999px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        gutter: '20px',
        'margin-mobile': '16px',
        'margin-desktop': '40px',
      },
      boxShadow: {
        'soft-sm': '0px 2px 10px rgba(0, 0, 0, 0.02)',
        'soft-md': '0px 4px 20px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0px 8px 30px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0px 16px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
