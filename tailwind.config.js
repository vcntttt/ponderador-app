import { Colors } from "./constants/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: Colors.light.primary,
          background: Colors.light.background,
          text: Colors.light.text,
        },
        dark: {
          primary: Colors.dark.primary,
          background: Colors.dark.background,
          text: Colors.dark.text,
        },
      },
      fontFamily: {
        inter: ['Inter_400Regular', 'Inter_600SemiBold', 'Inter_700Bold']
      }
    },
  },
  plugins: [],

};
