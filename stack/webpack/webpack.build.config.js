//定义编译环境
const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf')
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.base.config');
module.exports = function (options) {
  console.log(path.join(__dirname, "../.." + options.outputPath));
  //删除之前的包
  rimraf(path.join(path.resolve(__dirname, "../.." + options.outputPath)), err => {
    if (err) {
      console.log(err);
      return false;
    };
    //执行webpack
    webpack(merge(webpackConfig(options)),
      function (err, stats) {
        console.log(err,stats);
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
          console.log('生成失败，出现错误.\n');
          process.exit(1)
        }
        console.log('打包完成.\n');
      });
  });
};