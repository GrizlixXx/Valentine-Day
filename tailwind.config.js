/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', // усі html файли в корені
    './src/**/*.{html,js}', // якщо є папка src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
