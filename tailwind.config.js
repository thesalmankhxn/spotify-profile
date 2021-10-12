module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xxxl: { max: "1480px" },
        xxl: { max: "1280px" },
        xl: { max: "1200px" },
        lg: { max: "1080px" },
        md: { max: "980px" },
        xmd: { max: "920px" },
        xxmd: { max: "780px" },
        sm: { max: "540px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
