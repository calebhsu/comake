/* The MIT License (MIT)
 * Copyright (c) 2015 Ali Al Dallal
 * This file is part of react-webpack-babel which is released under the MIT license.
 * See https://github.com/alicoding/react-webpack-babel/blob/master/LICENSE for full license details.
 */

var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var BabiliPlugin = require("babili-webpack-plugin");

// global css files
loaders.push({
	test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
	loader: ExtractTextPlugin.extract('style', 'css')
});
// local scss modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.scss/,
	exclude: /(node_modules|bower_components|public)/,
	loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
});
// local css modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.css/,
	exclude: /(node_modules|bower_components|public)/,
	loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
});
// 3D viewer
loaders.push({
	test: /\.json$/,
	loader: 'json',
});

module.exports = {
	entry: [
		'./src/index.jsx'
	],
	output: {
		path: path.join(__dirname, '..', 'public'),
		filename: '[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	node: {
		fs: 'empty',
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new BabiliPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin('[contenthash].css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'CoMake'
		}),
		new webpack.optimize.DedupePlugin(),
	]
};
