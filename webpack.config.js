module.exports = {
  entry: __dirname + "/src/index.ts",
  mode: 'development',
  output: {
      path: __dirname + "/output",
      filename: "index.js",
  },
  resolve: {
      extensions: ['.ts', '.js']
  },
  module: {
      rules: [
          {
              test: /\.ts$/,
              use: {
                  loader: 'ts-loader'
              }
          }
      ]
  },
  devtool: 'none'
}