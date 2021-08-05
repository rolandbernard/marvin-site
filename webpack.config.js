
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const devtool = process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map';

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
    {
        from: path.resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
        to: 'vendor',
    },
    {
        from: path.resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
        to: 'vendor/bundles',
    },
    {
        from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: 'vendor',
    },
];

const assets = [
    {
        from: 'static/',
        to: '',
    },
];

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(woff2|svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
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
    entry: path.join(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [...polyfills, ...assets],
        }),
    ],
};

