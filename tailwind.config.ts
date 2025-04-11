import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#BE1E2D",
          light: "#BE1E2D/90",
          dark: "#BE1E2D/80",
        },
        secondary: {
          DEFAULT: "#D4B996",
          light: "#D4B996/20",
        },
        dark: {
          DEFAULT: "#333333",
          light: "#333333/70",
        },
        light: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
