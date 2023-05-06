const prettierPluginTailwindcss = require("prettier-plugin-tailwindcss")

module.exports = {
    "singleQuote": true,
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": false,
    "endOfLine": "auto",
    "tailwindConfig": './tailwind.config.js',
    "plugins": [prettierPluginTailwindcss]
}