/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
=======
  content: ["./src/**/*.{html,js}"],
  darkMode: "className",
>>>>>>> ahmed
  theme: {
    extend: {},
  },
  plugins: [require(getDaisyUI())],
 
};

function getDaisyUI() {
  return "daisyui";
}
