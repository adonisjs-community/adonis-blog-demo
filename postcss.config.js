const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postCSSImport = require('postcss-import')
const postCSSNested = require('postcss-nested')
const purgeCSS = require('@fullhuman/postcss-purgecss')

const isProduction = process.env.NODE_ENV === 'production'

const productionPlugins = [
	purgeCSS({
		content: ['./resources/views/**/*.edge'],
		whitelist: ['body', 'html'],
		whitelistPatterns: [],
		defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
	}),
];

module.exports = {
	plugins: [
		postCSSImport(),
		tailwind(),
		postCSSNested(),
		autoprefixer(),
	].concat(isProduction ? productionPlugins : []),
}
