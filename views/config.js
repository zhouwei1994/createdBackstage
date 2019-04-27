//模板类型：html,view,popup,childHtml,module
module.exports = {
    pageHtml: {
        type: "page",
        path: "/views/template/pageHtml.html"
    },
    loginInput: {
        path: "/views/template/loginInput.html"
    },
    //普通登录页表单
    baseLoginInput: function (data) {
        var defaultData = {
            type: "module",
            placeholder: "",
            required: true,
            inputType: "text",
        };
        data = Object.assign(defaultData,data);
        if (!data.title) {
            return { success: false, content: "请输入表单名称，参数名：title" };
        }
        if (!data.name) {
            return { success: false, content: "请输入参数名称，参数名：name" };
        }
        if (!data.icon) {
            return { success: false, content: "请选择表单图标，参数名：icon" };
        }
            return { success: true, content: `<div class="layui-form-item">
                                                <label class="layadmin-user-login-icon layui-icon <%= icon %>"></label>
                                                <input type="<%= inputType %>" name="<%= name %>" id="<%= 'input-' + inputType +'-'+ name %>" <% if ( keywords ) { %> lay-verify="required" <% } %>
                                                    placeholder="<%= placeholder %>" class="layui-input">
                                            </div>` };
            if (!data.codeUrl) {
                return { success: false, content: "请输入验证码url，参数名：codeUrl" };
            }
            return { success: true, content: `<div class="layui-form-item">
                                                <div class="layui-row">
                                                    <div class="layui-col-xs7">
                                                        <label class="layadmin-user-login-icon layui-icon <%= icon %>"></label>
                                                        <input type="<%= inputType %>" id="<%= 'input-' + inputType +'-'+ name %>" name="<%= name %>" <% if ( keywords ) { %> lay-verify="required" <% } %>
                                                            placeholder="<%= placeholder %>" class="layui-input">
                                                        </div>
                                                    <div class="layui-col-xs5">
                                                        <div style="margin-left: 10px;">
                                                            <img src="<%= codeUrl %>" class="layadmin-user-login-codeimg"
                                                                id="img-code-<%= name %>">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>` };
            if (!data.codeUrl) {
                return { success: false, content: "请输入验证码url，参数名：codeUrl" };
            }
            return { success: true, content: `<div class="layui-form-item">
                                                <label class="layadmin-user-login-icon layui-icon <%= icon %>"></label>
                                                <input type="<%= inputType %>" name="<%= name %>" id="<%= 'input-' + inputType +'-'+ name %>" <% if ( keywords ) { %> lay-verify="required" <% } %>
                                                    placeholder="<%= placeholder %>" class="layui-input">
                                            </div>` };
    },
    //图片登录表单
    imgLoginInput: function (data) {
        var defaultData = {
            type: "module",
            placeholder: "",
            required: true,
            inputType: "text",
        };
        data = Object.assign(defaultData,data);
        if (!data.title) {
            return { success: false, content: "请输入表单名称，参数名：title" };
        }
        if (!data.name) {
            return { success: false, content: "请输入参数名称，参数名：name" };
        }
        if (!data.icon) {
            return { success: false, content: "请选择表单图标，参数名：icon" };
        }
        return { success: true, content: `<div class="layui-form-item">
                                            <div class="layui-row">
                                                <div class="layui-col-xs7">
                                                    <label class="layadmin-user-login-icon layui-icon <%= icon %>"></label>
                                                    <input type="<%= inputType %>" id="<%= 'input-' + inputType +'-'+ name %>" name="<%= name %>" <% if ( keywords ) { %> lay-verify="required" <% } %>
                                                        placeholder="<%= placeholder %>" class="layui-input">
                                                    </div>
                                                <div class="layui-col-xs5">
                                                    <div style="margin-left: 10px;">
                                                        <img src="<%= codeUrl %>" class="layadmin-user-login-codeimg"
                                                            id="img-code-<%= name %>">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>` };
},
    //图片登录表单
    imgLoginInput: function (data) {
        var defaultData = {
            type: "module",
            placeholder: "",
            required: true,
            inputType: "text",
        };
        data = Object.assign(defaultData,data);
        if (!data.title) {
            return { success: false, content: "请输入表单名称，参数名：title" };
        }
        if (!data.name) {
            return { success: false, content: "请输入参数名称，参数名：name" };
        }
        if (!data.icon) {
            return { success: false, content: "请选择表单图标，参数名：icon" };
        }
        return { success: true, content: `<div class="layui-form-item">
                                            <div class="layui-row">
                                                <div class="layui-col-xs7">
                                                    <label class="layadmin-user-login-icon layui-icon <%= icon %>"></label>
                                                    <input type="<%= inputType %>" id="<%= 'input-' + inputType +'-'+ name %>" name="<%= name %>" <% if ( keywords ) { %> lay-verify="required" <% } %>
                                                        placeholder="<%= placeholder %>" class="layui-input">
                                                    </div>
                                                <div class="layui-col-xs5">
                                                    <div style="margin-left: 10px;">
                                                        <img src="<%= codeUrl %>" class="layadmin-user-login-codeimg"
                                                            id="img-code-<%= name %>">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>` };
    },
    //头部模板
    header: {
        default: {
            title: "后台管理",
            favicon: "favicon.ico",
            type: "module"
        },
        mustPass: {},
        path: "/views/template/header.html"
    },
    //尾部模板
    footer: {
        default: {
            type: "module",
        },
        mustPass: {},
        path: "/views/template/footer.html"
    },
    //登录模板
    login: {
        default: {
            projectName: "周威-后台管理",
            description: "一个快速生成的后台管理",
            forget: false,
            registered: false,
            supplier: false,
            type: "html"
        },
        mustPass: {
            projectName: "平台名称",
            children: "表单参数"
        },
        path: "/views/template/login.html"
    },
}