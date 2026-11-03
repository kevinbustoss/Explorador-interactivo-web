/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0b0c10',
          card: '#1f2833',
          border: '#45a29e',
          neon: '#66fcf1',
          accent: '#c5c6c7',
          portal: '#9bf00b'
        }
      },
      boxShadow: {
        'portal-glow': '0 0 20px #9bf00b',
        'neon-glow': '0 0 15px #66fcf1'
      }
    },
  },
  plugins: [],
}