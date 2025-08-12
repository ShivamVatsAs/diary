/** @type {import('tailwindcss').Config} */
module.exports = {
  // This 'content' array tells Tailwind which files to scan for class names.
  // It will look at all .js, .jsx, .ts, and .tsx files inside the 'src' directory.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // The 'extend' object allows us to add custom values to Tailwind's default theme
    // without overwriting them completely.
    extend: {
      // We can define custom colors, fonts, etc., here to match our romantic theme.
      colors: {
        'soft-pink': '#FFF8F9',
        'warm-pink': '#FCE7F3',
        'accent-pink': '#F472B6',
      },
      fontFamily: {
        // Adding a custom font for headings to give it a personal, handwritten feel.
        // You would need to import this font in your public/index.html file.
        'display': ['"Dancing Script"', 'cursive'],
      }
    },
  },
  plugins: [],
}