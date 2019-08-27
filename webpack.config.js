const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  plugins: [htmlPlugin],
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
        loader: ["style-loader","css-loader"]
      },
    ]
  }
};
