const webpack = require("webpack");
const path = require("path");
const base = {
  entry: {
    home: path.join(__dirname, "../public/js/home.js")
  },
  output: {
    filename: "js/[name].js",
    path: path.join(__dirname, "../dist") //必须是绝对路径
  },
  module: {
  }
};
module.exports = base;
