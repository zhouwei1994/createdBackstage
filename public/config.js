var config = {
    "baseSetting": {
        //网站title
        "title": "后台管理",
        //网站说明
        "keywords": "一个快速生成的后台管理",
        //网站seo关键字
        "description": "后台管理,后台,生成",
        //网站图标
        "favicon":""
    },
    "pages": [
        {
            "id": "login-465134694",
            "module": "login",
            "logo":"",
            "name":"",
            "children": [
                {
                    "id": "input-465134694",
                    "module": "input",
                    "placeholder": "请输入用户名",
                    "inputType": "text",
                    "disabled": true,
                    "value":"username"
                },
                {
                    "id": "input-46514324234",
                    "module": "input",
                    "placeholder": "请输入密码",
                    "inputType": "password",
                    "disabled": true,
                    "value":"password"
                },
                {
                    "id": "button-46514324234",
                    "module": "button",
                    "name": "登录",
                    "click": "request", //打开弹窗|跳转页面|请求接口|删除操作
                    "requestId":"login-13r35353"
                }
            ]
        },
        {
            "id": "home-465134694",
            "module": "home",
            "name": ""
            
        }
    ],
    "window":[]
}