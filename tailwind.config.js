/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxsm: { max: "480px" },
        xsm: { max: "540px" },
        sm: { max: "640px" },
        md: { max: "780px" },
        lg: { max: "1080px" },
        xl: { max: "1200px" },
        "2xl": { max: "1480px" },

        "min-xxsm": { min: "480px" },
        "min-xsm": { min: "540px" },
        "min-sm": { min: "640px" },
        "min-md": { min: "780px" },
        "min-lg": { min: "1080px" },
        "min-xl": { min: "1200px" },
        "min-2xl": { min: "1480px" },
      },
      colors: {
        green: "#1DB954",
        "off-green": "#1ed760",
        blue: "#509bf5",
        "nav-black": "#040306",
        black: "#181818",
        white: "#FFFFFF",
        "lightest-grey": "#b3b3b3",
        "light-grey": "#9B9B9B",
        grey: "#404040",
        "dark-grey": "#282828",
      },
      fontFamily: {
        primary: [
          "Circular Std",
          "system",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      fontSize: {
        base: "16px",
        xs: "12px",
        sm: "14px",
        md: "20px",
        lg: "24px",
        xl: "28px",
        "2xl": "32px",
      },
      spacing: {
        base: "20px",
        xs: "5px",
        sm: "10px",
        md: "30px",
        lg: "50px",
        xl: "100px",
      },
      transitionTimingFunction: {
        "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
        "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "ease-in-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "ease-in-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
        "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      width: {
        nav: "100px",
      },
      height: {
        nav: "70px",
      },
    },
  },
  plugins: [],
};

export default config;
