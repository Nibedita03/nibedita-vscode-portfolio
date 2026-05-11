/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1E1E1E', // Classic VS Code Dark
          sidebar: '#252526',
          activityBar: '#333333',
          statusBar: '#007ACC',
          text: '#CCCCCC',
          textDark: '#858585',
          activeTab: '#1E1E1E',
          inactiveTab: '#2D2D2D',
          tabBorder: '#252526',
          accent: '#007ACC', // Classic blue
          hover: '#2A2D2E',
          border: '#3C3C3C'
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
        sans: ['"Playfair Display"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
