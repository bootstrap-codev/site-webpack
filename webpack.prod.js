const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
	devtool: 'source-map',

	entry: {
		index: './src/assets/scripts/app.js',
		//about: './src/assets/scripts/about.js',
	},

	output: {
		filename: '[name].[fullhash:20].js',
		path: buildPath,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
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

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			chunks: ['index'],
			filename: 'index.html',
		}),
		/*
		new HtmlWebpackPlugin({
			template: './src/about.html',
			inject: 'body',
			chunks: ['about'],
			filename: 'about.html',
		}),
		*/
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [{ from: './src/assets/images', to: './assets/images' }],
		}),
	],

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin()],
	},
};
