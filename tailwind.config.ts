import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors
                'boxing-red': '#D50000',
                'boxing-black': '#212121',
                'steel-gray': '#757575',

                // Secondary Colors
                'clean-white': '#FFFFFF',
                'accent-gold': '#FFD700',

                // Text Colors
                'body-text': '#333333',
                'caption-text': '#757575',
            },
            fontFamily: {
                'primary': ['Barlow', ...defaultTheme.fontFamily.sans],
                'accent': ['Bebas Neue', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                // Font Hierarchy
                'h1': ['36px', {
                    lineHeight: '1.2',
                    fontWeight: '700', // Bold
                }],
                'h2': ['28px', {
                    lineHeight: '1.25',
                    fontWeight: '700', // Bold
                }],
                'h3': ['22px', {
                    lineHeight: '1.3',
                    fontWeight: '600', // Semibold
                }],
                'h4': ['18px', {
                    lineHeight: '1.4',
                    fontWeight: '600', // Semibold
                }],
                'body': ['16px', {
                    lineHeight: '1.5',
                    fontWeight: '400', // Regular
                }],
                'small': ['14px', {
                    lineHeight: '1.5',
                    fontWeight: '400', // Regular
                }],
                'button': ['18px', {
                    lineHeight: '1.4',
                    fontWeight: '700', // Bold
                }],
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'button': '0 4px 6px -1px rgba(213, 0, 0, 0.4), 0 2px 4px -1px rgba(213, 0, 0, 0.06)',
            },
            borderRadius: {
                'card': '0.5rem',
                'button': '0.25rem',
            },
            spacing: {
                'section': '5rem',
                'element': '2.5rem',
            },
            backgroundImage: {
                'hero-pattern': "linear-gradient(rgba(33, 33, 33, 0.7), rgba(33, 33, 33, 0.7)), url('/images/hero-bg.jpg')",
                'cta-pattern': "linear-gradient(rgba(213, 0, 0, 0.9), rgba(213, 0, 0, 0.9)), url('/images/cta-bg.jpg')",
            },
        },
    },
    plugins: [
        forms,
        typography,
        aspectRatio,
    ],
}

export default config