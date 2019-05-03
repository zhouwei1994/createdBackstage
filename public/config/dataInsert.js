/**
  request模块
**/
layui.define(['layer'], function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    function trim(str) {
        return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
    }

    function dataInsert(el, data) {
        var $el = document.getElementById(el);
        var domList = [];

        function render() {
            var len = domList.length;
            for (var index = 0; index < len; index++) {
                var item = domList[index];
                var value = data;
                var arr = item.route.split('.');
                for (var key = 0; key < arr.length; key++) {
                    value = value[arr[key]];
                }
                if (item.oldValue != value) {
                    if (item.type == "textContent") {
                        item.node[item.type] = item.initValue.replace(/\{\{(.*?)\}\}/g, value).trim();
                    } else {
                        item.node[item.type] = value;
                    }
                    domList.oldValue = value;
                }
            }
        }
        this.setData = function (options) {
            for (var key in options) { //遍历json对象的每个key/value对,p为key
                data[key] = options[key];
            }
            render();
        };
        domReplace($el, data);

        function domReplace(frag, data) {
            var childNodes = frag.childNodes;
            var childlen = childNodes.length;
            for (var i = 0; i < childlen; i++) {
                var node = childNodes[i];
                var txt = node.textContent;
                var reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}
                if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
                    var arr = RegExp.$1.split('.');
                    var val = data;
                    for (var key = 0; key < arr.length; key++) {
                        val = val[arr[key]];
                    }
                    // 用trim方法去除一下首尾空格
                    node.textContent = txt.replace(reg, val).trim();
                    domList.push({
                        node: node,
                        type: "textContent",
                        oldValue: val,
                        initValue: txt,
                        route: RegExp.$1
                    });
                }
                if (node.nodeType === 1) { // 元素节点
                    var nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
                    var attrLen = nodeAttr.length;
                    for (var j = 0; j < attrLen; j++) {
                        var attr = nodeAttr[j];
                        var name = attr.name;
                        var arr = attr.value.split('.');
                        var value = data;

                        if (name == 'v-model') {
                            for (var key = 0; key < arr.length; key++) {
                                value = value[arr[key]];
                            }
                            node.value = value;
                            domList.push({
                                node: node,
                                type: "value",
                                oldValue: value,
                                route: attr.value
                            });
                            node.addEventListener('input', e => {
                                var newVal = e.target.value;
                                var val = data;
                                for (var key = 0; key < arr.length; key++) {
                                    if (key === arr.length - 1) {
                                        val[arr[key]] = newVal;
                                        render();
                                        return
                                    }
                                    val = val[arr[key]];
                                }
                            });
                        } else if (name == 'v-text') {
                            for (var key = 0; key < arr.length; key++) {
                                value = value[arr[key]];
                            }
                            domList.push({
                                node: node,
                                type: "innerText",
                                oldValue: value,
                                route: attr.value
                            });
                            node.innerText = value;
                        } else if (name == 'v-html') {
                            for (var key = 0; key < arr.length; key++) {
                                value = value[arr[key]];
                            }
                            domList.push({
                                node: node,
                                type: "innerHTML",
                                oldValue: value,
                                route: attr.value
                            });
                            node.innerHTML = value;
                        } else if (name == 'v-show') {
                            domList.push({
                                node: node,
                                type: "innerHTML",
                                oldValue: value,
                                route: attr.value
                            });
                            if (value) {

                            }
                            node.stype.display = value;
                        }
                    }
                }
                // 如果还有子节点，继续递归replace
                if (node.childNodes && node.childNodes.length) {
                    domReplace(node, data);
                }
            }

        }
    }
    //输出test接口
    exports('dataInsert', function (el, data) {
        return new dataInsert(el, data);
    });
});