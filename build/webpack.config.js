const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const lintConfig = require('../tslint.json')
const isDebug = process.env.DEBUG || false

module.exports = (async() => {
  
  const base = {
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  
    devtool: isDebug ? 'source-map' : '',
  
    target: 'web',
  
    node: {
      __dirname: false,
      __filename: true,
    },
  
    resolve: {
      extensions: [ '.ts', '.js'],
      modules: [
        path.join(__dirname, '../node_modules'),
      ],
    },
  
    module: {
      loaders: [
        {
          test: /\.ts/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'tslint-loader',
          options: {
            configuration: lintConfig,
          },
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, '../tsconfig.json'),
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        },
      ],
    },
  
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
  
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../manifest.json'),
        to: path.resolve(__dirname, '../dist/manifest.json'),
        force: true,
        toType: 'file',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../assets'),
        to: path.resolve(__dirname, '../dist/assets'),
        force: true,
        toType: 'dir',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../src/_locales'),
        to: path.resolve(__dirname, '../dist/_locales'),
        force: true,
        toType: 'dir',
        ignore: ['.*']
      }]),
    ],
  }
  
  const client = {
    entry: {
      app: path.resolve(__dirname, '../src/index.ts'),
    },
  }
  const popup = {
    entry: {
      popup: path.resolve(__dirname, '../src/popup/index.ts'),
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/popup/index.html'),
        filename: 'popup.html',
      }),
    ],
  }
  const options = {
    entry: {
      options: path.resolve(__dirname, '../src/options/index.ts'),
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/options/index.html'),
        filename: 'options.html',
      }),
    ],
  }
  return [webpackMerge(base, client), webpackMerge(base, popup)]
})()

