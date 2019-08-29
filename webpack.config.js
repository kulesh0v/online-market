const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const plugins = [
  new CopyWebpackPlugin([
    path.resolve(__dirname, './client/index.html')
  ]),
];

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  plugins: plugins,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        loader: ["style-loader", "css-loader"]
      },
    ]
  }
};
