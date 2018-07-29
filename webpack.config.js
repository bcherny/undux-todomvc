let {
  resolve
} = require('path')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let DIST = resolve(__dirname, './dist')

let config = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: DIST,
    compress: true,
    https: false,
    port: 8081,
    disableHostCheck: true
  },
  entry: './src/index.tsx',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  output: {
    filename: 'bundle.js',
    path: DIST
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ]
  }
}

if (process.env.NODE_ENV !== 'development') {
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          keep_classnames: true,
          keep_fnames: true,
          mangle: false
        },
      }),
    ],
  }
}

module.exports = config