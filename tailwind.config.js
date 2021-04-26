const colors = require('tailwindcss/colors')

module.exports = {
    //mode: "jit",
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                colliersCyan: {
                    400: '#11B0C8',
                },
                colliersGray: {
                    300: '#E5EAF4',
                    400: '#A9B1BD',
                }
            },
            fontFamily: {
                'poppins': ['Poppins'],
            }
        },
    },
    variants: {
        extend: {
            borderWidth: ['hover'],
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
}
