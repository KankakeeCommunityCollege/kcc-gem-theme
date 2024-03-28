process.traceDeprecation = true;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackHashFilePlugin = require('./buildtools/WebpackHashFilePlugin'); // Our custom plugin found in `/buildtools`
const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : '[name].[fullhash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[fullhash].css',
  }),
  new WebpackHashFilePlugin({
    path: '../_includes/hash/',
    fileName: 'theme_hash.yml'
  }), // HASH IS USED TO KICK-OFF JEKYLL
];

const config = {
  mode: devMode ? 'development' : 'production',
  plugins,
  entry: {
    'bootstrap': './assets/js/src/bootstrap.js',
    'kcc-theme': './assets/js/src/all.js',
    'translate': './assets/js/src/translate.js',
    'kcc-theme-landing': './assets/js/landing/main.js'
  },
  output: {
    filename: '[name].[fullhash].bundle.js',
    path: path.resolve(__dirname, 'assets', 'js', 'dist'),
    publicPath: 'auto', // MUST BE 'auto' FOR THEME!! Otherwise, bundles will alway's point to the root's JS and not local
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {  // Do not let css-loader resolve `url()`s
              url: false, // Will throw errors when trying to resolve url() for local assets if set to default (true)
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Cache the babel compilation // Cached files are stored & gzipped in `/node_modules/.cache/babel-loader/`
            // Set a custom `cacheIdentifier: '<my_custom_cache_identifier>',` SHOULD you need to manually bust the babel-loader cache.
          },
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/i,
        type: 'asset/resource'
      },
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
}

module.exports = config;
