const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');

function getAllHbsRootFiles() {
    const files = fs.readdirSync('./src/views/').filter(file => file.match(/.hbs$/));

    return files.map(file => {
        return new HtmlWebpackPlugin({
                    template: `./src/views/${file}`,
                    filename: `./${ file.replace('.hbs', '.html') }`,
                    // templateParameters: require('./src/data/index.json'),
                    minify: false,
                    inject: false,
                })

    })
}

/** общий файл настроек **/

module.exports = {
    entry: {
        /** точка входа **/
        app: './src/index.ts',
    },
    output: {
        /** вывод **/
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, '../../','public'),
        // chunkFilename: '[name].[ext]'
    },
    module: {
        rules: [
            /** обработка scss и css файлов **/
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    // Compiles Sass to CSS
                    { loader: "sass-loader", },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './src/scss/core/wanted.scss'
                        }
                    },
                ],
            },
            /** babel **/
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            /** handlebars loader **/
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [
                        path.join(__dirname, 'src/views')
                    ],
                }
            },
        ],
    },
    plugins: [
        /** выносим все стили с js в css файл **/
        new MiniCssExtractPlugin(),
        /** делаем переменную React доступной по всем файлам **/
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
        /** собераем html files **/
        // ...getAllHbsRootFiles(),
        // new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    }
};