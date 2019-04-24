const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html引擎
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = function (options) {
  var webSetting = {};
  if (options.title && typeof options.title == "string") {
    webSetting.title = options.title;
  } else {
    webSetting.title = "后台管理";
  }
  if (options.keywords && typeof options.keywords == "string") {
    webSetting.keywords = options.keywords;
  }
  if (options.description && typeof options.description == "string") {
    webSetting.description = options.description;
  }
  if (options.favicon && typeof options.favicon == "string") {
    webSetting.favicon = options.favicon;
  } else {
    webSetting.favicon = path.join(__dirname, "../favicon.ico");
  }
  return {
    entry: {
      app: path.join(__dirname, './../main.js')
    },
    output: {
      filename: "js/[name].js",
      path: path.join(__dirname, "../.." + options.outputPath) //必须是绝对路径
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'env']
            }
          },  
          include: [path.join(__dirname, "../../")]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.join(__dirname, "../../"),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        ...webSetting,
        showErrors: true,
        hash: true,
        inject: 'body',
        template: path.join(__dirname, "../index.html"),
        filename: "./index.html", // 输出html文件的路径
        chunks: ["app"],
        minify: {
          caseSensitive: false, //是否大小写敏感
          removeComments: true, // 去除注释
          removeEmptyAttributes: true, // 去除空属性
          collapseWhitespace: true //是否去除空格
        }
      }),
      new VueLoaderPlugin()
    ]
  };
};
