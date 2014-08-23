module.exports = {
  resolve: {
    root: [
      __dirname,
      __dirname + "/src",
      "node_modules",
      "bower_components"
    ],
        extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.jsx',
      '.js.jsx'
    ]
  },
  entry: "entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },

  devtool: 'eval-source-map',

  module: {
    loaders: [
      { test: /\.jsx?/, loader: "jsx-loader" }
    ]
  }
};
