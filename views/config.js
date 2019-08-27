//模板类型：html,view,popup,childHtml,module

// defaultShow 1000 显示  2000 显示待添加栏 3000都不显示 
module.exports = {
    pageHtml: {
        type: "page",
        filterTerm: ["html"],
        title: "页面模板",
        path: "/views/template/pageHtml.html",
        parameter: [{
                defaultShow: 1000,
                required: false,
                type: "string",
                name: "title",
                title: "页面Title",
                inputType: "input",
                description: "页面名称，建议填写项目名称"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "input",
                name: "favicon",
                title: "网站图标",
                description: "浏览器网站图标"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "input",
                name: "favicon",
                title: "网站图标",
                description: "浏览器网站图标"
            },
        ]
    },
    childPage: {
        type: "page",
        filterTerm: ["html"],
        title: "iframe页面模板",
        path: "/views/template/childPage.html",
        parameter: [{
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "input",
                name: "title",
                title: "页面Title",
                description: "页面名称，建议填写项目名称"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "input",
                name: "favicon",
                title: "网站图标",
                description: "浏览器网站图标"
            }
        ]
    },
    //普通登录输入框
    loginInput: {
        filterTerm: ["loginHtml"],
        path: "/views/template/loginInput.html",
        title: "登录输入框模板",
        parameter: [{
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "name",
                title: "参数名",
                description: "接口需要的参数名"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "placeholder",
                title: "输入框提示",
                description: "输入框值为空的时候，显示的提示文本"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "icon",
                title: "图标",
                description: "输入框图标"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "radio",
                selectList: [{
                        name: "文本",
                        value: "text",
                        default: true
                    },
                    {
                        name: "密码",
                        value: "password"
                    },
                    {
                        name: "数字",
                        value: "number"
                    },
                    {
                        name: "邮箱",
                        value: "email"
                    }
                ],
                name: "inputType",
                title: "输入框类型",
                description: "输入框类型"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "string",
                inputType: "checkbox",
                selectList: "verifyList",
                name: "verify",
                title: "正则验证",
                description: "正则验证"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "array",
                inputType: "input",
                inputList: ["name", "prompt"],
                name: "comparedList",
                title: "数据比较",
                description: "同级输入框数据比较，一般用于两次密码比较"
            }
        ]
    },
    //验证码登录输入框
    imgLoginInput: {
        filterTerm: ["loginHtml"],
        title: "验证码登录输入框模板",
        path: "/views/template/imgLoginInput.html",
        parameter: [{
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "name",
                title: "参数名",
                description: "接口需要的参数名"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "placeholder",
                title: "输入框提示",
                description: "输入框值为空的时候，显示的提示文本"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "icon",
                title: "图标",
                description: "输入框图标"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "radio",
                selectList: [{
                        name: "文本",
                        value: "text",
                        default: true
                    },
                    {
                        name: "数字",
                        value: "number"
                    },
                ],
                name: "inputType",
                title: "输入框类型",
                description: "输入框类型"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "string",
                inputType: "checkbox",
                selectList: "verifyList",
                name: "verify",
                title: "正则验证",
                description: "正则验证"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "codeUrl",
                title: "验证码地址",
                description: "验证码图片地址"
            },
        ]
    },
    //手机号登录输入框
    phoneLoginInput: {
        filterTerm: ["loginHtml"],
        title: "手机号登录输入框模板",
        path: "/views/template/phoneLoginInput.html",
        parameter: [{
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "name",
                title: "参数名",
                description: "接口需要的参数名"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "placeholder",
                title: "输入框提示",
                description: "输入框值为空的时候，显示的提示文本"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "icon",
                title: "图标",
                description: "输入框图标"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "radio",
                selectList: [{
                        name: "文本",
                        value: "text",
                        default: true
                    },
                    {
                        name: "数字",
                        value: "number"
                    },
                ],
                name: "inputType",
                title: "输入框类型",
                description: "输入框类型"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "string",
                inputType: "checkbox",
                selectList: "verifyList",
                name: "verify",
                title: "正则验证",
                description: "正则验证"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "requestUrl",
                title: "验证码地址",
                description: "发送手机验证码地址"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "radio",
                selectList: [{
                        name: "GET",
                        value: "GET",
                        default: true
                    },
                    {
                        name: "POST",
                        value: "POST"
                    },
                ],
                name: "method",
                title: "请求类型",
                description: "接口请求类型"
            },
            {
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "pageName",
                name: "phoneInputName",
                title: "手机号参数名",
                description: "手机号输入框的参数名"
            }
        ]
    },
    //登录模板
    login: {
        filterTerm: ["page"],
        title: "登录模板",
        path: "/views/template/login.html",
        parameter: [{
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "input",
                name: "projectName",
                title: "页面标题",
                description: "登录|注册页面上面的标题"
            },
            {
                defaultShow: 1000,
                required: false,
                type: "string",
                inputType: "input",
                name: "description",
                title: "标题简介",
                description: "标题下面的简介"
            },
            {
                defaultValue: "登 入",
                defaultShow: 2000,
                required: false,
                type: "string",
                inputType: "input",
                name: "submitText",
                title: "提交按钮文本",
                description: "模板下面提交按钮文本"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "array",
                inputType: "checkbox",
                selectList:"formValue",
                name: "md5",
                title: "MD5加密",
                description: "需要MD5加密的参数"
            },
            {
                defaultShow: 3000,
                required: false,
                type: "object",
                inputType: "checkbox",
                name: "children1",
                title: "提交按钮执行模块",
                description: "提交按钮执行模块"
            },
            {
                defaultShow: 3000,
                defaultValue: ["js"],
                required: true,
                type: "array",
                name: "children1Type",
                title: "children1的模板类型",
                description: "children1的模板类型"
            },
            {
                defaultShow: 3000,
                defaultValue: ["loginHtml"],
                required: true,
                type: "array",
                name: "childrenType",
                title: "children的模板类型",
                description: "children的模板类型"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "object",
                dataList: [{
                        name: "title",
                        description: "显示文本",
                        type: "string"
                    },
                    {
                        name: "path",
                        description: "跳转路径",
                        type: "string",
                        select: "pageName"
                    },
                ],
                name: "leftLink",
                title: "左边按钮",
                description: "按钮上面左边的跳转入口"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "object",
                dataList: [{
                        name: "title",
                        description: "显示文本",
                        type: "string",
                        inputType: "input",
                    },
                    {
                        name: "path",
                        description: "跳转路径",
                        type: "string",
                        inputType: "pageName",
                    },
                ],
                name: "rightLink",
                title: "右边按钮",
                description: "按钮上面右边的跳转入口"
            },
        ]
    },
    //弹窗模板
    alert: {
        filterTerm: ["js"],
        title: "弹窗提示模板",
        path: "/views/template/alert.html",
        parameter: [{
                defaultShow: 1000,
                required: true,
                type: "string",
                inputType: "radio",
                selectList: [{
                        name: "msg",
                        value: "msg",
                        default: true
                    },
                    {
                        name: "alert",
                        value: "alert"
                    },
                    {
                        name: "confirm",
                        value: "confirm"
                    },
                    {
                        name: "prompt",
                        value: "prompt"
                    }
                ],
                name: "popupType",
                title: "弹窗类型",
                description: "提示窗类型"
            },
            {
                defaultShow: 2000,
                termShow: [{
                    name: "popupType",
                    value: ["confirm", "prompt"]
                }],
                required: false,
                type: "string",
                inputType: "input",
                name: "title",
                title: "提示标题",
                description: "只有弹窗类型为confirm和prompt才有用"
            },
            {
                defaultShow: 2000,
                required: false,
                type: "number",
                inputType: "radio",
                selectList: [{
                        name: "无图标",
                        value: false,
                        default: true
                    },
                    {
                        name: "正确",
                        value: 1
                    },
                    {
                        name: "警告",
                        value: 2
                    },
                    {
                        name: "错误",
                        value: 3
                    },
                    {
                        name: "开心",
                        value: 4
                    },
                    {
                        name: "一般",
                        value: 5
                    },
                    {
                        name: "不开心",
                        value: 6
                    }
                ],
                name: "icon",
                title: "提示图标",
                description: "提示框图标"
            },
            {
                defaultShow: 2000,
                termShow: [{
                    name: "popupType",
                    value: ["prompt"]
                }],
                required: false,
                type: "number",
                inputType: "radio",
                selectList: [{
                        name: "文本",
                        value: 0,
                    },
                    {
                        name: "密码",
                        value: 1,
                        default: true
                    },
                    {
                        name: "多行文本",
                        value: 2
                    },
                ],
                name: "formType",
                title: "输入框类型",
                description: "prompt弹窗输入框类型"
            },
            {
                defaultShow: 2000,
                termShow: [{
                    name: "popupType",
                    value: ["prompt"]
                }],
                required: false,
                type: "string",
                inputType: "input",
                name: "value",
                title: "默认值",
                description: "prompt弹窗输入框默认值"
            },
            {
                defaultShow: 2000,
                termShow: [{
                    name: "popupType",
                    value: ["prompt"]
                }],
                required: false,
                type: "number",
                inputType: "input",
                name: "maxlength",
                title: "最大长度",
                description: "prompt弹窗输入框值最大长度"
            },
            {
                defaultShow: 2000,
                termShow: [{
                    name: "popupType",
                    value: ["prompt"]
                }],
                required: false,
                type: "array",
                dataList: [{
                        name: "rule",
                        description: "正则表达式",
                        type: "string",
                        inputType: "input",
                    },
                    {
                        name: "prompt",
                        description: "错误提示文本",
                        type: "string",
                        inputType: "input",
                    },
                ],
                name: "verifyList",
                title: "验证",
                description: "prompt弹窗输入框值正则验证"
            },
            {
                defaultShow: 3000,
                defaultValue: ["js"],
                required: true,
                type: "array",
                name: "childrenType",
                title: "children的模板类型",
                description: "children的模板类型"
            },
            {
                defaultShow: 3000,
                required: false,
                type: "object",
                inputType: "checkbox",
                name: "children",
                title: "完成执行",
                description: "完成执行"
            },
        ]
    },
    //导航模板
    router: {
        filterTerm: ["js"],
        title: "路由页面跳转模板",
        path: "/views/template/router.html"
    },
    //请求模板
    request: {
        filterTerm: ["js"],
        title: "数据请求模板",
        path: "/views/template/request.html"
    },
    //主页面模板
    main: {
        filterTerm: ["page"],
        title: "主页面模板",
        path: "/views/template/main.html"
    },
    //统计模板
    statistics: {
        filterTerm: ["template"],
        title: "数据统计模板",
        path: "/views/template/statistics.html"
    },
    //统计图模板
    chart: {
        filterTerm: ["template"],
        title: "统计图模板",
        path: "/views/template/chart.html"
    },
    //栅格模板
    grid: {
        filterTerm: ["template"],
        title: "栅格模板",
        path: "/views/template/grid.html"
    },
    //表格模板
    table: {
        filterTerm: ["template"],
        title: "表格模板",
        path: "/views/template/table.html"
    },
    //卡片模板
    card: {
        filterTerm: ["template"],
        title: "卡片模板",
        path: "/views/template/card.html"
    },
    //表单form框模板
    form_box: {
        filterTerm: ["template"],
        title: "表单form框模板",
        path: "/views/template/form_box.html"
    },
    //表单form列表模板
    form_item: {
        filterTerm: ["form"],
        title: "表单form列表模板",
        path: "/views/template/form_item.html"
    },
    //表单form按钮模板
    form_button: {
        filterTerm: ["template", "form"],
        title: "表单form按钮模板",
        path: "/views/template/form_button.html"
    },
    //表单form普通输入框按钮模板
    form_input: {
        filterTerm: ["template", "form"],
        title: "表单form普通输入框按钮模板",
        path: "/views/template/form_input.html"
    },
    //表单form列表内样式模板
    form_item_inline: {
        filterTerm: ["form"],
        title: "表单form列表内样式模板",
        path: "/views/template/form_item_inline.html"
    },
    //表单时间选择器模板
    form_date: {
        filterTerm: ["template", "form"],
        title: "表单时间选择器模板",
        path: "/views/template/form_date.html"
    },
    //表单选择器模板
    form_select: {
        filterTerm: ["template", "form"],
        title: "表单选择器模板",
        path: "/views/template/form_select.html"
    },
    //表单分割线模板
    form_item_line: {
        filterTerm: ["form"],
        title: "表单分割线模板",
        path: "/views/template/form_item_line.html"
    },
    //表单提示
    form_item_prompt: {
        filterTerm: ["form"],
        title: "表单提示模板",
        path: "/views/template/form_item_prompt.html"
    },
    //表单复选框
    form_checkbox: {
        filterTerm: ["template", "form"],
        title: "表单复选框模板",
        path: "/views/template/form_checkbox.html"
    },
    //表单单选框
    form_radio: {
        filterTerm: ["template", "form"],
        title: "表单单选框模板",
        path: "/views/template/form_radio.html"
    },
    //表单文本域
    form_textarea: {
        filterTerm: ["template", "form"],
        title: "表单文本域模板",
        path: "/views/template/form_textarea.html"
    },
    //弹窗
    popups: {
        filterTerm: ["js"],
        title: "弹窗模板",
        path: "/views/template/popups.html"
    },
    //弹窗关闭
    popups_close: {
        filterTerm: ["js"],
        title: "弹窗关闭模板",
        path: "/views/template/popups_close.html"
    },
}