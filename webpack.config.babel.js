import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
    entry: {
        'jquery.simpleSelect': './jquery.simpleSelect'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].min.js"
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].min.css',
            allChunks: true
        })
    ]
};
