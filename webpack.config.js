
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const devtool = process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map';

const assets = [
    {
        from: 'static/',
        to: '[path][name][ext]',
    },
];

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?[tj]sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { "legacy": true }],
                        ],
                        presets: [
                            '@babel/preset-typescript',
                            '@babel/preset-env',
                        ],
                    }
                },
            },
            {
                test: /\.(svg|mp4|png)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash:8].[ext]',
                        esModule: false,
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },
    mode,
    node: false,
    devtool,
    entry: {
        polyfills: path.join(__dirname, 'src', 'polyfills.ts'),
        main: path.join(__dirname, 'src', 'index.ts'),
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, 'build'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: assets,
        }),
    ],
};

