var ejs = require('ejs');
var fs = require('fs');
var config = require('./../../views/config');
var path = require('path');
//临时默认数据
var defaultData = {
    "baseSetting": {
        //网站title
        "title": "后台管理",
        //网站说明
        "keywords": "一个快速生成的后台管理",
        //网站seo关键字
        "description": "后台管理,后台,生成",
        //网站图标
        "favicon": ""
    },
    "request": {
        "requestUrl": "http://localhost:8000",
        "imageUrl": "http://localhost:8000",
        "headers": {
            
        }
    }
};

module.exports = function (page, callback) {
    moduleInit(page, function (res) {
        callback(true,res);
    });
    //模块初始化
    function moduleInit(options, back) {
        var moduleInfo = config[options.template];
        options = Object.assign({}, moduleInfo.default, options);
        if (options.type == "html") {
            var num = 0;
            var html = "";
            readFile(moduleInfo.path, options, function (res) {
                html += res;
                moduleInit({ template: "header", ...defaultData.baseSetting }, function (childRes) {
                    html = childRes + html;
                    num++;
                    if (num >= 2) {
                        back(html);
                    }
                });
                moduleInit({ template: "footer",...defaultData.request }, function (childRes) {
                    html += childRes;
                    num++;
                    if (num >= 2) {
                        back(html);
                    }
                });
            });
        } else if (options.type == "module") {
            readFile(moduleInfo.path, options, function (res) {
                back(res);
            });
        }
    };
    //获取模板
    function readFile(url, options, back) {
        if (!url) {
            console.error("url为空");
            return;
        };
        console.log(options);
        ejs.renderFile(path.join(__dirname, './../..', url), options, options, function (err, str) {
            console.log(err);
            if (err) {
                callback(false, err);
            } else {
                back( str);
            }
        });
    }
};