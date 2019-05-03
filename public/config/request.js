
/**
  request模块
**/
layui.define(['layer'], function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var $ = layui.$;
    console.log(layui);
    var setter = layui.setter;
    var http = {
        //默认配置
        config: {
            //是否提示--默认提示
            isPrompt: true,
            //是否显示请求动画
            load: true,
            //是否使用处理数据模板
            isFactory: true
        },
        //全局数据
        data: {},
        getStoreData:function() {
            var globalData = localStorage.getItem("globalData");
            console.log(globalData);
            if (globalData) {
                this.data = JSON.parse(globalData);
            }
        },
        //储存数据
        setData:function(data) {
            if (data && data instanceof Object) {
                this.data = this.modifyJson(data, this.data);
                localStorage.setItem("globalData",JSON.stringify(this.data));
            } else {
                layer.msg("储存的数据格式不正确，格式为：json",{icon:5});
            }
        },
        get: function (url, data, options, callback,errCallback) {
            var requestInfo = this.getDefault(url, options, "GET");
            this.request(requestInfo, data, callback,errCallback);
        },
        post: function (url, data, options, callback,errCallback) {
            var requestInfo = this.getDefault(url, options, "POST");
            this.request(requestInfo, data, callback,errCallback);
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
            if (resolve[setter.response.statusName] == setter.response.statusCode.ok) {
                callback.success = true;
                callback.result = resolve[setter.response.dataName];
            } else if (resolve[setter.response.statusName] == setter.response.statusCode.logout) { //code == 10403 是用户未登录
                var content = '您还未登录，请先登录!';
                if (_this.data[setter.request.tokenName]) {
                    content = '您的登录已失效，请重新登录!';
                }
                layer.confirm(content, { icon: 5, title: '提示' }, function (index) {
                    layer.close(index);
                    location.href = "login.html";
                });
            } else { //其他错误提示
                if (options.isPrompt) {
                    layer.msg(resolve[setter.response.msgName],{icon:5});
                }
                callback.result = resolve[setter.response.dataName];
            }
            return callback;
        },
        // 获取默认信息
        getDefault: function (url, options, method) {
            //判断url是不是链接
            var urlType = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/.test(url);
            var httpUrl;
            if (method == "file") {
                httpUrl = urlType ? url : setter.request.fileUrl + url;
            } else {
                httpUrl = urlType ? url : setter.request.requestUrl + url;
            };
            var config = this.modifyJson(options, this.config);
            //请求地址
            config.httpUrl = httpUrl;
            config.method = method;
            //请求头
            config.headers = this.modifyJson(options.headers, setter.request.headers);
            return config;
        },
        request: function (options, data, callback,errCallback) {
            var _this = this;
            var index;
            console.log(options,data);
            $.ajax({
                type: options.method,
                url: options.httpUrl,
                data: data,
                dataType: "json",
                headers: options.headers,
                beforeSend: function (xml) {
                    var token = this.data[setter.request.tokenName];
                    if (token) {
                        xml.setRequestHeader(setter.request.tokenName, token);
                    }
                    if (options.load) {
                        index = layer.load(2);
                    }
                },
                complete: function (xml) {
                    if (options.load) {
                        layer.close(index);
                    }
                },
                success: function (result, status, xhr) {
                    var factoryInfo = _this.dataFactory(options, result);
                    if (factoryInfo.success) {
                        var token = xhr.getResponseHeader(setter.request.tokenName);
                        if (token) {
                            _this.setData({
                                [setter.request.tokenName]:token
                            });
                        }
                        callback(factoryInfo.result);
                    } else {
                        errCallback && errCallback(result);
                    }
                },
                error: function (err) {
                    errCallback && errCallback(err);
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
    http.getStoreData();
    //输出test接口
    exports('$http', http);
}); 