module.exports = {
  entry: "./src/App.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new (require("html-webpack-plugin"))({
      template: "./public/index.html",
    }),
  ],
};
