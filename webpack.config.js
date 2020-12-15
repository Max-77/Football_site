const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            // {
            //     test: /\.webm$/,
            //     use: {
            //         loader: "html-loader",
            //         options: {
            //             attrs: [":src"]
            //         }
            //     }
            // },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webm$/],
                //loader: require.resolve('file-loader'),
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    devServer: {
        overlay: true,
        contentBase: './dist',
        open: true
    }
};