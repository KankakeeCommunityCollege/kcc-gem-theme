process.traceDeprecation = true;
const path = require('path');
const HashPlugin = require('hash-webpack-plugin'); // HASH IS USED TO KICK-OFF JEKYLL (BY DEFAULT: JEKYLL UPDATES THE `_site` BUILD WHENEVER THERES A CHANGE IN ITS `_data` DIR!!!)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'production',
  watch: true,
  //entry: path.join(__dirname, 'webpack', 'main'),
  entry: {
    'kcc-theme': './assets/js/theme/src/all.js',
    'kcc-theme-landing': './assets/js/theme/landing/landing.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/assets/js/theme/dist/',
    path: path.resolve(__dirname, 'assets', 'js', 'theme', 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      }
    ]
  },
  plugins: [
    new HashPlugin({ path: './_data/', fileName: 'theme_hash.yml' }), // HASH IS USED TO KICK-OFF JEKYLL
    new CleanWebpackPlugin({ path: './assets/js/theme/dist/' })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
};

module.exports = config;
