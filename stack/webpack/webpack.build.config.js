//定义编译环境
const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf')
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.base.config');
module.exports = function(){
  console.log(13214323434);
  //删除之前的包
  rimraf(path.join(path.resolve(__dirname, "../dist")), err => {
    if (err) throw err;
    //执行webpack
    webpack(merge(webpackConfig),
      function (err, stats) {
        if (err) throw err
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