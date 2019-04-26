var viewRend = require('./../app/module/viewRend');
module.exports = function (router, check) { 
    //登录页面
    router.get('/login', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type','text/html');
        var login = {
            //模板名称
            template: "login",
            forget: {
                page: "忘记密码",
                path:"forget.html"
            },
            registered: false,
            supplier: false,
            children: [
                {
                    //模板名称
                    template: "login",
                }
            ]
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.send(html);
            } else {
                console.error(html);
            }
        });
    }));
};