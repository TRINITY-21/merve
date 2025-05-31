/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['JosefinSans_400Regular'],    
        'light': ['JosefinSans_300Light'],
        'medium': ['JosefinSans_500Medium'],
        'semibold': ['JosefinSans_600SemiBold'],
        'bold': ['JosefinSans_700Bold'],
      },
    },
  },
  plugins: [],
}