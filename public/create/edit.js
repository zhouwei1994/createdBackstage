layui.use(["jquery", "element", "index", "form"], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var form = layui.form;
    //获取登录储存的信息
    var userInfo,
        //页面列表
        pages = [],
        //当前页面数据
        pageData = {};
    userInfoStr = sessionStorage.getItem("editUserInfo");
    if (userInfoStr) {
        userInfo = JSON.parse(userInfoStr);
        if (userInfo.id) {
            $("body").append(
                "<div class='edit_mode_box'>" +
                "<ul class='mode_nav'>" +
                "<li class='active' type='1000'>预览</li>" +
                "<li type='2000'>结构图</li>" +
                "<li type='3000'>页面</li>" +
                "<li type='4000'>模板</li>" +
                "<li type='5000'>配置</li>" +
                "<li type='6000'>下载</li>" +
                "</ul>" +
                "<div class='user_info_box'>" +
                "<div class='user_img'>" +
                "<img src='https://qn.kemean.cn/upload/201908/21/01e28428c0d84f7181d6d6053df82800'/>" +
                "</div>" +
                "<div class='user_info'>" +
                "<span class='name'>" + userInfo.nickname + "</span>" +
                "<svg viewBox='0 0 1024 1024'><path d='M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z' fill='#ffffff'></path></svg>" +
                "<div class='user_tab_box'>" +
                "<ul>" +
                "<li>修改密码</li>" +
                "<li>退出登录</li>" +
                "</ul>" +
                "</div>" +
                "</div>" +
                "<div class='collapse' title='收起菜单'>" +
                "<svg viewBox='0 0 1024 1024'>" +
                "<path d='M42.958 560.838c13.623 13.623 35.692 13.623 49.315 0L511.5 141.6l419.227 419.238c13.623 13.623 35.692 13.623 49.315 0s13.623-35.692 0-49.315L536.158 67.638c-13.623-13.623-35.692-13.623-49.315 0L42.958 511.511c-13.623 13.635-13.623 35.704 0 49.327z' fill='#ffffff'></path>" +
                "<path d='M42.958 909.588c13.623 13.623 35.692 13.623 49.315 0L511.5 490.35l419.227 419.238c13.623 13.623 35.692 13.623 49.315 0s13.623-35.692 0-49.315L536.158 416.388c-13.623-13.623-35.692-13.623-49.315 0L42.958 860.261c-13.623 13.635-13.623 35.704 0 49.327z' fill='#ffffff'></path>" +
                "</svg>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
        } else {
            location.href = "/create.html"
        }
    } else {
        location.href = "/create.html"
    }
    //获取url ?后面的参数
    function getUrlData() {
        var strs;
        var url = window.location.href; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            url = url.substr(url.indexOf("?"));
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var index = strs[i].indexOf("=");
                theRequest[strs[i].slice(0, index)] = unescape(strs[i].slice(index + 1, strs[i].length));
            }
        }
        return theRequest;
    }
    //检查url信息，做出对应的操作
    var getUrlData = getUrlData();
    if (getUrlData.openChild) {
        //添加页面 打开页面(页面路径，页面标题)
        layui.index.openTabsPage(getUrlData.openChild + '.html', getUrlData.pageTitle);
    }
    //点击收起图标收起菜单
    $("body").on("click", ".collapse", function () {
        $(".edit_mode_box").hide();
        layer.msg("按下Esc显示菜单", {
            icon: 0
        });
    });
    //按Esc健控制菜单显示隐藏
    $("body").on("keydown", function (event) {
        if (event.keyCode == 27) {
            if ($(".edit_mode_box").is(":visible")) {
                $(".edit_mode_box").hide();
                layer.msg("再次按下Esc显示菜单", {
                    icon: 0
                });
            } else {
                $(".edit_mode_box").show();
                layer.msg("再次按下Esc隐藏菜单", {
                    icon: 0
                });
            }
        }
    });
    //监听菜单导航点击
    $(".mode_nav li").click(function () {
        if (!$(this).hasClass("active")) {
            $(".mode_nav li").removeClass("active");
            $(this).addClass("active");
            var type = $(this).attr("type");
            //删除页面
            $(".edit_mode_popup").remove();
            if (type == 1000) {

            } else if (type == 2000) {
                onStructureChart();
            } else if (type == 3000) {
                onPages();
            } else if (type == 4000) {
                templateView();
            } else if (type == 5000) {

            }
        }
    });
    //封装请求
    function $http(options, callback) {
        var httpConfig = {
            beforeSend: function (xhr, settings) {
                if (userInfo && userInfo.id) {
                    xhr.setRequestHeader("user_id", userInfo.id);
                }
            },
            success: function (data) {
                if (data.code == 0) {
                    callback(data.data);
                } else {
                    layer.msg(data.msg, {
                        icon: 2
                    });
                }
            },
            error: function (err) {
                layer.msg("网络错误", {
                    icon: 2
                });
            }
        };
        for (var key in options) {
            httpConfig[key] = options[key];
        }
        $.ajax(httpConfig);
    }
    // 检查是否在主页面
    function isMainPage(callback) {
        var pageUrl = location.href;
        pageUrl = pageUrl.split('?')[0];
        pageUrl = pageUrl.split('/');
        pageUrl = pageUrl[pageUrl.length - 1];
        var callData = {
            currentMain: false
        };
        callData.currentPageName = pageUrl.split('.')[0];
        for (var r of pages) {
            if (r.template == "main") {
                callData.mainData = r;
                if (callData.currentPageName == r.pageName) {
                    callData.currentMain = true;
                    break;
                }
            }
        }
        callback && callback(callData);
    }
    //菜单-页面功能
    function onPages() {
        $http({
            type: "get",
            url: "/create/pages/list",
        }, function (res) {
            pages = res;
            //获取当前页面文件名和是否是主页面
            isMainPage(function (data) {
                var currentPageName;
                if (data.currentMain) {
                    var layAttr = $("#LAY_app_tabsheader .layui-this").attr("lay-attr");
                    currentPageName = layAttr.split('.')[0];
                } else {
                    currentPageName = data.currentPageName;
                }
                var html = '<div class="edit_mode_popup"><div class="edit_mode_mask remove_all_popup"></div>';
                html += '<div class="edit_mode_pages">' +
                    '<div class="page_list_box">' +
                    '<div class="title"><span>项目页面</span><button class="add_new_page">新增页面</button></div>';
                for (var index in res) {
                    var item = res[index];
                    html += '<div class="page_list ' + (currentPageName == item.pageName ? 'active' : '') + '" data-index="' + index + '">' +
                        '<div class="content">' +
                        '<div class="list_info">' +
                        '<div class="name">' + item.pageName + '</div>' +
                        '<div class="page_name">' + item.pageName + '.html&nbsp;&nbsp;&nbsp;&nbsp;' + (item.pageType == "page" ? "页面" : "iframe页面") + '</div>' +
                        '</div>' +
                        '<svg viewBox="0 0 1024 1024">' +
                        '<path d="M769.216 511.936c0-3.712-1.152-7.232-1.856-10.88-0.64-2.368-0.64-4.8-1.408-7.04a50.56 50.56 0 0 0-11.136-17.344l-417.28-417.28a48.96 48.96 0 0 0-68.992-0.96 48.832 48.832 0 0 0 1.024 68.864L654.208 512l-384.64 384.768a48.768 48.768 0 0 0-1.024 68.8 48.768 48.768 0 0 0 68.864-0.96l417.28-417.344a51.2 51.2 0 0 0 11.136-17.344c0.896-2.304 0.896-4.736 1.472-7.04 0.768-3.648 1.92-7.232 1.92-10.944z" fill="#8a8a8a"></path>' +
                        '</svg>' +
                        '</div>' +
                        '</div>';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';
                $("body").append(html);
            });
        })
    }

    //页面列表点击
    $("body").on("click", ".page_list", function () {
        if (!$(this).hasClass("active")) {
            $("body .page_list").removeClass("active");
            $(this).addClass("active");
            var pageInfo = pages[$(this).attr("data-index")];
            if (pageInfo.pageType == "page") {
                location.href = pageInfo.pageName + ".html";
            } else if (pageInfo.pageType == "childPage") {
                isMainPage(function (res) {
                    if (res.currentMain) {
                        //添加页面 打开页面(页面路径，页面标题)
                        layui.index.openTabsPage(pageInfo.pageName + '.html', pageInfo.pageTitle || pageInfo.pageName);
                    } else {
                        location.href = res.mainData.pageName + ".html?openChild=" + pageInfo.pageName + "&pageTitle=" + (pageInfo.pageTitle || pageInfo.pageName);
                    }
                });
            }
        }
        event.stopPropagation();
    });
    //关闭所有弹窗
    $("body").on("click", ".remove_all_popup", function () {
        $(".edit_mode_popup").remove();
        $(".mode_nav li").removeClass("active");
    });
    //阻止冒泡
    $("body").on("click", ".remove_all_popup div", function (event) {

    });
    // 点击结构图菜单
    function onStructureChart() {
        isMainPage(function (res) {
            var currentPageName;
            if (res.currentMain) {
                var layAttr = $("#LAY_app_tabsheader .layui-this").attr("lay-attr");
                currentPageName = layAttr.split('.')[0];
            } else {
                currentPageName = res.currentPageName;
            }
            if (currentPageName == pageData.pageName) {
                createdStructureChart(pageData);
            } else {
                if (pages.length > 0) {
                    var state = false;
                    layui.each(pages, function (index, item) {
                        if (item.pageName == currentPageName) {
                            state = true;
                            pageData = item;
                            createdStructureChart(item);
                        }
                    });
                    if (!state) {
                        layer.msg("未找到对应的页面，请刷新页面再试", {
                            icon: 0
                        });
                    }
                } else {
                    $http({
                        type: "get",
                        url: "/create/pages/list",
                    }, function (res) {
                        pages = res;
                        var state = false;
                        layui.each(res, function (index, item) {
                            if (item.pageName == currentPageName) {
                                state = true;
                                pageData = item;
                                createdStructureChart(item);
                            }
                        });
                        if (!state) {
                            layer.msg("未找到对应的页面，请刷新页面再试", {
                                icon: 0
                            });
                        }
                    });
                }
            }
        });
    }
    // 渲染结构图
    function createdStructureChart(page) {
        console.log(page);

        function getStructureDom(data) {
            console.log(data);
            var domHtml = "";
            if (data["template"]) {
                domHtml += '<div class="model_content_box">';
                domHtml += '<div class="model_info">';
                domHtml += '<div class="title">';
                domHtml += '<span class="type">模块</span>';
                domHtml += '<span class="name">' + (data.templateName || data.template || "暂无说明") + '</span>';
                domHtml += '</div>';
                domHtml += '</div>';
                domHtml += '<div class="model_info_box">';
            }

            layui.each(data, function (key, item) {
                if (typeof (item) == "object") {
                    domHtml += getStructureDom(item);
                }
            });
            if (data["template"]) {
                domHtml += '</div>';
                domHtml += '</div>';
            }
            return domHtml;
        }
        var html = '<div class="edit_mode_popup"><div class="edit_mode_mask remove_all_popup"></div>';
        html += '<div class="edit_mode_structure_chart">' +
            '<div class="structure_chart_box">' +
            '<div class="chart_box">';
        if (page.pageType == "page") {
            html += '<div class="model_content_box">';
            html += '<div class="model_info">';
            html += '<div class="title">';
            html += '<span class="type">页面</span>';
            html += '<span class="name">' + (page.pageTitle || page.pageName) + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="model_info_box">';
            layui.each(page, function (key, item) {
                if (/^children/.test(key)) {
                    html += getStructureDom(item);
                } else if (typeof (item) == "object") {
                    if (!["leftNav"].includes(key)) {
                        html += getStructureDom(item);
                    }
                }
            });
            html += '</div>';
            html += '</div>';
        } else {
            layui.each(page, function (key, item) {
                if (/^children/.test(key)) {
                    html += getStructureDom(item, "children");
                } else if (typeof (item) == "object") {
                    html += getStructureDom(item, "object");
                }
            });
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $("body").append(html);
    }

    // 打开编辑窗口
    function openEditPopup(data, parameter,options) {
        var html = '<div class="layui-form" style="padding:30px;">';
        html += '<div class="layui-form-item">';
        html += '<label class="layui-form-label">页面名称</label>';
        html += '<div class="layui-input-block">';
        html += '<input type="text" name="pageTitle" value="'+data.pageTitle+'" lay-verify="required" placeholder="请输入页面名称" class="layui-input">';
        html += '</div>';
        html += '</div>';
        html += '<div class="layui-form-item">';
        html += '<label class="layui-form-label">页面文件名</label>';
        html += '<div class="layui-input-inline">';
        html += '<input type="text" name="pageName" value="'+data.pageName+'" lay-verify="required" placeholder="页面文件名为英文和字母" class="layui-input">';
        html += '</div>';
        html += '<div class="layui-form-mid layui-word-aux">.html</div>';
        html += '</div>';
        layui.each(parameter, function (index, item) {
            if (item.defaultShow == 3000) {
                data[item.name] = item.defaultValue;
            } else if (item.defaultShow == 1000 || data[item.name]) {
                var value;
                if (data[item.name]) {
                    value = data[item.name];
                } else if (item.defaultValue) {
                    value = item.defaultValue;
                } else {
                    if (item.type == "string") {
                        value = "";
                    } else if (item.type == "array") {
                        value = [];
                    } else if (item.type == "object") {
                        value = {};
                    } else if (item.type == "number") {
                        value = "";
                    }
                }
                html += '<div class="layui-form-item">';
                html += '<label class="layui-form-label">'+item.name+'</label>';
                html += '<div class="layui-input-block">';
                if (item.inputType == "input") {
                    html += '<input type="text" name="' + item.name + '" value="'+value+'"';
                    if (item.required) {
                        html += 'lay-verify="required"';
                    }
                    html += ' placeholder="' + item.title + '" class="layui-input">';
                } else if (item.inputType == "radio") {
                    html += '<select name="' + item.name + '">';
                    if (item.required) {
                        html += 'lay-verify="required"';
                    }
                    html += '>';
                    if (item.selectList && item.selectList instanceof Array && item.selectList.length > 0) {
                        layui.each(item.selectList, function (childIndex, childItem) {
                            if (childItem.value == value) {
                                html += '<option value="' + childItem.value + '" selected="selected">' + childItem.name + '</option>';
                            } else {
                                html += '<option value="' + childItem.value + '">' + childItem.name + '</option>';
                            }
                        });
                    }
                    html += '</select>';
                } else if (item.inputType == "checkbox") { 
                    if (item.selectList && item.selectList instanceof Array && item.selectList.length > 0) {
                        layui.each(item.selectList, function (childIndex, childItem) {
                            if (childItem.value == value) {
                                html += '<input type="checkbox" name="' + item.name + '[' + childItem.value + ']" title="' + childItem.name + '" checked></input>';
                            } else {
                                html += '<input type="checkbox" name="' + item.name + '[' + childItem.value + ']" title="' + childItem.name + '"></input>';
                            }
                        });
                    } else if (item.selectList == "verifyList") {
                        layui.each(options.verifyList, function (childIndex, childItem) {
                            if (childItem.value == value) {
                                html += '<input type="checkbox" name="' + item.name + '[' + childItem.value + ']" title="' + childItem.name + '" checked></input>';
                            } else {
                                html += '<input type="checkbox" name="' + item.name + '[' + childItem.value + ']" title="' + childItem.name + '"></input>';
                            }
                        });
                    }
                }
                html += '</div>';
                html += '</div>';
            }
        });
        html += '<div class="layui-form-item">';
        html += '<label class="layui-form-label">添加参数</label>';
        html += '<div class="layui-input-block">';
        html += '<button class="layui-btn">选择参数</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="layui-form-item">';
        html += '<div class="layui-input-block">';
        html += '<button class="layui-btn" lay-submit lay-filter="onEditTemplate">确定</button>';
        html += '</div>';
        html += '</div>';
        layer.open({
            type: 1,
            title: '模板编辑',
            area: ['600px', 'auto'],
            shade: 0,
            maxmin: true,
            id: "open_edit_popup",
            content: html,
            zIndex: layer.zIndex, //重点1
            success: function (layero) {
                form.render();
            }
        });
    }
    //点击创建新页面
    $("body").on("click", ".add_new_page", function () {
        addNewPage();
    });
    //创建新页面
    function addNewPage() {
        var html = '<div class="layui-form" style="padding:30px;">';
        html += '<div class="layui-form-item">';
        html += '<label class="layui-form-label">页面名称</label>';
        html += '<div class="layui-input-block">';
        html += '<input type="text" name="title" lay-verify="required" placeholder="请输入页面名称" class="layui-input">';
        html += '</div>';
        html += '</div>';
        html += '<div class="layui-form-item">';
        html += '<label class="layui-form-label">页面文件名</label>';
        html += '<div class="layui-input-inline">';
        html += '<input type="text" name="name" lay-verify="required" placeholder="页面文件名为英文和字母" class="layui-input">';
        html += '</div>';
        html += '<div class="layui-form-mid layui-word-aux">.html</div>';
        html += '</div>';
        html += '<div class="layui-form-item">';
        html += '<label class="layui-form-label">页面类型</label>';
        html += '<div class="layui-input-block">';
        html += '<input type="radio" name="pageType" value="1000" title="页面" lay-filter="pageSelect">';
        html += '<input type="radio" name="pageType" value="2000" title="iframe页面" checked  lay-filter="pageSelect">';
        html += '</div>';
        html += '</div>';
        html += '<div class="layui-form-item page-select-form" style="display:none;">';
        html += '<label class="layui-form-label">页面模板</label>';
        html += '<div class="layui-input-block text-right-view">';
        html += '<span class="view-style">请选择模板</span>';
        html += '<button class="layui-btn">选择模板</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="layui-form-item">';
        html += '<div class="layui-input-block">';
        html += '<button class="layui-btn" lay-submit lay-filter="onAddPage">确定</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        layer.open({
            type: 1,
            title: '新增页面',
            area: ['600px', '400px'],
            shade: 0,
            maxmin: true,
            id: "add_new_page",
            content: html,
            zIndex: layer.zIndex, //重点1
            success: function (layero) {
                form.render();
                // layer.setTop(layero); //置顶当前窗口
                // layer.closeAll();
                var templateInfo = null;
                form.on('submit(onAddPage)', function (data) {
                    if (!/[a-zA-Z0-9]/.test(data.field.name)) {
                        layer.msg("文件名格式错误，格式为大小写字母或数字组成", {
                            icon: 2
                        });
                        return;
                    }
                    if (data.field.pageType == 1000) {
                        if (templateInfo && templateInfo.templateName) {
                            data.field.templateName = templateInfo.templateName;
                        } else {
                            layer.msg("请选择页面模板", {
                                icon: 0
                            });
                            return;
                        }
                    }
                    $http({
                        type: "post",
                        url: "/create/pages/add",
                        data: data.field
                    }, function (res) {
                        layer.closeAll();
                        openEditPopup(res.data, res.parameter,res.options)
                    });
                });
                //监听
                form.on('radio(pageSelect)', function (data) {
                    if (data.value == 1000) {
                        $(".page-select-form").show();
                    } else {
                        $(".page-select-form").hide();
                    }
                });
                $(".page-select-form .layui-btn").on("click", function () {
                    templateSelect("page", function (data) {
                        templateInfo = data;
                        $(".page-select-form .view-style").text(data.title);
                    });
                });
            }
        });
    }
    //模板选择弹窗
    function templateSelect(type, callback) {
        var html = "";
        $http({
            type: "get",
            url: "/create/pages/template",
            data: {
                type: type
            }
        }, function (res) {
            html += '<div class="template_list_box template_select_box">';
            layui.each(res, function (index, item) {
                html += '<div class="template_list">';
                html += '<div class="template_img">';
                html += '<img src="https://qn.kemean.cn/upload/201908/23/356751a1c1c34ea6a7f086bce27385fb"/>';
                html += '</div>';
                html += '<span class="select" data-index="' + index + '"></span>';
                html += '<div class="template_info">';
                html += '<span class="name">' + item.title + '</span>';
                html += '</div>';
                html += '</div>';
            });
            html += '</div>';
            layer.open({
                type: 1,
                title: '模板选择',
                area: ['670px', '400px'],
                shade: 0,
                maxmin: true,
                id: "template_select",
                content: html,
                zIndex: layer.zIndex, //重点1
                btn: ['确定'],
                success: function (layero) {
                    form.render();
                    // layer.setTop(layero); //置顶当前窗口
                    $(".template_select_box .template_list").on("click", function () {
                        if (!$(this).find(".select").hasClass("active")) {
                            $(".template_select_box .template_list").find(".select").removeClass("active");
                            $(this).find(".select").addClass("active");
                        }
                    });
                },
                yes: function (index, layero) {
                    var active = $(".template_select_box .template_list").find(".active");
                    if (active.length > 0) {
                        var dataIndex = active.attr("data-index");
                        layer.close(index);
                        callback && callback(res[dataIndex]);
                    } else {
                        layer.msg("请选择模板");
                    }
                }
            });
        });
    }
    // 模板选择
    function templateView() {
        $http({
            type: "get",
            url: "/create/pages/template",
            data: {
                type: ""
            }
        }, function (res) {
            var html = '<div class="edit_mode_popup"><div class="edit_mode_mask remove_all_popup"></div>';
            html += '<div class="template_view_box">';
            html += '<div class="template_tab_box">';
            html += '<div class="active" type="">全部</div>';
            html += '<div type="template">HTML模板</div>';
            html += '<div type="js">js模板</div>';
            html += '<div type="form">表单模板</div>';
            html += '<div type="loginHtml">登录模板</div>';
            html += '<div type="page">页面模板</div>';
            html += '</div>';
            html += '<div class="template_list_box">';
            layui.each(res, function (key, item) {
                html += '<div class="template_list">';
                html += '<div class="template_img">';
                html += '<img src="https://qn.kemean.cn/upload/201908/23/356751a1c1c34ea6a7f086bce27385fb"/>';
                html += '</div>';
                html += '<div class="template_info">';
                html += '<span class="name">' + item.title + '</span>';
                html += '</div>';
                html += '</div>';
            });
            html += '</div>';
            html += '</div>';
            html += '</div>';
            $("body").append(html);
        });
    }
    //模板页面点击
    $("body").on("click", ".template_tab_box div", function () {
        if (!$(this).hasClass("active")) {
            $(".template_tab_box div").removeClass("active");
            $(this).addClass("active");
            $http({
                type: "get",
                url: "/create/pages/template",
                data: {
                    type: $(this).attr("type")
                }
            }, function (res) {
                var html = "";
                layui.each(res, function (key, item) {
                    html += '<div class="template_list">';
                    html += '<div class="template_img">';
                    html += '<img src="https://qn.kemean.cn/upload/201908/23/356751a1c1c34ea6a7f086bce27385fb"/>';
                    html += '</div>';
                    html += '<div class="template_info">';
                    html += '<span class="name">' + item.title + '</span>';
                    html += '</div>';
                    html += '</div>';
                });
                $(".template_list_box").html(html);
            });
        }
    });
});