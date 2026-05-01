const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
    "pvp-lobby": "./src/js/pvp-lobby.js",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "public/javascript"),
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    }),
  ],
};
