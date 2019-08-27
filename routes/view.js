var viewRend = require('./../app/module/viewRend');
//引入redis
var redis = require('./../app/module/redis');
var config = require('./../views/config');
module.exports = function (router, check) {
    //新建项目
    router.post('/create/project', check(["baseSetting", "request", "response", "verifyList", "pages"], function (req, res) {
        console.log(req)
        try {
            let pages = JSON.parse(req.body.pages);
            var query = {
                baseSetting: JSON.parse(req.body.baseSetting),
                request: JSON.parse(req.body.request),
                response: JSON.parse(req.body.response),
                verifyList: JSON.parse(req.body.verifyList),
                pages: pages,
            }
            redis.set("project:" + req.headers.user_id, JSON.stringify(query)).then(data => {
                res.result("pages/" + req.headers.user_id + "/" + pages[0].pageName + ".html");
            }, err => {
                res.result({}, 2002, err);
            });
        } catch (error) {
            return res.result({}, 2001, error);
        }
    }));
    //页面浏览
    router.get('/pages/:project_id/:name', check([], function (req, res) {
        if (req.params.project_id) {
            if (req.params.name) {
                var name = req.params.name.split(".");
                console.log(name);
                if (name[1] == "html") {
                    redis.get("project:" + req.params.project_id).then(data => {
                        data = JSON.parse(data);
                        let page = {};
                        data.pages.forEach(item => {
                            if (item.pageName == name[0]) {
                                page = item;
                            }
                        });
                        viewRend({
                            baseSetting: data.baseSetting,
                            request: data.request,
                            response: data.response,
                            verifyList: data.verifyList,
                            page: page,
                            mode: "edit"
                        }, function (state, html) {
                            if (state) {
                                //设置html请求头
                                res.set('Content-Type', 'text/html');
                                res.end(html.templateHtml);
                            } else {
                                res.result({}, 2001, html);
                            }
                        });
                    }, err => {
                        res.result({}, 2002, err);
                    });
                } else {
                    res.result({}, 2000, "未知的页面类型");
                }
            } else {
                res.result({}, 404, "未找到页面");
            }
        } else {
            res.result({}, 404, "未找到页面");
        }
    }));
    //获取页面列表
    router.get('/create/pages/list', check([], function (req, res) {
        redis.get("project:" + req.headers.user_id).then(data => {
            data = JSON.parse(data);
            res.result(data.pages);
        }, err => {
            res.result({}, 2002, err);
        });
    }));
    //获取模板信息列表
    router.get('/create/pages/template', check(["type"], function (req, res) {
        let templateList = [];
        Object.keys(config).forEach((key) => {
            if (req.query.type == "") {
                templateList.push({
                    templateName: key,
                    title: config[key].title,
                    type: config[key].type,
                    filterTerm: config[key].filterTerm
                });
            } else {
                var filterTerm = config[key].filterTerm;
                if (filterTerm.includes(req.query.type)) {
                    templateList.push({
                        templateName: key,
                        title: config[key].title,
                        type: config[key].type,
                        filterTerm: config[key].filterTerm
                    });
                }
            }
        });
        res.result(templateList);
    }));
    //创建页面
    router.post('/create/pages/add', check(["title", "name", "pageType"], function (req, res) {
        if (req.body.pageType == 2000 || req.body.templateName) {
            redis.get("project:" + req.headers.user_id).then(data => {
                data = JSON.parse(data);
                let pageInfo = {
                    pageName:req.body.name,
                    pageTitle: req.body.title,
                    children: {},
                };
                var parameter;
                if (req.body.pageType == 1000) {
                    pageInfo.pageType = "page"
                    pageInfo.template = req.body.templateName;
                    parameter = config[req.body.templateName].parameter;
                    parameter.forEach(item => {
                        if (item.defaultShow == 1000 || item.defaultShow == 3000) {
                            if (item.defaultValue) {
                                pageInfo[item.name] = item.defaultValue;
                            } else {
                                if (item.type == "string") {
                                    pageInfo[item.name] = "";
                                } else if (item.type == "array") {
                                    pageInfo[item.name] = [];
                                } else if (item.type == "object") {
                                    pageInfo[item.name] = {};
                                } else if (item.type == "number") {
                                    pageInfo[item.name] = 0;
                                }
                            }
                        } 
                    });
                } else {
                    pageInfo.pageType = "childPage"
                }
                data.pages.push(pageInfo);

                res.result({
                    data: pageInfo,
                    parameter: parameter || [],
                    options: {
                        verifyList:data.verifyList,
                        baseSetting:data.baseSetting
                    }
                });
            }, err => {
                res.result({}, 2002, err);
            });
        } else {
            res.result({}, 999, "请选择页面模板");
        }
    }));
};