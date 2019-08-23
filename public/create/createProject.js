var createProject = {
    "baseSetting": {
        //网站title
        "title": "后台管理",
        //网站说明
        "keywords": "一个快速生成的后台管理",
        //网站seo关键字
        "description": "后台管理,后台,生成",
        //网站图标
        "favicon": ""
    },
    //自定义请求字段
    request: {
        tokenName: "token", //自动携带 token 的字段名（如：access_token）。可设置 false 不携带。
        //请求地址
        requestUrl: "http://localhost:8080",
        //文件上传
        fileUrl: "http://localhost:8080",
        //默认请求头
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
    },
    //自定义响应字段
    response: {
        statusName: 'code', //数据状态的字段名称
        statusCode: {
            ok: 0, //数据状态一切正常的状态码
            logout: 999 //登录状态失效的状态码
        },
        msgName: 'msg', //状态信息的字段名称
        dataName: 'data', //数据详情的字段名称
        listLotalName: "data.total", //表格最大数量参数
        listDataName: "data.data", //表格数据参数
        listPageSizeName: "pageSize",
        listPageName:"page"
    },
    "verifyList": [{
            name: "用户名验证",
            value: "username",
            verify: [{
                    rule: "!/^[a-zA-Z0-9_\\u4e00-\\u9fa5\\\\s·]+$/",
                    prompt: "用户名不能有特殊字符"
                },
                {
                    rule: "/(^\\_)|(\\__)|(\\_+$)/",
                    prompt: "用户名首尾不能出现下划线\'_\'"
                },
                {
                    rule: "/^\\d+\\d+\\d$/",
                    prompt: "用户名不能全为数字"
                },
            ]
        },
        {
            name: "密码验证",
            value: "password",
            verify: [{
                rule: "/^[\S]{6,12}$/",
                prompt: "密码必须6到12位，且不能出现空格"
            }]
        },
        {
            name: "数字验证",
            value: "number",
            verify: [{
                rule: "!/^\\b$/",
                prompt: "必须全部是数字"
            }]
        },
        {
            name: "手机号验证验证",
            value: "phone",
            verify: [{
                rule: "!/^1\\d{10}$/",
                prompt: "手机号格式不正确"
            }]
        },
        {
            name: "标题验证",
            value: "title",
            verify: [{
                rule: "!/.{5,}/",
                prompt: "标题至少得5个字符啊"
            }]
        },
    ],
    pages: [
        {
            //模板名称
            template: "login",
            pageType: "page",
            pageName:"login",
            leftLink: {
                title: "忘记密码？",
                path: "forget.html"
            },
            projectName: "一个后台管理",
            rightLink: {
                title: "去注册",
                path: "registered.html"
            },
            supplier: false,
            children: {
                title: "",
                name: "表单模块",
                content: [
                    {
                        template: "loginInput",
                        title: "用户名",
                        name: "username",
                        placeholder: "用户名",
                        icon: "layui-icon-username",
                        verify: "required",
                    },
                    {
                        template: "loginInput",
                        title: "密码",
                        name: "password",
                        inputType: "password",
                        placeholder: "密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                    },
                    {
                        template: "imgLoginInput",
                        title: "验证码",
                        placeholder: "验证码",
                        name: "code",
                        icon: "layui-icon-vercode",
                        codeUrl: "/public/setCode",
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
                        requestUrl: "/public/login",
                        data: "data",
                        method: "post",
                        resultName: "login",
                        storeData: "{userInfo:res}",
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
                                                routerUrl: "main.html"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
        },
        {
            //模板名称
            template: "login",
            pageType: "page",
            pageName:"forget",
            submitText: "找回密码",
            projectName: "忘记密码",
            rightLink: false,
            leftLink: {
                title: "已有账号？去登录",
                path: "login.html"
            },
            supplier: false,
            children: {
                title: "",
                name: "表单模块",
                content: [
                    {
                        template: "loginInput",
                        title: "手机号",
                        name: "phone",
                        placeholder: "手机号",
                        icon: "layui-icon-cellphone",
                        verify: "required|phone",
                    },
                    {
                        template: "phoneLoginInput",
                        title: "短信验证码",
                        placeholder: "短信验证码",
                        name: "code",
                        icon: "layui-icon-vercode",
                        verify: "required",
                        requestUrl: "/searchFriend",
                        phoneInputName: "phone",
                        method: "get",
                        phoneVerify: [
                            {
                                rule: "!/^1\\d{10}$/",
                                prompt: "手机号格式不正确"
                            }
                        ]
                    },
                    {
                        template: "loginInput",
                        title: "新密码",
                        inputType: "password",
                        name: "password",
                        placeholder: "新密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                    },
                    {
                        template: "loginInput",
                        title: "确认密码",
                        name: "confirmPassword",
                        inputType: "password",
                        placeholder: "确认密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                        comparedList: [
                            {
                                name: "password",
                                prompt: "两次密码不一致"
                            }
                        ]
                    },
                ]
            },
            md5: ["password", "confirmPassword"],
            children1: {
                title: "",
                name: "提交按钮模块",
                content: [
                    {
                        template: "request",
                        requestUrl: "/public/login",
                        data: "data",
                        method: "post",
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
                                                routerUrl: "login.html"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
        },
        {
            //模板名称
            template: "login",
            pageType: "page",
            pageName:"registered",
            submitText: "立即注册",
            projectName: "注册",
            rightLink: false,
            leftLink: {
                title: "已有账号？去登录",
                path: "login.html"
            },
            supplier: false,
            children: {
                title: "",
                name: "表单模块",
                content: [
                    {
                        template: "loginInput",
                        title: "手机号",
                        name: "phone",
                        placeholder: "手机号",
                        icon: "layui-icon-cellphone",
                        verify: "required|phone",
                    },
                    {
                        template: "phoneLoginInput",
                        title: "短信验证码",
                        placeholder: "短信验证码",
                        name: "code",
                        icon: "layui-icon-vercode",
                        verify: "required",
                        requestUrl: "/searchFriend",
                        phoneInputName: "phone",
                        method: "get",
                        phoneVerify: [
                            {
                                rule: "!/^1\\d{10}$/",
                                prompt: "手机号格式不正确"
                            }
                        ]
                    },
                    {
                        template: "loginInput",
                        title: "密码",
                        inputType: "password",
                        name: "password",
                        placeholder: "密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                    },
                    {
                        template: "loginInput",
                        title: "确认密码",
                        name: "confirmPassword",
                        inputType: "password",
                        placeholder: "确认密码",
                        icon: "layui-icon-password",
                        verify: "required|password",
                        comparedList: [
                            {
                                name: "password",
                                prompt: "两次密码不一致"
                            }
                        ]
                    },
                ]
            },
            md5: ["password", "confirmPassword"],
            children1: {
                title: "",
                name: "提交按钮模块",
                content: [
                    {
                        template: "request",
                        requestUrl: "/public/login",
                        data: "data",
                        method: "post",
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
                                                routerUrl: "main.html"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
        },
        {
            //模板名称
            template: "main",
            pageType: "page",
            pageName:"main",
            projectName: "后台管理",
            //右上角昵称
            nickname: "userInfo.nickname",
            //自定义右上角按钮
            customizeBut: [
                {
                    openPage: {
                        redDot: "userInfo.redDot",
                        href: "message.html",
                        title: "消息中心",
                    },
                    icon: "layui-icon-notice",
                    type: "message"
                },
                {
                    openPage: false,
                    icon: "layui-icon-theme",
                    type: "theme"
                },
                {
                    openPage: false,
                    icon: "layui-icon-note",
                    type: "note"
                },
                {
                    openPage: false,
                    icon: "layui-icon-screen-full",
                    type: "fullscreen"
                },
            ],
            defaultPage: {
                icon: "layui-icon-home",
                href: "home.html"
            },
            //导航配置
            leftNav: [
                {
                    title: "统计",
                    icon: "layui-icon-home",
                    href: "home.html",
                    spread: false,　　//是否默认展开
                },
                {
                    title: "表格",
                    icon: "layui-icon-home",
                    spread: true,　　//是否默认展开
                    children: [
                        {
                            title: "表格",
                            href: "table.html",
                        },
                    ]
                },
                {
                    title: "表单",
                    icon: "layui-icon-home",
                    children: [
                        {
                            title: "表单",
                            href: "form.html",
                        },
                    ]
                },
                {
                    title: "弹窗",
                    icon: "layui-icon-home",
                    children: [
                        {
                            title: "弹窗",
                            href: "popups.html",
                        },
                    ]
                }
            ]
        },
        {
            //模板名称
            pageType: "childPage",
            pageName:"home",
            children: {
                title: "",
                name: "页面模块",
                content: [
                    {
                        template: "statistics",
                        mdNum: 4,
                        smNum: 2,
                        list: [
                            {
                                name: "访问量",
                                label: "周",
                                value: "9,999,666",
                                bottomText: "总计访问量",
                                bottomValue: "88万",
                                bottomIcon:"layui-icon-flag"
                            },
                            {
                                name: "下载",
                                label: "月",
                                value: "33,555",
                                bottomText: "新下载",
                                bottomValue: "10%",
                                bottomIcon: "layui-icon-face-smile-b"
                            },
                            {
                                name: "收入",
                                label: "年",
                                value: "999,666",
                                bottomText: "总收入",
                                bottomValue: "***",
                                bottomIcon: "layui-icon-dollar"
                            },
                            {
                                name: "{{userInfo.nickname}}",
                                label: "月",
                                value: "66,666",
                                bottomText: "最近一个月",
                                bottomValue: "15%",
                                bottomIcon: "layui-icon-user"
                            },
                        ]
                    },
                    {
                        template: "request",
                        requestUrl: "/casual",
                        data: "{}",
                        method: "get",
                        children: {
                            title: "",
                            name: "请求结果模块",
                            content: [
                                {
                                    template: "grid",
                                    children: {
                                        title: "",
                                        lgNum: 6,
                                        mdNum: 6,
                                        name: "请求结果模块",
                                        content: [
                                            {
                                                template: "card",
                                                cardName: "今日流量趋势",
                                                children: {
                                                    title: "",
                                                    name: "卡片模块",
                                                    content: [
                                                        {
                                                            template: "chart",
                                                            chartId: "chart_1",
                                                            chartOption: `var chart_1 = {
                                                            title: {
                                                                text: "今日流量趋势",
                                                                x: "center",
                                                                textStyle: {
                                                                    fontSize: 14
                                                                }
                                                            }, tooltip: {
                                                                trigger: "axis"
                                                            }, legend: {
                                                                data: ["", ""]
                                                            }, xAxis: [{ type: "category", boundaryGap: !1, data: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"] }], yAxis: [{ type: "value" }], series: [{ name: "PV", type: "line", smooth: !0, itemStyle: { normal: { areaStyle: { type: "default" } } }, data: [111, 222, 333, 444, 555, 666, 3333, 33333, 55555, 66666, 33333, 3333, 6666, 11888, 26666, 38888, 56666, 42222, 39999, 28888, 17777, 9666, 6555, 5555, 3333, 2222, 3111, 6999, 5888, 2777, 1666, 999, 888, 777] }, { name: "UV", type: "line", smooth: !0, itemStyle: { normal: { areaStyle: { type: "default" } } }, data: [11, 22, 33, 44, 55, 66, 333, 3333, 5555, 12666, 3333, 333, 666, 1188, 2666, 3888, 6666, 4222, 3999, 2888, 1777, 966, 655, 555, 333, 222, 311, 699, 588, 277, 166, 99, 88, 77] }]
                                                        }`
                                                        },
                                                    ]
                                                }
                                            },
                                            
                                            
                                        ]
                                    },
                                    children1: {
                                        lgNum: 6,
                                        mdNum: 6,
                                        title: "",
                                        name: "请求结果模块",
                                        content: [
                                            {
                                                template: "card",
                                                cardName: "大数据量面积图",
                                                children: {
                                                    title: "",
                                                    name: "卡片模块",
                                                    content: [
                                                        {
                                                            template: "chart",
                                                            chartId: "chart_2",
                                                            chartOption: `var base = +new Date(1968, 9, 3);
                                                                var oneDay = 24 * 3600 * 1000;
                                                                var date = [];

                                                                var data = [Math.random() * 300];

                                                                for (var i = 1; i < 20000; i++) {
                                                                    var now = new Date(base += oneDay);
                                                                    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                                                                    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
                                                                }

                                                                var chart_2 = {
                                                                    tooltip: {
                                                                        trigger: 'axis',
                                                                        position: function (pt) {
                                                                            return [pt[0], '10%'];
                                                                        }
                                                                    },
                                                                    title: {
                                                                        left: 'center',
                                                                        text: '大数据量面积图',
                                                                    },
                                                                    toolbox: {
                                                                        feature: {
                                                                            dataZoom: {
                                                                                yAxisIndex: 'none'
                                                                            },
                                                                            restore: {},
                                                                            saveAsImage: {}
                                                                        }
                                                                    },
                                                                    xAxis: {
                                                                        type: 'category',
                                                                        boundaryGap: false,
                                                                        data: date
                                                                    },
                                                                    yAxis: {
                                                                        type: 'value',
                                                                        boundaryGap: [0, '100%']
                                                                    },
                                                                    dataZoom: [{
                                                                        type: 'inside',
                                                                        start: 0,
                                                                        end: 10
                                                                    }, {
                                                                        start: 0,
                                                                        end: 10,
                                                                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                                                        handleSize: '80%',
                                                                        handleStyle: {
                                                                            color: '#fff',
                                                                            shadowBlur: 3,
                                                                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                                                                            shadowOffsetX: 2,
                                                                            shadowOffsetY: 2
                                                                        }
                                                                    }],
                                                                    series: [
                                                                        {
                                                                            name:'模拟数据',
                                                                            type:'line',
                                                                            smooth:true,
                                                                            symbol: 'none',
                                                                            sampling: 'average',
                                                                            itemStyle: {
                                                                                color: 'rgb(255, 70, 131)'
                                                                            },
                                                                            areaStyle: {
                                                                                type: 'linear',
                                                                                x: 0,
                                                                                y: 0,
                                                                                x2: 0,
                                                                                y2: 1,
                                                                                colorStops: [{
                                                                                    offset: 0, color: 'red' // 0% 处的颜色
                                                                                }, {
                                                                                    offset: 1, color: 'blue' // 100% 处的颜色
                                                                                }],
                                                                                global: false // 缺省为 false
                                                                            },
                                                                            data: data
                                                                        }
                                                                    ]
                                                                };`
                                                        }
                                                    ]
                                                }
                                            },
                                            
                                        ]
                                    },
                                }
                            ]
                        },
                    }
                ]
            },
        },
        {
            //模板名称
            pageType: "childPage",
            pageName:"table",
            children: {
                title: "",
                name: "页面模块",
                content: [
                    {
                        template: "form_box",
                        buttonType: "none", //fixed,inline,block
                        children: {
                            title: "",
                            name: "表单form框模板",
                            content: [
                                {
                                    template: "form_item",
                                    children: {
                                        title: "",
                                        name: "表单form列表模板",
                                        content: [
                                            {
                                                template: "form_button",
                                                icon: "layui-icon-add-1",
                                                butId:"123",
                                                buttonText: "添加",
                                                children: {
                                                    title: "",
                                                    name: "按钮下子模板",
                                                    content: [{
                                                        template: "alert",
                                                        content: "'点击按钮！'",
                                                    }]
                                                }
                                            },
                                            {
                                                template: "form_item_inline",
                                                title: "用户名",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_input",
                                                            name: "username",
                                                            // verify:"required"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item_inline",
                                                title: "用户ID",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_input",
                                                            name: "id",
                                                            inputType: "number"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_button",
                                                formId: "fsdf5365",
                                                icon: "layui-icon-search",
                                                buttonType: "submit",
                                                buttonText: "搜索",
                                                templet: "loadTable(data);",
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    },
                    {
                        template: "card",
                        cardName:"表格模板",
                        children: {
                            title: "",
                            name: "表单form列表模板",
                            content: [
                                {
                                    template: "table",
                                    //表格id
                                    tableId: "56465464",
                                    //表头信息
                                    toolbar: [
                                        {
                                            title: "获取选中行数据",
                                            name: "getCheckData",
                                            //自定义js语法模板
                                            templet: "",
                                            children: {
                                                title: "",
                                                name: "表头信息",
                                                content: [
                                                    {
                                                        template: "alert",
                                                        content: "'点击按钮！'",
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    defaultToolbar: ['filter', 'print', 'exports'],
                                    //请求地址
                                    requestUrl: "/casual1",
                                    //表名称
                                    title: "表名称",
                                    //表高度
                                    height: "",
                                    //表格每一栏最小宽度
                                    cellMinWidth: 100,
                                    where:{a:1},
                                    //表格点击
                                    tableClick: {
                                        //自定义js语法模板
                                        templet: "",
                                        children: {
                                            title: "",
                                            name: "表格按钮信息",
                                            content: [
                                                {
                                                    template: "alert",
                                                    content: "'点击成功！'+data.username",
                                                }
                                            ]
                                        }
                                    },
                                    //表格参数设置
                                    cols: [
                                        [
                                            { type: 'checkbox', fixed: 'left' },
                                            { field: 'id', title: 'ID', width: 80, fixed: 'left', unresize: true, sort: true, totalRowText: '合计' },
                                            { field: 'username', title: '用户名', width: 120, edit: 'text' },
                                            { field: 'experience', title: '积分', width: 120, sort: true, totalRow: true },
                                            { field: 'sex', title: '性别', width: 80, edit: 'text', sort: true },
                                            { field: 'logins', title: '登入次数', width: 100, sort: true, totalRow: true },
                                            { field: 'sign', title: '签名' },
                                            {
                                                width: 200,
                                                title: '操作',
                                                templet: "<div>\
                                                <button class=\"layui-btn layui-btn-xs\" lay-event=\"edit\">编辑</button >\
                                                <button class=\"layui-btn layui-btn-xs layui-btn-danger\" lay-event=\"delete\">删除</button >\
                                            </div>",
                                                templetBut: [
                                                    {
                                                        layEvent: "edit",
                                                        //自定义js语法模板
                                                        templet: "",
                                                        children: {
                                                            title: "",
                                                            name: "表格按钮信息",
                                                            content: [
                                                                {
                                                                    template: "alert",
                                                                    content: "'编辑成功！'+data.username",
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        layEvent: "delete",
                                                        //自定义js语法模板
                                                        templet: "var a = 1;",
                                                        children: {
                                                            title: "",
                                                            name: "表头按钮信息",
                                                            content: [
                                                                {
                                                                    template: "alert",
                                                                    content: "'删除成功！'+data.username+a",
                                                                }
                                                            ]
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    ],
                                    //是否分页
                                    page: true
                                },
                            ]
                        }
                    }
                ]
            }
        },
        {
            //模板名称
            pageType: "childPage",
            pageName:"form",
            children: {
                title: "",
                name: "页面模块",
                content: [
                    {
                        template: "form_box",
                        buttonType: "fixed", //fixed,inline,block
                        children: {
                            title: "",
                            name: "表单form框模板",
                            content: [
                                {
                                    template: "card",
                                    cardName: "表格模板",
                                    children: {
                                        title: "",
                                        name: "卡片下的子模板",
                                        content: [
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_button",
                                                            icon: "layui-icon-add-1",
                                                            butId: "123",
                                                            buttonText: "添加",
                                                            children: {
                                                                title: "",
                                                                name: "按钮下子模板",
                                                                content: [{
                                                                    template: "alert",
                                                                    content: "'点击按钮！'",
                                                                }]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "标题",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "title",
                                                                        viewType: "block",
                                                                        verify: "title"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "验证必填项",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "username",
                                                                        viewType: "block",
                                                                        verify: "required"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "验证手机",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "phone",
                                                                        inputType: "tel",
                                                                        verify: "required|phone"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            template: "form_item_inline",
                                                            title: "验证邮箱",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "email",
                                                                        inputType: "email"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "多规则验证",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "number",
                                                                        verify: "required|number"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            template: "form_item_inline",
                                                            title: "时间选择",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_date",
                                                                        templateId: "1645612",
                                                                        name: "date",
                                                                    },
                                                                    {
                                                                        template: "form_item_line",
                                                                    },
                                                                    {
                                                                        template: "form_date",
                                                                        templateId: "32131",
                                                                        name: "endDate",
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            template: "form_item_inline",
                                                            title: "验证链接",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        verify: "url",
                                                                        name: "url",
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "验证身份证",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "identity",
                                                                        verify: "identity"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "密码",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "password",
                                                                        verify: "password"
                                                                    },
                                                                    {
                                                                        template: "form_item_prompt",
                                                                        prompt: "请填写6到12位密码",
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "范围",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_input",
                                                                        name: "price_min",
                                                                        inputType:"number",
                                                                        placeholder:"￥"
                                                                    },
                                                                    {
                                                                        template: "form_item_line",
                                                                    },
                                                                    {
                                                                        template: "form_input",
                                                                        name: "price_max",
                                                                        inputType: "number",
                                                                        placeholder: "￥"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "单行选择框",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_select",
                                                                        name: "interest",
                                                                        selectList: [
                                                                            {
                                                                                name: "写作",
                                                                                value:0
                                                                            },
                                                                            {
                                                                                name: "阅读",
                                                                                value: 1
                                                                            },
                                                                            {
                                                                                name: "游戏",
                                                                                value: 2
                                                                            },
                                                                            {
                                                                                name: "音乐",
                                                                                value: 3
                                                                            },
                                                                            {
                                                                                name: "旅行",
                                                                                value: 4
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "多选框",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_checkbox",
                                                                        checkboxList: [
                                                                            {
                                                                                title: "写作",
                                                                                name: "写作",
                                                                                value: 0,
                                                                                checked:true
                                                                            },
                                                                            {
                                                                                title: "阅读",
                                                                                name: "阅读",
                                                                                value: 1
                                                                            },
                                                                            {
                                                                                title: "游戏",
                                                                                name: "游戏",
                                                                                value: 2
                                                                            },
                                                                            {
                                                                                title: "音乐",
                                                                                name: "音乐",
                                                                                value: 3
                                                                            },
                                                                            {
                                                                                title: "旅行",
                                                                                name: "旅行",
                                                                                value: 4
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "开关",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_checkbox",
                                                                        skin:"switch",
                                                                        checkboxList: [
                                                                            {
                                                                                title: "写作",
                                                                                name: "写作",
                                                                                value: 0,
                                                                                checked: true
                                                                            },
                                                                            {
                                                                                title: "阅读",
                                                                                name: "阅读",
                                                                                value: 1,
                                                                                text:"开启|关闭"
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "单选框",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_radio",
                                                                        name: "text",
                                                                        checkedValue:1,
                                                                        radioList: [
                                                                            {
                                                                                title: "写作",
                                                                                value: 0,
                                                                            },
                                                                            {
                                                                                title: "阅读",
                                                                                value: 1
                                                                            },
                                                                            {
                                                                                title: "游戏",
                                                                                value: 2
                                                                            },
                                                                            {
                                                                                title: "音乐",
                                                                                value: 3
                                                                            },
                                                                            {
                                                                                title: "旅行",
                                                                                value: 4
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                            {
                                                template: "form_item",
                                                children: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_item_inline",
                                                            title: "文本域",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_textarea",
                                                                        name: "text",
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        children1: {
                            title: "",
                            name: "表单form列表模板",
                            content: [
                                {
                                    template: "form_button",
                                    formId: "fsdf3443",
                                    buttonType: "submit",
                                    buttonText: "立即提交",
                                    children: {
                                        title: "",
                                        name: "按钮下子模板",
                                        content: [{
                                            template: "alert",
                                            content: "'点击按钮！'",
                                        }]
                                    }
                                },
                                {
                                    template: "form_button",
                                    buttonText: "返回",
                                    butId:"fanhui",
                                    children: {
                                        title: "",
                                        name: "按钮下子模板",
                                        content: [{
                                            template: "alert",
                                            content: "'点击按钮！'",
                                        }]
                                    }
                                },
                            ]
                        }
                    },
                ]
            }
        },
        {
            //模板名称
            pageType: "childPage",
            pageName:"popups",
            children: {
                title: "",
                name: "页面模块",
                content: [
                    {
                        template: "form_button",
                        buttonText: "弹窗",
                        butId: "tanchaung",
                        children: {
                            title: "",
                            name: "按钮下子模板",
                            content: [
                                {
                                    template: "popups",
                                    popupsId: 6546514,
                                    children: {
                                        title: "",
                                        name: "按钮下子模板",
                                        content: [
                                            {
                                                template: "form_box",
                                                buttonType: "block", //fixed,inline,block
                                                children: {
                                                    title: "",
                                                    name: "表单form框模板",
                                                    content: [
                                                        
                                                        {
                                                            template: "form_item",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_item_inline",
                                                                        title: "标题",
                                                                        children: {
                                                                            title: "",
                                                                            name: "表单form列表模板",
                                                                            content: [
                                                                                {
                                                                                    template: "form_input",
                                                                                    name: "title",
                                                                                    viewType: "block",
                                                                                    verify: "title"
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            template: "form_item",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_item_inline",
                                                                        title: "单选框",
                                                                        children: {
                                                                            title: "",
                                                                            name: "表单form列表模板",
                                                                            content: [
                                                                                {
                                                                                    template: "form_radio",
                                                                                    name: "text",
                                                                                    checkedValue: 1,
                                                                                    radioList: [
                                                                                        {
                                                                                            title: "写作",
                                                                                            value: 0,
                                                                                        },
                                                                                        {
                                                                                            title: "阅读",
                                                                                            value: 1
                                                                                        },
                                                                                        {
                                                                                            title: "游戏",
                                                                                            value: 2
                                                                                        },
                                                                                        {
                                                                                            title: "音乐",
                                                                                            value: 3
                                                                                        },
                                                                                        {
                                                                                            title: "旅行",
                                                                                            value: 4
                                                                                        },
                                                                                    ]
                                                                                },
                                                                            ]
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            template: "form_item",
                                                            children: {
                                                                title: "",
                                                                name: "表单form列表模板",
                                                                content: [
                                                                    {
                                                                        template: "form_item_inline",
                                                                        title: "文本域",
                                                                        children: {
                                                                            title: "",
                                                                            name: "表单form列表模板",
                                                                            content: [
                                                                                {
                                                                                    template: "form_textarea",
                                                                                    name: "text",
                                                                                },
                                                                            ]
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        },       
                                                    ]
                                                },
                                                children1: {
                                                    title: "",
                                                    name: "表单form列表模板",
                                                    content: [
                                                        {
                                                            template: "form_button",
                                                            formId: "fsdf3443",
                                                            buttonType: "submit",
                                                            buttonText: "立即提交",
                                                            children: {
                                                                title: "",
                                                                name: "按钮下子模板",
                                                                content: [{
                                                                    template: "alert",
                                                                    content: "'点击按钮！'",
                                                                }]
                                                            }
                                                        },
                                                        {
                                                            template: "form_button",
                                                            buttonText: "关闭",
                                                            butId: "guanbi",
                                                            children: {
                                                                title: "",
                                                                name: "按钮下子模板",
                                                                content: [
                                                                    {
                                                                        template: "alert",
                                                                        content: "'点击按钮！'",
                                                                    },
                                                                    {
                                                                        template: "popups_close",
                                                                        popupsId: 6546514
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                    ]
                                                }
                                            },
                                        ]
                                    }
                                }]
                        }
                    }
                    
                ]
            }
        }
    ]
};