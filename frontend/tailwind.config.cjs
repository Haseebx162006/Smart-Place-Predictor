module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Swiss Palette: Stark B&W with Electric Orange
                primary: {
                    DEFAULT: '#FF4D00', // Electric Orange
                    50: '#FFF0E6',
                    100: '#FFD6C2',
                    200: '#FFAD8F',
                    300: '#FF855C',
                    400: '#FF4D00',
                    500: '#E64500',
                    600: '#CC3D00',
                    700: '#B33600',
                    800: '#802600',
                    900: '#4D1700',
                },
                slate: {
                    50: '#F7F7F7', // Very light gray for backgrounds
                    100: '#E5E5E5', // Light gray for borders
                    200: '#D4D4D4',
                    300: '#A3A3A3',
                    400: '#737373',
                    500: '#525252',
                    600: '#404040',
                    700: '#262626',
                    800: '#171717',
                    900: '#000000', // Pure Black
                    950: '#000000',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'], // Clean, objective
                display: ['Space Grotesk', 'system-ui', 'sans-serif'], // Technical/Brutalist
            },
            borderRadius: {
                'none': '0',
                'sm': '0',
                DEFAULT: '0',
                'md': '0',
                'lg': '0',
                'xl': '0',
                '2xl': '0',
                '3xl': '0',
                'full': '9999px', // Keep full for pill buttons if needed, but mostly sharp
            },
            boxShadow: {
                'brutal': '4px 4px 0px 0px #000000',
                'brutal-lg': '8px 8px 0px 0px #000000',
                'brutal-hover': '2px 2px 0px 0px #000000',
            }
        },
    },
    plugins: [],
}
