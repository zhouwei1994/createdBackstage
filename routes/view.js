var viewRend = require('./../app/module/viewRend');
module.exports = function (router, check) { 
    //登录页面
    router.get('/login.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type','text/html');
        var login = {
            //模板名称
            template: "login",
            pageType:"page",
            forget: {
                title: "忘记密码？",
                path:"forget.html"
            },
            projectName:"一个后台管理",
            registered: {
                title: "去注册",
                path:"registered.html"
            },
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
                        data: "data",
                        method: "post",
                        resultName: "login",
                        storeData:"{userInfo:res}",
                        children: {
                            title: "",
                            name: "请求结果模块",
                            content: [
                                {
                                    template: "alert",
                                    content: "'登录成功！'",
                                    children: {
                                        title: "",
                                        name: "弹窗关闭执行",
                                        content: [
                                            {
                                                template: "router",
                                                routerType: "page",
                                                routerUrl:"main.html"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({},2001,html);
                console.error(html);
            }
        });
    }));
    //忘记密码页面
    router.get('/forget.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type','text/html');
        var login = {
            //模板名称
            template: "login",
            pageType:"page",
            submitText:"找回密码",
            projectName:"忘记密码",
            registered: false,
            forget: {
                title: "已有账号？去登录",
                path:"login.html"
            },
            supplier: false,
            children: {
                title: "",
                name: "表单模块",
                content:[
                    {
                        template: "loginInput",
                        title: "手机号",
                        name: "phone",
                        placeholder:"手机号",
                        icon: "layui-icon-cellphone",
                        verify: "required|phone",
                    },
                    {
                        template: "phoneLoginInput",
                        title: "短信验证码",
                        placeholder:"短信验证码",
                        name: "code",
                        icon: "layui-icon-vercode",
                        verify: "required",
                        requestUrl: "/searchFriend",
                        phoneInputName:"phone",
                        method: "get",
                        phoneVerify:[
                            {
                                rule: "!/^1\\d{10}$/",
                                prompt: "手机号格式不正确"
                            }
                        ]
                    },
                    {
                        template: "loginInput",
                        title: "新密码",
                        inputType:"password",
                        name: "password",
                        placeholder:"新密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                    },
                    {
                        template: "loginInput",
                        title: "确认密码",
                        name: "confirmPassword",
                        inputType:"password",
                        placeholder:"确认密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                        comparedList: [
                            {
                                name: "password",
                                prompt:"两次密码不一致"
                            }
                        ]
                    },
                ]
            },
            md5: ["password","confirmPassword"],
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
                                    content: "'密码找回成功！'",
                                    children: {
                                        title: "",
                                        name: "弹窗关闭执行",
                                        content: [
                                            {
                                                template: "router",
                                                routerType: "page",
                                                routerUrl:"login.html"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({},2001,html);
                console.error(html);
            }
        });
    }));
    //注册页面
    router.get('/registered.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type','text/html');
        var login = {
            //模板名称
            template: "login",
            pageType:"page",
            submitText:"立即注册",
            projectName:"注册",
            registered: false,
            forget: {
                title: "已有账号？去登录",
                path:"login.html"
            },
            supplier: false,
            children: {
                title: "",
                name: "表单模块",
                content:[
                    {
                        template: "loginInput",
                        title: "手机号",
                        name: "phone",
                        placeholder:"手机号",
                        icon: "layui-icon-cellphone",
                        verify: "required|phone",
                    },
                    {
                        template: "phoneLoginInput",
                        title: "短信验证码",
                        placeholder:"短信验证码",
                        name: "code",
                        icon: "layui-icon-vercode",
                        verify: "required",
                        requestUrl: "/searchFriend",
                        phoneInputName:"phone",
                        method: "get",
                        phoneVerify:[
                            {
                                rule: "!/^1\\d{10}$/",
                                prompt: "手机号格式不正确"
                            }
                        ]
                    },
                    {
                        template: "loginInput",
                        title: "密码",
                        inputType:"password",
                        name: "password",
                        placeholder:"密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                    },
                    {
                        template: "loginInput",
                        title: "确认密码",
                        name: "confirmPassword",
                        inputType:"password",
                        placeholder:"确认密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                        comparedList: [
                            {
                                name: "password",
                                prompt:"两次密码不一致"
                            }
                        ]
                    },
                ]
            },
            md5: ["password","confirmPassword"],
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
                                    content: "'注册成功！'",
                                    children: {
                                        title: "",
                                        name: "弹窗关闭执行",
                                        content: [
                                            {
                                                template: "router",
                                                routerType: "page",
                                                routerUrl:"main.html"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({},2003,html);
                console.error(html);
            }
        });
    }));
    //主页面
    router.get('/main.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type','text/html');
        var login = {
            //模板名称
            template: "main",
            pageType: "page",
            projectName: "后台管理",
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({},2004,html);
                console.error(html);
            }
        });
    }));
};