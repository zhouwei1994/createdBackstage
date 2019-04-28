var viewRend = require('./../app/module/viewRend');
module.exports = function (router, check) { 
    //登录页面
    router.get('/login', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type','text/html');
        var login = {
            //模板名称
            template: "login",
            pageType:"page",
            forget: {
                page: "忘记密码",
                path:"forget.html"
            },
            projectName:"一个后台管理",
            registered: false,
            supplier: false,
            children: {
                title: "",
                name: "表单模块",
                content:[
                    {
                        template: "loginInput",
                        title: "用户名",
                        name: "username",
                        placeholder:"用户名",
                        icon: "layui-icon-username",
                        verify: "required",
                    },
                    {
                        template: "loginInput",
                        title: "密码",
                        name: "password",
                        placeholder:"密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                    },
                    {
                        template: "imgLoginInput",
                        title: "验证码",
                        placeholder:"验证码",
                        name: "code",
                        icon: "layui-icon-vercode",
                        codeUrl: "/user/setCode",
                        verify: "required",
                    }
                ]
            },
            md5: ["password"],
            children1: {
                title: "",
                name: "提交按钮模块",
                content: [
                    {
                        template: "request",
                        requestUrl: "/user/login",
                        data:"data",
                        method:"post",
                        children: {
                            title: "",
                            name: "请求结果模块",
                            content: [
                                {
                                    template: "alert",
                                    content: "'登录成功！'",
                                    // children: {
                                    //     title: "",
                                    //     name: "弹窗关闭执行",
                                    //     content: [
                                    //         {
                                    //             template: "router",
                                    //             routerType: "page",
                                    //             routerUrl:"main"
                                    //         }
                                    //     ]
                                    // }
                                }
                            ]
                        },
                    }
                ]
            },
            submit: {
                requestUrl: "/user/login",
            }
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({},false,html);
                console.error(html);
            }
        });
    }));
};