module.exports = {
  entry: "./js/main.js",
  output: {
    path: "./js",
    filename: "bundle.js"
  },
  devtool: 'source-map',
};

// NOTE: `context` and `path` are relative to this config file.
