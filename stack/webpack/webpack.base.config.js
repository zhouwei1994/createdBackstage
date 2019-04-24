const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html引擎
module.exports = function (options) {
  return {
    entry: {
      home: path.join(__dirname, "../../public/js/home.js")
    },
    output: {
      filename: "js/[name].js",
      path: path.join(__dirname, "../.." + options.outputPath) //必须是绝对路径
    },
    module: {
      rules: [
        
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "测试测试",
        keywords: "说明说明说明说明说明说明说明说明",
        // description:"关键字关键字关键字关键字关键字关键字关键字关键字",
        showErrors: true,
        hash: true,
        inject: 'body',
        template: path.join(__dirname, "../index.html"),
        filename: "./index.html", // 输出html文件的路径
        favicon:path.join(__dirname, "../favicon.ico"),
        minify:{
            caseSensitive: false, //是否大小写敏感
            removeComments:true, // 去除注释
            removeEmptyAttributes:true, // 去除空属性
            collapseWhitespace: true //是否去除空格
        }
      })
    ]
  };
};
