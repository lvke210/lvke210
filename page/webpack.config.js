// 2021/11/29

const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./main.js", //入口文件
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"), // 必须绝对路径
  },
  target: "web",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "/"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      // 完整写法
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: "css-loader"
      //     },
      //   ],
      // },
      // 简写
      // {
      //   test: /\.css$/,
      //   // loader: "css-loader",
      //   use: ["style-loader", "css-loader"], //多个
      // },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader", // 兼容
          },
        ],
      },
      // 两种处理方式 实际使用会结合两个
      // {
      //   test: /\.(png|gif|jpe?g|svg)$/,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "static/[name].[hash:4][ext]",
      //   },
      // },
      // {
      //   test: /\.(png|gif|jpe?g|svg)$/,
      //   type: "asset/inline",
      // },
      // {
      //   test: /\.(png|gif|jpe?g|svg)$/,
      //   generator: {
      //     filename: "static/[name].[hash:4][ext]",
      //   },
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 30 * 1024,
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(), //每次打包先清空dist
    new HtmlWebpackPlugin({
      title: "112旅客 | 天地逆旅 光阴过客",
      template: "./index.html",
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "./public",
    //       to: "./dist",
    //     },
    //   ],
    // }),
  ],
};
