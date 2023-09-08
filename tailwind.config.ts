/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["sans-serif", ...fontFamily.sans],
      },
      colors: {
        gray: colors.neutral,
      },
    },
  },
  plugins: [],
} satisfies Config;
