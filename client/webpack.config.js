const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),

      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }),


      new WebpackPwaManifest({
        //example from webpack-pwa-manifest NPM Documentation --- placeholder
        name: 'Progressive Web Application: Text Editor',
        short_name: 'PWA Txt Edit',
        description: 'A PWA text editor that runs in the browser',
        background_color: '#ffffff',
        crossorigin: '', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            size: '500x500'
          },
        ]
          }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
