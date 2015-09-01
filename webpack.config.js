var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss      = require('precss');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}

module.exports = {
    entry: {
        app: getEntrySources(['./src/js/main'])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: './dist/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'jsx', 'babel'],
                exclude: /node_modules/
            },{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!postcss-loader!sass")
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new ExtractTextPlugin('dist/style.css', {
            allChunks: true
        })
    ]
};