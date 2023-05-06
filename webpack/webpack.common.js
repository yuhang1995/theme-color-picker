const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const srcDir = '../src/'
const publicDir = '../public/'

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + '/pages/popup'),
        content: path.join(__dirname, srcDir + '/pages/content'),
        options: path.join(__dirname, srcDir + '/pages/options'),
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }],
                                ["@babel/preset-react"]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "tailwindcss",
                                    "autoprefixer",
                                    [
                                        'postcss-prefix-selector',
                                        {
                                            prefix: '#theme-color-picker-content',
                                        }
                                    ]
                                ],
                            },
                        }
                    }
                ],
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                },
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.join(__dirname, srcDir),
            '@public': path.join(__dirname, publicDir),
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
        }),
        new CopyPlugin({
            patterns: [
                { from: path.join(__dirname, publicDir + 'manifest.json'), to: '../manifest.json' },
                { from: path.join(__dirname, publicDir + 'html'), to: '../html' },
                { from: path.join(__dirname, publicDir + 'img'), to: '../img' },
            ],
        }),
    ],
}
