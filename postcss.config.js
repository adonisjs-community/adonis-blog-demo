const path = require('path')
const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    tailwindcss(path.join(__dirname, './tailwind.config.js'))
  ]
}
