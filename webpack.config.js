var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/app.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('app.css')
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            options: {
                presets: ['react-hmre']
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
      }]
    }
}
