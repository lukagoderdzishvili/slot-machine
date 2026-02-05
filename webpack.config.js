const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";


module.exports = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? false : "source-map",

  entry: "./src/main.ts",

  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]"
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp3|ogg|json|atlas)$/i,
        type: "asset/resource"
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    }),
  ],

devServer: {
  static: [
    {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
    },
    {
      directory: path.resolve(__dirname, "src/assets"),
      publicPath: "/assets",
    },
  ],
  port: 8080,
  open: true,
  hot: true,
}
};
