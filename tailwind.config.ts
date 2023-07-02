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
        // "bg-primary": "#f1f3f5",
      },
      boxShadow: {
        "primary-sm": "2px 2px 8px rgba(0,0,0,.08)",
        "primary-xsm": "2px 2px 8px rgba(0,0,0,.08)",
        "form-input-primary":
          "inset 1px 1px 2px rgba(0,0,0,.1), inset -2px -3px 3px rgba(0,0,0,.03)",
        "input-autofill": "inset 4px 150px 11px #fff,inset -0px -0px 11px #fff",
        // "primary-sm": "6px 6px 10px #e0e2e4,-6px -6px 10px #ffffff",
        // "primary-xsm": "3px 3px 6px #e0e2e4, -3px -3px 10px #ffffff",
        // "form-input-primary":
        //   "inset 2px 2px 3px #e0e2e4, inset -2px -2px 3px #ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
