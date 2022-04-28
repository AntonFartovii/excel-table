const path = require('path') // модуль
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = (env, args) => { // module.exports = {
    const isProd = process.env.NODE_ENV === 'production'
    const isDev = !isProd
    const filename = ext => isProd ? `[name].[contenthash].${ext}`:`[name].bundle.${ext}`
    const plugins = () =>{
        const base = [
                new HTMLWebpackPlugin({
                    template:'./index.html'
                }),
                new CopyWebpackPlugin({
                    patterns: [{
                        from: path.resolve(__dirname, 'src/favicon.ico' ),
                        to: path.resolve(__dirname, 'dist' )
                    }]
                }),
                new MiniCssExtractPlugin({
                    filename: filename('css')
                }),
                new CleanWebpackPlugin(),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                })
            ]

        if (isDev) {
            base.push(new ESLintPlugin())
        }

        return base
    }
    return{
        target: 'web', // для авто перезагр стр
        context: path.resolve(__dirname, 'src'), // указываем папку с исходниками
        resolve: {
            extensions: [//
                '.js'
            ], alias: {
                '@': path.resolve(__dirname, 'src'), // когда мы пишем символ @ нас перенаправляет в папку SRC
                '@core': path.resolve(__dirname, 'src/core'),
            }
        },
        entry: {
            main: ['@babel/polyfill','./index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js')
            // filename: '[name].bundle.js'
        },
        plugins: plugins(),

        devServer: {
            port: '3000',
            // watchContentBase: true
            // open: true,
            // hot: true,
        },
        devtool: isDev ? 'source-map': false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/, // пропустить папку для обработки
                    // use: jsLoaders()
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                        // options: babelOptions()
                    }
                },
            ]
        }
    }

}
