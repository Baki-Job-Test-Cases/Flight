import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
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
                validationError: '#db1717',
                purple: '#4a1c97',
                sky: '#65A7FC',
            },
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
            backgroundImage: {
                login: "url('@/assets/login.jpg')",
                register: "url('@/assets/register.jpg')",
                hotel: "url('@/assets/hotel.png')",
                rent: "url('@/assets/rent.jpg')",
                travel: "url('@/assets/travel.webp')",
                'airline-banner': "url('@/assets/airline-banner.png')",
                'airline-icon': "url('@/assets/airline-icon.png')",
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwind-scrollbar'),
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.visually-hidden': {
                    position: 'absolute',
                    border: '0px',
                    width: '1px',
                    height: '1px',
                    padding: '0px',
                    margin: '-1px',
                    overflow: 'hidden',
                    clipPath: 'inset(0 0 100% 100%)',
                    'white-space': 'nowrap',
                    'overflow-wrap': 'normal',
                },
                '.popover-content-width-same-as-its-trigger': {
                    width: 'var(--radix-popover-trigger-width)',
                    'max-height': 'var(--radix-popover-content-available-height)',
                },
            });
        }),
    ],
};
