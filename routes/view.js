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
            children: [
                {
                    //模板名称
                    template: "loginInput",
                    title: "用户名",
                    name: "username",
                    placeholder:"用户名",
                    icon:"layui-icon-username"
                },
                {
                    //模板名称
                    template: "imgLoginInput",
                    title: "验证码",
                    placeholder:"验证码",
                    name: "code",
                    icon: "layui-icon-code",
                    codeUrl:"/user/setCode"
                }
            ],
            children1: [
                {
                    //模板名称
                    template: "loginInput",
                    title: "用户名q",
                    name: "username",
                    placeholder:"用户名q",
                    icon:"layui-icon-username"
                },
                {
                    //模板名称
                    template: "loginInput",
                    title: "验证码q",
                    placeholder:"验证码q",
                    name: "username",
                    icon:"layui-icon-username"
                }
            ]
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                console.error(html);
            }
        });
    }));
};