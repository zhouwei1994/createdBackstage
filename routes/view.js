var viewRend = require('./../app/module/viewRend');
module.exports = function (router, check) {
    //登录页面
    router.get('/login.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type', 'text/html');
        var login = {
            //模板名称
            template: "login",
            pageType: "page",
            forget: {
                title: "忘记密码？",
                path: "forget.html"
            },
            projectName: "一个后台管理",
            registered: {
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
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({}, 2001, html);
                console.error(html);
            }
        });
    }));
    //忘记密码页面
    router.get('/forget.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type', 'text/html');
        var login = {
            //模板名称
            template: "login",
            pageType: "page",
            submitText: "找回密码",
            projectName: "忘记密码",
            registered: false,
            forget: {
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
                        requestUrl: "/user/login",
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
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({}, 2001, html);
                console.error(html);
            }
        });
    }));
    //注册页面
    router.get('/registered.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type', 'text/html');
        var login = {
            //模板名称
            template: "login",
            pageType: "page",
            submitText: "立即注册",
            projectName: "注册",
            registered: false,
            forget: {
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
                        requestUrl: "/user/login",
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
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({}, 2003, html);
                console.error(html);
            }
        });
    }));
    //主页面
    router.get('/main.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type', 'text/html');
        var login = {
            //模板名称
            template: "main",
            pageType: "page",
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
                    name:"a"
                },
                {
                    title: "表格",
                    icon: "layui-icon-home",
                    name: "b",
                    list: [
                        {
                            title: "表格",
                            href: "table.html",
                            name: "b1",
                        },
                        {
                            title: "表格1",
                            href: "home2.html",
                            name: "b2",
                        },
                    ]
                }
            ]
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({}, 2004, html);
                console.error(html);
            }
        });
    }));
    router.get('/home.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type', 'text/html');
        var login = {
            //模板名称
            pageType: "childPage",
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
                                    },
                                    children1: {
                                        lgNum: 6,
                                        mdNum: 6,
                                        title: "",
                                        name: "请求结果模块",
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
                                    },
                                }
                            ]
                        },
                    }
                ]
            }
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({}, 2004, html);
                console.error(html);
            }
        });
    }));
    router.get('/table.html', check([], function (req, res) {
        //设置html请求头
        res.set('Content-Type', 'text/html');
        var login = {
            //模板名称
            pageType: "childPage",
            children: {
                title: "",
                name: "页面模块",
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
                                templet:"",
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
                        //表格参数设置
                        cols:[
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
                                    templet: "var text = '';\
                                                if(1) {\
                                                    text += '<button class=\"layui-btn layui-btn-xs\" lay-event=\"edit\">编辑\
                                                            </button >';\
                                                    text += '<button class=\"layui-btn layui-btn-xs  layui-btn-danger\">删除\
                                                            </button >';\
                                                }\
                                            return text;"
                                },
                            ]
                        ],
                        //是否分页
                        page:true
                    },
                ]
            }
        };
        viewRend(login, function (state, html) {
            if (state) {
                res.end(html.templateHtml);
            } else {
                res.result({}, 2004, html);
                console.error(html);
            }
        });
    }));
};