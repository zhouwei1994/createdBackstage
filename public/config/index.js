/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
layui.extend({
    setter: "/config/config",
    admin: "/config/admin",
    view: "/config/view",
    $http: "/config/request",
    dataDom: "/config/dataDom",
    echarts: "/config/extend/echarts",
    echartsTheme: "/config/extend/echartsTheme",
}).define(["setter", "admin", "$http", "dataDom", "echarts", "echartsTheme"], function (a) {
    var e = layui.setter,
        i = layui.element,
        n = layui.admin,
        t = n.tabsPage,
        d = layui.view,
        l = function (a, d) {
            var l,
                b = r("#LAY_app_tabsheader>li"),
                y = a.replace(/(^http(s*):)|(\?[\s\S]*$)/g, "");
            if (b.each(function (e) {
                    var i = r(this),
                        n = i.attr("lay-id");
                    n === a && (l = !0, t.index = e)
                }),
                d = d || "新标签页",
                e.pageTabs) l || (r(s).append(['<div class="layadmin-tabsbody-item layui-show">',
                '<iframe src="' + a + '" frameborder="0" class="layadmin-iframe"></iframe>', "</div>"
            ].join("")), t.index = b.length, i.tabAdd(o, {
                title: "<span>" + d + "</span>",
                id: a,
                attr: y
            }));
            else {
                var u = n.tabsBody(n.tabsPage.index).find(".layadmin-iframe");
                u[0].contentWindow.location.href = a
            }
            i.tabChange(o, a), n.tabsBodyChange(t.index, {
                url: a,
                text: d
            })
        },
        s = "#LAY_app_body",
        o = "layadmin-layout-tabs",
        r = layui.$;
        r(window);
        n.screen() < 2 && n.sideFlexible(),
        layui.config({
            base: e.base + "modules/"
        }),
        layui.each(e.extend, function (a, i) {
            var n = {};
            n[i] = "{/}" + e.base + "config/extend/" + i, layui.extend(n)
        }),
        d().autoRender(),
        a("index", {
            openTabsPage: l
        })
});