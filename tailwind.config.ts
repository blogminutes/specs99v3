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
        gray: {
          100: "#f1f1f1",
          200: "#e1e1e1",
          // Define other shades of gray as needed
        },
      },
      backgroundColor: {
        "bg-primary": "#fff",
      },
      boxShadow: {
        "primary-md": "1px 1px 8px rgba(0,0,0,.15)",
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
      backgroundImage: {
        glassWater:
          "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
        // brand: "linear-gradient(to right, #a1ffce,rgba(0,0,0,0) 30%, #faffd1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
