const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// Our function that generates our html plugins
// More info: https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/
function generateHtmlPlugins(templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

    return templateFiles
        .filter(filePath => {
            let parts = filePath.split(".");

            // if filename has name and extension
            return 2 === parts.length;
        })
        .map(filePath => {
            // Split names and extension
            let parts = filePath.split("."),
                name = parts[0],
                extension = parts[1];

            // Create new HtmlWebpackPlugin with options
            return new HtmlWebpackPlugin({
                filename: `${name}.html`,
                template: path.resolve(
                    __dirname,
                    `${templateDir}/${name}.${extension}`
                ),
                templateParameters: require("./src/static/db/data.js")
            });
        });
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins("./src/templates");

module.exports = {
    devtool: "eval-cheap-module-source-map",
    entry: "./src/index.js",
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    // Please note we are not running postcss here
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: "[path][name].[ext]?hash=[hash:20]",
                            limit: 8192
                        }
                    }
                ]
            },
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            },
            {
                test: /\.part.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin([{ from: "src/static", to: "static" }]),
        new VueLoaderPlugin()
    ]

        // We join our htmlPlugin array to the end
        // of our webpack plugins array.
        .concat(htmlPlugins)
};
