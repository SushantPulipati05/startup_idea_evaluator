module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#F5F6FB', dark: '#0E0F1A' },
        card: { DEFAULT: '#FFFFFF', dark: '#1A1C2C' },
        ink: { DEFAULT: '#11142D', dark: '#F2F3FA' },
        muted: { DEFAULT: '#6B7085', dark: '#9A9DB5' },
        line: { DEFAULT: '#E4E6F0', dark: '#2A2D42' },
        brand: { DEFAULT: '#6C5CE7', dark: '#8B7CFF' },
        soft: { DEFAULT: '#ECE9FF', dark: '#2A2550' },
        field: { DEFAULT: '#FFFFFF', dark: '#22243A' },
        podium: '#1F1300',
      },
      fontFamily: {
        poppins: ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
      },
    },
  },
  plugins: [],
};
