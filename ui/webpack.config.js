module.exports = {
  entry: "./index.jsx",
  context: __dirname + "/app/assets/js",
  devServer: {
    contentBase: __dirname +  "/dist",
    compress: true,
    port: 9000
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  "module": {
    "loaders": [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}