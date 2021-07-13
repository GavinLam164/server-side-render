
const path = require('path')
module.exports = {
	mode: 'development',
	entry: './browser.jsx',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, '/bundle')
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json']
	}
}