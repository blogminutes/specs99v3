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
        "bg-primary": "#EFF5F5",
      },
      boxShadow: {
        "primary-sm": "5px 5px 8px #dce1e1,-5px -5px 8px #ffffff",
        "primary-xsm": "1.5px 1.5px 4px #dce1e1, -1.5px -1.5px 4px #ffffff",
        "form-input-primary":
          "inset 2px 2px 3px #e0e0e9, inset -2px -2px 3px #ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
