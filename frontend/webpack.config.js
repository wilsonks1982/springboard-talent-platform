const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const fs = require("fs");

// Load .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
const envPath = path.resolve(__dirname, envFile);

let envVars = {};
if (fs.existsSync(envPath)) {
  const result = dotenv.config({ path: envPath });
  envVars = result.parsed || {};
}

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_BASE_URL": JSON.stringify(
        envVars.REACT_APP_API_BASE_URL ||
          process.env.REACT_APP_API_BASE_URL ||
          "http://localhost:8080/api/v1",
      ),
      "process.env.REACT_APP_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
