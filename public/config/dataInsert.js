/**
  request模块
**/
layui.define(['layer'], function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    function trim(str) {
        return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
    }
    function jsMatch(value, data) {
        for (var key in data) {
            var reg = new RegExp(key, "g");
            var matchList = value.match(reg);
            if (matchList) {
                for (var m = 0; m < matchList.length; m++) {
                    var x = value.indexOf(matchList[m]);
                    for (var w = 1; w < m + 1; w++) {
                        x = value.indexOf(matchList[m], x + 1);
                    }
                    if (x == 0) {
                        value = "data." + value;
                    } else {
                        var value1 = value.substring(x - 1, x);
                        if (value1 != "." && value1 != "'" && value1 != '"' && value1 != ':') {
                            value = value.substring(0, x) + "data." + value.substring(x);
                        }
                    }
                }
            }
        }
        return value;
    }
    function dataInsert(el, data) {
        var $el = document.getElementById(el);
        var domList = [];
        var waitWithList = [];
        function render(options) {
            var len = domList.length;
            for (var index = 0; index < len; index++) {
                var item = domList[index];
                if (options && item.make == "v-for") {
                    var value = options;
                    console.log(value);
                    var arr = item.route.split('.');
                    var state = true;
                    for (var key = 0; key < arr.length; key++) {
                        if (value[arr[key]]) {
                            value = value[arr[key]];
                        } else {
                            state = false;
                            break;
                        }
                    }
                    if (state) {
                        waitWithList = [];
                        var listLen = value.length;
                        for (var itemIndex = 0; itemIndex < listLen; itemIndex++) {
                            var dom = domReplace(item.node.cloneNode(true), { item: value[itemIndex], index: itemIndex }, false);
                            if (item.getNextSibling) {
                                item.parent.insertBefore(dom, item.getNextSibling);
                            } else {
                                item.parent.insertBefore(dom, item.getNextSibling);
                            }
                        }
                        for (var r = 0; r < item.removeList.length; r++) {
                            item.parent.removeChild(item.removeList[r]);
                        }
                        //处理元素
                        if (waitWithList.length > 0) {
                            console.log(waitWithList);
                            for (var a = 0; a < waitWithList.length; a++) {
                                var item = waitWithList[a];
                                if (item.value1) {
                                    item.aims[item.type](item.value, item.value1);
                                } else {
                                    item.aims[item.type](item.value);
                                }
                            }
                        }
                    }
                } else if (item.make == "v-show") {
                    var booleanVal = eval(item.route);
                    if (booleanVal != item.oldValue) {
                        if (booleanVal) {
                            item.node.style.display = "inherit";
                        } else {
                            item.node.style.display = "none";
                        }
                    }
                } else if (item.type == "attr") {
                    var newVal = eval(item.route);
                    if (newVal != item.oldValue) {
                        item.aims.setAttribute(item.make, newVal)
                    }
                } else {
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
        }
        this.setData = function (options) {
            for (var key in options) { //遍历json对象的每个key/value对,p为key
                data[key] = options[key];
            }
            render(options);
        };
        domReplace($el, data, true);
        //处理元素
        if (waitWithList.length > 0) {
            for (var a = 0; a < waitWithList.length; a++) {
                var item = waitWithList[a];
                if (item.value1) {
                    item.aims[item.type](item.value, item.value1);
                } else {
                    item.aims[item.type](item.value);
                }
            }
        }
        function domReplace(frag, data, store) {
            var childNodes = frag.childNodes;
            var childlen = childNodes.length;
            for (var i = 0; i < childlen; i++) {
                var node = childNodes[i];
                var txt = node.textContent;
                var isChildlen = true;
                var reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}

                if (node.nodeType === 3) { // 即是文本节点又有大括号的情况{{}}
                    var txtList = txt.match(reg);
                    if (txtList) {
                        var txtLen = txtList.length
                        for (var t = 0; t < txtLen; t++) {
                            var arrtext = txtList[t].substring(2, txtList[t].length - 2);
                            var arr = arrtext.split('.')
                            var val = data;
                            for (var key = 0; key < arr.length; key++) {
                                val = val[arr[key]];
                            }
                            // 用trim方法去除一下首尾空格
                            node.textContent = node.textContent.replace(txtList[t], val).trim();
                            if (store) {
                                domList.push({
                                    node: node,
                                    make: "",
                                    type: "textContent",
                                    oldValue: val,
                                    initValue: txt,
                                    route: arrtext
                                });
                            }
                        }
                    }
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
                            if (store) {
                                domList.push({
                                    node: node,
                                    make: name,
                                    type: "value",
                                    oldValue: value,
                                    route: attr.value
                                });
                            }
                            // else {
                            //     waitWithList.push({
                            //         aims: node,
                            //         type: "removeAttribute",
                            //         value: name,
                            //     });
                            // }
                            node.addEventListener('input', e => {
                                var newVal = e.target.value;
                                var arr = e.target.getAttribute("v-model").split('.');
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
                            if (store) {
                                domList.push({
                                    node: node,
                                    make: name,
                                    type: "innerText",
                                    oldValue: value,
                                    route: attr.value
                                });
                            } else {
                                waitWithList.push({
                                    aims: node,
                                    type: "removeAttribute",
                                    value: name,
                                });
                            }
                            node.innerText = value;
                        } else if (name == 'v-html') {
                            for (var key = 0; key < arr.length; key++) {
                                value = value[arr[key]];
                            }
                            if (store) {
                                domList.push({
                                    node: node,
                                    make: name,
                                    type: "innerHTML",
                                    oldValue: value,
                                    route: attr.value
                                });
                            } else {
                                waitWithList.push({
                                    aims: node,
                                    type: "removeAttribute",
                                    value: name,
                                });
                            }
                            node.innerHTML = value;
                        } else if (name == 'v-show') {
                            var showValue = jsMatch(attr.value, data);
                            var booleanVal = eval(showValue);
                            if (booleanVal) {
                                node.style.display = "inherit";
                            } else {
                                node.style.display = "none";
                            }
                            if (store) {
                                domList.push({
                                    node: node,
                                    make: name,
                                    type: "style",
                                    oldValue: booleanVal,
                                    route: showValue
                                });
                            } else {
                                waitWithList.push({
                                    aims: node,
                                    type: "removeAttribute",
                                    value: name,
                                });
                            }
                        } else if (name == 'v-for') {
                            isChildlen = false;
                            for (var key = 0; key < arr.length; key++) {
                                value = value[arr[key]];
                            }
                            waitWithList.push({
                                aims: node,
                                type: "removeAttribute",
                                value: "v-for",
                            });
                            var getNextSibling = null;
                            findSibling(node);
                            function findSibling(dom) {
                                var sibling = dom.nextSibling;
                                if (sibling) {
                                    if (sibling.nodeName == "#text") {
                                        findSibling(sibling);
                                    } else {
                                        getNextSibling = sibling;
                                    }
                                }
                            }
                            var getParentNode = node.parentNode;
                            var listLen = value.length;
                            var forDomList = new Array;
                            for (var itemIndex = 0; itemIndex < listLen; itemIndex++) {
                                var dom = domReplace(node.cloneNode(true), { item: value[itemIndex], index: itemIndex }, false);
                                forDomList.push(dom);
                                if (getNextSibling) {
                                    waitWithList.push({
                                        aims: getParentNode,
                                        type: "insertBefore",
                                        value: dom,
                                        value1: getNextSibling,
                                    });
                                } else {
                                    waitWithList.push({
                                        aims: getParentNode,
                                        type: "appendChild",
                                        value: dom,
                                    });
                                }
                            }
                            if (store) {
                                domList.push({
                                    node: node,
                                    getNextSibling: getNextSibling,
                                    make: name,
                                    type: "for",
                                    parent: getParentNode,
                                    route: attr.value,
                                    removeList: forDomList
                                });
                            }
                            waitWithList.push({
                                aims: getParentNode,
                                type: "removeChild",
                                value: node,
                                value1: node,
                            });
                        } else if (/^:/.test(name)) {
                            var showValue = jsMatch(attr.value, data);
                            var stringValue = eval(showValue);
                            waitWithList.push({
                                aims: node,
                                type: "setAttribute",
                                value: name.substring(1),
                                value1: stringValue
                            });
                            waitWithList.push({
                                aims: node,
                                type: "removeAttribute",
                                value: name,
                            });
                            if (store) {
                                domList.push({
                                    node: node,
                                    make: name.substring(1),
                                    type: "attr",
                                    oldValue: stringValue,
                                    route: showValue
                                });
                            }
                        }
                    }
                }
                // 如果还有子节点，继续递归replace
                if (isChildlen && node.childNodes && node.childNodes.length) {
                    domReplace(node, data, store);
                }
            }
            return frag;
        }
    }
    //输出test接口
    exports('dataInsert', function (el, data) {
        return new dataInsert(el, data);
    });
});