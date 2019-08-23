//模板类型：html,view,popup,childHtml,module
module.exports = {
    pageHtml: {
        type: "page",
        filterTerm:["html"],
        name:"页面模板",
        path: "/views/template/pageHtml.html",
        parameter: [
            {
                default: true,
                required: false,
                type: "string",
                name: "title",
                title: "页面Title",
                inputType:"input",
                description:"页面名称，建议填写项目名称"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType:"input",
                name: "favicon",
                title: "网站图标",
                description:"浏览器网站图标"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType:"input",
                name: "favicon",
                title: "网站图标",
                description:"浏览器网站图标"
            },
        ]
    },
    childPage: {
        type: "page",
        filterTerm:["html"],
        name:"iframe页面模板",
        path: "/views/template/childPage.html",
        parameter: [
            {
                default: true,
                required: false,
                type: "string",
                inputType:"input",
                name: "title",
                title: "页面Title",
                description:"页面名称，建议填写项目名称"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType:"input",
                name: "favicon",
                title: "网站图标",
                description:"浏览器网站图标"
            }
        ]
    },
    //普通登录输入框
    loginInput: {
        filterTerm:["loginHtml"],
        path: "/views/template/loginInput.html",
        name:"登录输入框模板",
        parameter: [
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "name",
                title: "参数名",
                description:"接口需要的参数名"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "placeholder",
                title: "输入框提示",
                description:"输入框值为空的时候，显示的提示文本"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "icon",
                title: "图标",
                description:"输入框图标"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType: "select",
                selectList: [
                    {
                        name: "文本",
                        value: "text",
                        default: true
                    },
                    {
                        name: "密码",
                        value:"password"
                    },
                    {
                        name: "数字",
                        value:"number"
                    },
                    {
                        name: "邮箱",
                        value:"email"
                    }
                ],
                name: "inputType",
                title: "输入框类型",
                description:"输入框类型"
            },
            {
                default: false,
                required: false,
                type: "string",
                inputType: "select",
                selectList: [],
                name: "verify",
                title: "正则验证",
                description:"正则验证"
            },
            {
                default: false,
                required: false,
                type: "array",
                inputType: "input",
                inputList: ["name","prompt"],
                name: "comparedList",
                title: "数据比较",
                description:"同级输入框数据比较，一般用于两次密码比较"
            }
        ]
    },
    //验证码登录输入框
    imgLoginInput: {
        filterTerm:["loginHtml"],
        name:"验证码登录输入框模板",
        path: "/views/template/imgLoginInput.html",
        parameter: [
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "name",
                title: "参数名",
                description:"接口需要的参数名"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "placeholder",
                title: "输入框提示",
                description:"输入框值为空的时候，显示的提示文本"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "icon",
                title: "图标",
                description:"输入框图标"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType: "select",
                selectList: [
                    {
                        name: "文本",
                        value: "text",
                        default: true
                    },
                    {
                        name: "数字",
                        value:"number"
                    },
                ],
                name: "inputType",
                title: "输入框类型",
                description:"输入框类型"
            },
            {
                default: false,
                required: false,
                type: "string",
                inputType: "select",
                selectList: [],
                name: "verify",
                title: "正则验证",
                description:"正则验证"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType: "input",
                name: "codeUrl",
                title: "验证码地址",
                description:"验证码图片地址"
            },
        ]
    },
    //手机号登录输入框
    phoneLoginInput: {
        filterTerm:["loginHtml"],
        name:"手机号登录输入框模板",
        path: "/views/template/phoneLoginInput.html",
        parameter: [
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "name",
                title: "参数名",
                description:"接口需要的参数名"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "placeholder",
                title: "输入框提示",
                description:"输入框值为空的时候，显示的提示文本"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "icon",
                title: "图标",
                description:"输入框图标"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType: "select",
                selectList: [
                    {
                        name: "文本",
                        value: "text",
                        default: true
                    },
                    {
                        name: "数字",
                        value:"number"
                    },
                ],
                name: "inputType",
                title: "输入框类型",
                description:"输入框类型"
            },
            {
                default: false,
                required: false,
                type: "string",
                inputType: "select",
                selectList: [],
                name: "verify",
                title: "正则验证",
                description:"正则验证"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType: "input",
                name: "requestUrl",
                title: "验证码地址",
                description:"发送手机验证码地址"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType: "select",
                selectList: [
                    {
                        name: "GET",
                        value: "GET",
                        default: true
                    },
                    {
                        name: "POST",
                        value:"POST"
                    },
                ],
                name: "method",
                title: "请求类型",
                description:"接口请求类型"
            },
            {
                default: true,
                required: true,
                type: "string",
                inputType: "pageName",
                name: "phoneInputName",
                title: "手机号参数名",
                description:"手机号输入框的参数名"
            }
        ]
    },
    //登录模板
    login: {
        filterTerm:["page"],
        name:"登录模板",
        path: "/views/template/login.html",
        parameter: [
            {
                default: true,
                required: true,
                type: "string",
                inputType:"input",
                name: "projectName",
                title: "页面标题",
                description:"登录|注册页面上面的标题"
            },
            {
                default: true,
                required: false,
                type: "string",
                inputType:"input",
                name: "description",
                title: "标题简介",
                description:"标题下面的简介"
            },
            {
                defaultValue:"登 入",
                default: false,
                required: false,
                type: "string",
                inputType:"input",
                name: "submitText",
                title: "提交按钮文本",
                description:"模板下面提交按钮文本"
            },
            {
                default: false,
                required: false,
                type: "array",
                inputType:"select",
                name: "md5",
                title: "MD5加密",
                description:"需要MD5加密的参数"
            },
            {
                default: false,
                required: false,
                type: "object",
                dataList: [
                    {
                        name: "title",
                        description: "显示文本",
                        type: "string"
                    },
                    {
                        name: "path",
                        description: "跳转路径",
                        type: "string",
                        select:"pageName"
                    },
                ],
                name: "leftLink",
                title: "左边按钮",
                description:"按钮上面左边的跳转入口"
            },
            {
                default: false,
                required: false,
                type: "object",
                dataList: [
                    {
                        name: "title",
                        description: "显示文本",
                        type: "string",
                        inputType:"input",
                    },
                    {
                        name: "path",
                        description: "跳转路径",
                        type: "string",
                        inputType:"pageName",
                    },
                ],
                name: "rightLink",
                title: "右边按钮",
                description:"按钮上面右边的跳转入口"
            },
        ]
    },
    //弹窗模板
    alert: {
        filterTerm:["js"],
        name:"弹窗提示模板",
        path: "/views/template/alert.html",
        parameter: [
            {
                default: true,
                required: true,
                type: "string",
                inputType:"select",
                selectList: [
                    {
                        name: "msg",
                        value: "msg",
                        default: true
                    },
                    {
                        name: "alert",
                        value:"alert"
                    },
                    {
                        name: "confirm",
                        value:"confirm"
                    },
                    {
                        name: "prompt",
                        value:"prompt"
                    }
                ],
                name: "popupType",
                title: "弹窗类型",
                description:"提示窗类型"
            },
            {
                default: false,
                required: false,
                type: "string",
                inputType:"input",
                name: "title",
                title: "提示标题",
                description:"只有弹窗类型为confirm和prompt才有用"
            },
            {
                default: false,
                required: false,
                type: "number",
                inputType: "select",
                selectList: [
                    {
                        name: "无图标",
                        value: false,
                        default: true
                    },
                    {
                        name: "正确",
                        value:1
                    },
                    {
                        name: "警告",
                        value:2
                    },
                    {
                        name: "错误",
                        value:3
                    },
                    {
                        name: "开心",
                        value:4
                    },
                    {
                        name: "一般",
                        value:5
                    },
                    {
                        name: "不开心",
                        value:6
                    }
                ],
                name: "icon",
                title: "提示图标",
                description:"提示框图标"
            },
            {
                default: false,
                required: false,
                type: "number",
                inputType: "select",
                selectList: [
                    {
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
                description:"prompt弹窗输入框类型"
            },
            {
                default: false,
                required: false,
                type: "string",
                inputType:"input",
                name: "value",
                title: "默认值",
                description:"prompt弹窗输入框默认值"
            },
            {
                default: false,
                required: false,
                type: "number",
                inputType:"input",
                name: "maxlength",
                title: "最大长度",
                description:"prompt弹窗输入框值最大长度"
            },
            {
                default: false,
                required: false,
                type: "array",
                dataList: [
                    {
                        name: "rule",
                        description: "正则表达式",
                        type: "string",
                        inputType:"input",
                    },
                    {
                        name: "prompt",
                        description: "错误提示文本",
                        type: "string",
                        inputType:"input",
                    },
                ],
                name: "verifyList",
                title: "验证",
                description:"prompt弹窗输入框值正则验证"
            },
        ]
    },
    //导航模板
    router: {
        filterTerm: ["js"],
        name:"路由页面跳转模板",
        path: "/views/template/router.html"
    },
    //请求模板
    request: {
        filterTerm: ["js"],
        name:"数据请求模板",
        path: "/views/template/request.html"
    },
    //主页面模板
    main: {
        filterTerm: ["page"],
        name:"主页面模板",
        path: "/views/template/main.html"
    },
    //统计模板
    statistics: {
        filterTerm: ["template"],
        name:"数据统计模板",
        path: "/views/template/statistics.html"
    },
    //统计图模板
    chart: {
        filterTerm: ["template"],
        name:"统计图模板",
        path: "/views/template/chart.html"
    },
    //栅格模板
    grid: {
        filterTerm: ["template"],
        name:"栅格模板",
        path: "/views/template/grid.html"
    },
    //表格模板
    table: {
        filterTerm: ["template"],
        name:"表格模板",
        path: "/views/template/table.html"
    },
    //卡片模板
    card: {
        filterTerm: ["template"],
        name:"卡片模板",
        path: "/views/template/card.html"
    },
    //表单form框模板
    form_box: {
        filterTerm: ["template"],
        name:"表单form框模板",
        path: "/views/template/form_box.html"
    },
    //表单form列表模板
    form_item: {
        filterTerm: ["form"],
        name:"表单form列表模板",
        path: "/views/template/form_item.html"
    },
    //表单form按钮模板
    form_button: {
        filterTerm: ["template", "form"],
        name:"表单form按钮模板",
        path: "/views/template/form_button.html"
    },
    //表单form普通输入框按钮模板
    form_input: {
        filterTerm: ["template", "form"],
        name:"表单form普通输入框按钮模板",
        path: "/views/template/form_input.html"
    },
    //表单form列表内样式模板
    form_item_inline: {
        filterTerm: ["form"],
        name:"表单form列表内样式模板",
        path: "/views/template/form_item_inline.html"
    },
    //表单时间选择器模板
    form_date: {
        filterTerm: ["template", "form"],
        name:"表单时间选择器模板",
        path: "/views/template/form_date.html"
    },
    //表单选择器模板
    form_select: {
        filterTerm: ["template", "form"],
        name:"表单选择器模板",
        path: "/views/template/form_select.html"
    },
    //表单分割线模板
    form_item_line: {
        filterTerm: ["form"],
        name:"表单分割线模板",
        path: "/views/template/form_item_line.html"
    },
    //表单提示
    form_item_prompt: {
        filterTerm: ["form"],
        name:"表单提示模板",
        path: "/views/template/form_item_prompt.html"
    },
    //表单复选框
    form_checkbox: {
        filterTerm: ["template", "form"],
        name:"表单复选框模板",
        path: "/views/template/form_checkbox.html"
    },
    //表单单选框
    form_radio: {
        filterTerm: ["template", "form"],
        name:"表单单选框模板",
        path: "/views/template/form_radio.html"
    },
    //表单文本域
    form_textarea: {
        filterTerm: ["template", "form"],
        name:"表单文本域模板",
        path: "/views/template/form_textarea.html"
    },
    //弹窗
    popups: {
        filterTerm: ["js"],
        name:"弹窗模板",
        path: "/views/template/popups.html"
    },
    //弹窗关闭
    popups_close: {
        filterTerm: ["js"],
        name:"弹窗关闭模板",
        path: "/views/template/popups_close.html"
    },
}