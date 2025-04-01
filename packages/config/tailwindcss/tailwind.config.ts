import animate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';

import type { Config } from 'tailwindcss';
import type { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';
import { fontClasses } from './fontClasses';

const config: Omit<Config, 'content'> = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  darkMode: ['class'],
  content: [
    'src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/dashboard/src/**/*.{ts,tsx}',
    '../../packages/themes/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1440px',
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
          20: 'var(--primary-20)',
          50: 'var(--primary-50)',
          100: 'hsl(var(--primary-100))',
          600: 'hsl(var(--primary-600))',
        },

        neutral: {
          20: 'hsl(var(--neutral-20))',
          50: 'hsl(var(--neutral-50))',
          100: 'hsl(var(--neutral-100))',
          300: 'hsl(var(--neutral-300))',
          600: 'hsl(var(--neutral-600))',
          800: 'hsl(var(--neutral-800))',
          900: 'hsl(var(--neutral-900))',
        },
        negative: {
          50: 'hsl(var(--negative-50))',
          500: 'hsl(var(--negative-500))',
          600: 'hsl(var(--negative-600))',
        },
        tertiary: {
          50: 'hsl(var(--tertiary-50))',
          800: 'hsl(var(--tertiary-800))',
        },
        positive: {
          50: 'hsl(var(--positive-50))',
          500: 'hsl(var(--positive-500))',
          600: 'hsl(var(--positive-600))',
        },
        turquoise: {
          500: 'hsl(var(--turquoise-500))',
        },
        violet: {
          500: 'hsl(var(--violet-500))',
        },
        orange: {
          50: 'hsl(var(--orange-50))',
          500: 'hsl(var(--orange-500))',
        },
        pink: {
          500: 'hsl(var(--pink-500))',
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
        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))',
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          50: 'hsl(var(--warning-50))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          50: 'hsl(var(--info-50))',
          500: 'hsl(var(--info-500))',
          600: 'hsl(var(--info-600))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },

      backgroundImage: {
        'auth-background': 'var(--auth-background)',
        'learning-gradient': 'var(--learning-path-background)',
        'ai-feature-gradient': 'var(--ai-feature-background)',
        'launchpad-gradient': 'var(--launchpad-background)',
        'footer-gradient': 'var(--footer)',
        'course-search-gradient': 'var(--course-search-background)',
        'ai-more-feature-gradient': 'var(--ai-more-feature-background)',
        'ai-gradient': 'var(--ai-assistant-background)',
      },
      borderRadius: {
        default: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)',
        md: 'calc(var(--radius) + 2px)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        primary: ['var(--font-primary)', ...fontFamily.sans],
        secondary: ['var(--font-secondary)', ...fontFamily.sans],
        sub: ['var(--font-sub)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'infinite-scroll': 'infinite-scroll linear infinite',

        fadeIn: 'fadeIn 0.1s ease-in',
      },
      boxShadow: {
        'shadow-1': '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
        'shadow-2': '0px 4px 16px 0px rgba(0, 0, 0, 0.16)',
        'shadow-3': '0px 8px 24px 0px rgba(0, 0, 0, 0.12)',
        'shadow-4': '0px 8px 32px 0px rgba(0, 0, 0, 0.2)',
        'shadow-5': '0px 20px 68px 0px rgba(128, 144, 155, 0.25)',
        'shadow-6': '0px 0px 6px 0px rgba(0, 0, 0, 0.05)',
        'shadow-7': '0px 4px 30px 0px #F4F5F6',
        'shadow-8': '0px 10px 30px 0px rgba(196, 198, 242, 0.30)',
      },
    },
  },
  plugins: [
    animate,
    (plugin: PluginAPI) => {
      plugin.addVariant(
        'supports-backdrop-blur',
        '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
      );
      plugin.addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)');
      plugin.addVariant('children', '& > *');
      plugin.addVariant('scroll-bar', '&::-webkit-scrollbar');
      plugin.addVariant('scroll-bar-track', '&::-webkit-scrollbar-track');
      plugin.addVariant('scroll-bar-thumb', '&::-webkit-scrollbar-thumb');
      plugin.addUtilities({
        '.scrollbar': {
          '@apply scroll-bar:w-2 scroll-bar:h-2 scroll-bar:bg-transparent scroll-bar-track:bg-foreground/5 scroll-bar-thumb:rounded scroll-bar-thumb:bg-foreground/20 scroll-bar-track:rounded':
            {},
        },
      });
      plugin.addUtilities(fontClasses as unknown as CSSRuleObject);
    },
  ],
};

export default config;
