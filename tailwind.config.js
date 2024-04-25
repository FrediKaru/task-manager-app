/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "1fr 4fr",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: "#21212d",
      secondary: "#2C2C38",
      gray: "#838b98",
      purple: "#645fc6",
      midnight: "#121063",
      metal: "#565584",
      todo: "#3ab7bf",
      list0: "#645fc2",
      list1: "#3ab7bf",
      list2: "#3a11cf",
      list3: "#22b7bf",
      list4: "#3ab3cf",
      doing: "#645fc6",
      done: "#3EB489",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
    },
  },
  plugins: [],
};
