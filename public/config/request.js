
/**
  request模块
**/
layui.define(['layer'], function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var $ = layui.$;
    var http = {
        //请求地址
        requestUrl: "/",
        //文件上传
        fileUrl: "/",
        //默认请求头
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        //默认配置
        config: {
            //是否提示--默认提示
            isPrompt: true,
            //是否显示请求动画
            load: true,
            //是否使用处理数据模板
            isFactory: true
        },
        //用户信息
        userInfo: {},
        get: function (url, data, options, callback) {
            var requestInfo = this.getDefault(url, options, "GET");
            this.request(requestInfo, data, callback);
        },
        post: function (url, data, options, callback) {
            var requestInfo = this.getDefault(url, options, "POST");
            this.request(requestInfo, data, callback);
        },
        //默认模板
        dataFactory: function (options, resolve) {
            var _this = this;
            //设置回调默认值
            var callback = {
                success: false,
                result: ""
            };
            //判断数据是否请求成功
            if (resolve.result == 0) {
                callback.success = true;
                callback.result = resolve.data;
            } else if (resolve.result == 10403) { //code == 10403 是用户未登录
                var content = '您还未登录，请先登录!';
                if (_this.userInfo.token) {
                    content = '您的登录已失效，请重新登录!';
                }
                layer.confirm(content, { icon: 3, title: '提示' }, function (index) {
                    layer.close(index);
                    location.href = "login.html";
                });
            } else { //其他错误提示
                if (options.isPrompt) {
                    layer.msg(resolve.msg);
                }
                callback.result = resolve.data;
            }
            return callback;
        },
        // 获取默认信息
        getDefault: function (url, options, method) {
            //判断url是不是链接
            var urlType = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/.test(url);
            var httpUrl;
            if (method == "file") {
                httpUrl = urlType ? url : this.fileUrl + url;
            } else {
                httpUrl = urlType ? url : this.requestUrl + url;
            };
            var config = this.modifyJson(options, this.config);
            //请求地址
            config.httpUrl = httpUrl;
            config.method = method;
            //请求头
            config.headers = this.modifyJson(options.headers, this.headers);
            return config;
        },
        request: function (options, data, callback) {
            var _this = this;
            var index;
            $.ajax({
                type: options.method,
                url: options.httpUrl,
                data: data,
                dataType: "json",
                headers: options.headers,
                beforeSend: function (xml) {
                    // xml.setRequestHeader("", "");
                    if (options.load) {
                        index = layer.load(1);
                    }
                },
                complete: function () {
                    if (options.load) {
                        layer.close(index);
                    }
                },
                success: function (result) {
                    var factoryInfo = _this.dataFactory(options, result);
                    if (factoryInfo.success) {
                        callback(result);
                    }
                }
            });
        },
        /**
         * json数据去重合并
         */
        modifyJson: function (json, oldJson) {
            if (!json) {
                return oldJson;
            }
            if (!oldJson) {
                return json;
            }
            if (typeof json !== "object") {
                json = JSON.parse(json);
            }
            if (typeof oldJson !== "object") {
                oldJson = JSON.parse(oldJson);
            }

            var jsonData = {};
            for (var i in oldJson) {
                jsonData[i] = oldJson[i];
            }
            for (var j in json) {
                jsonData[j] = json[j];
            }

            return jsonData;
        }
    };
    //输出test接口
    exports('$http', http);
}); 