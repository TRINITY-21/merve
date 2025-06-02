/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#FFCC00',
        secondary: '#1E3A5F',
        secondaryLight: '#FFF8E1',
        accent: '#00BFA5',
        background: '#F5F5F5',
        white: '#FFFFFF',
        black: '#000000',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        card: '#FFFFFF',

        gray: {
          light: '#E0E0E0',
          medium: '#9E9E9E',
          dark: '#616161',
        },

        text: {
          primary: '#212121',
          secondary: '#757575',
          light: '#FFFFFF',
          white: '#FFFFFF',
        },

        vendor: {
          mtn: '#FFCC00',
          vodafone: '#E60000',
          airteltigo: '#FF0066',
        },

        shadow: {
          light: 'rgba(0, 0, 0, 0.1)',
          medium: 'rgba(0, 0, 0, 0.2)',
          dark: 'rgba(0, 0, 0, 0.3)',
        },

        glow: '#FFD700',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0px 2px 4px rgba(0,0,0,0.1)',
        md: '0px 4px 6px rgba(0,0,0,0.1)',
        lg: '0px 10px 15px rgba(0,0,0,0.1)',
        xl: '0px 20px 25px rgba(0,0,0,0.15)',
        '2xl': '0px 25px 50px rgba(0,0,0,0.25)',
        glow: '0 0 10px #FFD700',
      },
      fontFamily: {
        sans: ['JosefinSans_400Regular'],
        light: ['JosefinSans_300Light'],
        medium: ['JosefinSans_500Medium'],
        semibold: ['JosefinSans_600SemiBold'],
        bold: ['JosefinSans_700Bold'],
      },
    },
  },
  plugins: [],
}