/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        damping: {
          bg: '#E4E4FF',
          primary: '#FB5EA8',
          ink: '#000000',
        },
      },
      borderRadius: {
        '24': '24px',
      },
    },
  },
  plugins: [],
};
