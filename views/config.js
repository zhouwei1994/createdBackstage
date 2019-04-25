//模板类型：html,view,popup,childHtml,module
module.exports = {
    //头部模板
    header: {
        default: {
            title: "后台管理",
            favicon: "favicon.ico",
            type:"module"
        },
        path:"/views/module/header.html"
    },
    //尾部模板
    footer: {
        default: {
            type: "module",
            content:"131321323423"
        },
        path:"/views/module/footer.html"
    },
    //登录模板
    login: {
        default: {
            logo: "",
            projectName: "周威-后台管理",
            type:"html"
        },
        path:"/views/module/login.html"
    },
}