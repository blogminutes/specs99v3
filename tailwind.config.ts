import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "",
        secondary: "",
      },
      backgroundColor: {
        primary: "#f1f1fa",
      },
      boxShadow: {
        "primary-sm": "5px 5px 12px #d9d9e1, -5px -5px 12px #ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
