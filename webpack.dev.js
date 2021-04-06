const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/assets/scripts/app.js',
		// about: './src/about.js',
	},
	devServer: {
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['index'],
			filename: 'index.html',
		}),
		/*
		new HtmlWebpackPlugin({
			template: './src/about.html',
			inject: true,
			chunks: ['about'],
			filename: 'about.html'
		}),
		*/
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				test: /\.(png|svg|jpg|gif|jpe?g)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
			{
				test: /\.(eot|woff|ttf)$/,
				use: ['url-loader'],
			},
		],
	},
};
