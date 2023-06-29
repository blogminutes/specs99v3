import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      text: {},
      colors: {
        primary: "#e3cb74",
        secondary: "#7cb567",
        "grey-primary": "#343a40",
        "grey-medium": "#495057",
        "grey-light": "#868e96",
      },
      backgroundColor: {
        "bg-primary": "#fff",
      },
      boxShadow: {
        "primary-sm": "2px 2px 6px rgba(0,0,0,.1)",
        "primary-xsm": "2px 2px 8px rgba(0,0,0,.08)",
        "form-input-primary":
          "inset 1px 1px 2px rgba(0,0,0,.1), inset -2px -3px 3px rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
} satisfies Config;
