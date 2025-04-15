/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#494949",
        secondary: "#8E8E8E",
        accent: "#335BF8",
        white: "#EBEBEB",
        black: "#212121",
      }
    },
  },
  plugins: [],
}
