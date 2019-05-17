//去收尾空格
function trim(str) {
    return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}
//{{}}里方法获取数据值
function jsMatch(text, data, callback) {
    if (text && trim(text)) {
        var reg = /\{\{(.*?)\}\}/g;
        var backString = false;
        if (text.replace(reg, "")) {
            backString = true;
        };
        var textList = text.match(reg);
        //条件列表
        var conditionList = [];
        //js方法列表
        var jsList = [];
        if (textList) {
            var textLen = textList.length;
            for (var t = 0; t < textLen; t++) {
                var arrtext = textList[t].substring(2, textList[t].length - 2);
                conditionList.push(arrtext);
                for (var key in data) {
                    var keyReg = new RegExp(key, "g");
                    var matchList = arrtext.match(keyReg);
                    if (matchList) {
                        for (var m = 0; m < matchList.length; m++) {
                            var x = arrtext.indexOf(matchList[m]);
                            for (var w = 1; w < m + 1; w++) {
                                x = arrtext.indexOf(matchList[m], x + 1);
                            };
                            if (x == 0) {
                                arrtext = "data." + arrtext;
                            } else {
                                var value1 = arrtext.substring(x - 1, x);
                                if (value1 != "." && value1 != "'" && value1 != '"' && value1 != ':') {
                                    arrtext = arrtext.substring(0, x) + "data." + arrtext.substring(x);
                                };
                            };
                        }
                    }
                }
                try {
                    jsList.push(arrtext);
                    var dataVal = eval(arrtext);
                    if (!backString && textLen <= 1) {
                        text = dataVal;
                    } else {
                        text = text.replace(textList[t], dataVal)
                    }
                } catch (err) {
                    // console.log(err);
                    text = false;
                }
            }
            callback && callback(text, conditionList, jsList);
        } else {
            callback && callback(false, conditionList, jsList);
        }
    } else {
        callback && callback(false, [], []);
    }
}

function dataDom(el, data) {
    var $el = document.getElementById(el);
    //页面数据替换节点集合
    var domList = [];
    //待操作dom元素的方法集合
    var waitWithList = [];
    var _this = this;
    //页面数据更新
    this.render = function (options, attrValue) {
        var len = domList.length;
        for (var index = 0; index < len; index++) {
            var domItem = domList[index];
            if (options && domItem.make == "v-for") {
                jsMatch(domItem.initValue, options, function (showValue){
                    if (showValue) {
                        waitWithList = [];
                        var forDomList = [];
                        var listLen = showValue.length;
                        var childData = {};
                        for (var dataKey in data) {
                            childData[dataKey] = data[dataKey];
                        };
                        for (var itemIndex = 0; itemIndex < listLen; itemIndex++){
                            childData[domItem.forConfig.item] = showValue[itemIndex];
                            childData[domItem.forConfig.index] = itemIndex;
                            var newNode = domItem.node.cloneNode(true);
                            newNode.removeAttribute("v-for");
                            attrData(newNode, childData, false, function (newNode, newIsChildlen) {
                                if (newIsChildlen) {
                                    var dom = domReplace(newNode, childData, false);
                                    forDomList.push(dom);
                                    if (domItem.getNextSibling) {
                                        domItem.parent.insertBefore(dom, domItem.getNextSibling);
                                    } else {
                                        domItem.parent.appendChild(dom);
                                    }
                                }
                            });
                        }
                        for (var r = 0; r < domItem.removeList.length; r++) {
                            domItem.parent.removeChild(domItem.removeList[r]);
                        }
                        domItem.removeList = forDomList;
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
                    }
                });
            } else if (domItem.make == "v-show") {
                jsMatch(domItem.initValue, data, function (showValue) {
                    if (domItem.oldValue !== showValue) {
                        if (showValue) {
                            domItem.node.style.display = "inherit";
                        } else {
                            domItem.node.style.display = "none";
                        }
                        domItem.oldValue = showValue;
                    }
                });
            } else if (domItem.make == "v-if") {
                var newTrueNode = "";
                if (domItem.trueNode) {
                    try {
                        domItem.parent.removeChild(domItem.trueNode);
                    } catch (error) {
                        console.log(error);
                    }
                }
                var ifListLen = domItem.ifNodeList.length;
                ifRecursive(0);
                function ifRecursive(index) {
                    var ifNode = domItem.ifNodeList[index];
                    // console.log(ifNode);
                    if (ifNode.ifInst == "v-else") {
                        attrData(ifNode.node, data, false, function (newNode, newIsChildlen) {
                            newTrueNode = newNode;
                            if (domItem.getNextSibling) {
                                domItem.parent.insertBefore(newNode, domItem.getNextSibling);
                            } else {
                                domItem.parent.appendChild(newNode);
                            }
                        });
                    } else {
                        jsMatch(ifNode.ifInst, data, function (showValue) {
                            if (showValue) {
                                attrData(ifNode.node, data, false, function (newNode, newIsChildlen) {
                                    newTrueNode = newNode;
                                    if (domItem.getNextSibling) {
                                        domItem.parent.insertBefore(newNode, domItem.getNextSibling);
                                    } else {
                                        domItem.parent.appendChild(newNode);
                                    }
                                });
                            } else if (index < ifListLen - 1){
                                ifRecursive(index + 1);
                            }
                        });
                    }
                }
                domItem.trueNode = newTrueNode;
            } else {
                jsMatch(domItem.initValue, data, function (showValue) {
                    if (showValue && domItem.oldValue != showValue) {
                        if (domItem.type == "setAttribute") {
                            domItem.node.setAttribute(domItem.make, showValue);
                            domItem.oldValue = showValue;
                        } else if (attrValue && domItem.node.nodeName == "INPUT") {

                        } else {
                            domItem.node[domItem.type] = showValue;
                            domItem.oldValue = showValue;
                        }
                    }
                });
            }
        }
    }
    function attrData(node, data, store, callback, type) {
        var isChildlen = true;
        if (node.hasAttribute("v-for")) {
            var forConfig = {
                item: "item",
                index: "index",
            };
            var attrValue = node.getAttribute("v-for");
            //获取for循环的数据名称和索引名称
            attrValue = attrValue.replace(/\:\((.*?)\,(.*?)\)/g, "");
            forConfig.item = RegExp.$1;
            forConfig.index = RegExp.$2;
            jsMatch(attrValue, data, function (text, conditionList, jsList) {
                if (text) {
                    isChildlen = false;
                    var getNextSibling = node.nextElementSibling;
                    var getParentNode = node.parentNode;
                    var listLen = text.length;
                    var childData = {};
                    var forDomList = new Array;
                    for (var dataKey in data) {
                        childData[dataKey] = data[dataKey];
                    }
                    for (var itemIndex = 0; itemIndex < listLen; itemIndex++) {
                        childData[forConfig.item] = text[itemIndex];
                        childData[forConfig.index] = itemIndex;
                        var newNode = node.cloneNode(true);
                        newNode.removeAttribute("v-for");
                        attrData(newNode, childData, false, function (newNode, newIsChildlen) {
                            if (newIsChildlen) {
                                var dom = domReplace(newNode, childData, false);
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
                        });

                    }
                    domList.push({
                        node: node,
                        make: "v-for",
                        initValue: attrValue,
                        oldValue: text,
                        removeList: forDomList,
                        getNextSibling: getNextSibling,
                        type: "v-for",
                        parent: getParentNode,
                        forConfig: forConfig,
                    });
                    waitWithList.push({
                        aims: getParentNode,
                        type: "removeChild",
                        value: node
                    });
                }
            });
        } else if (node.hasAttribute("v-else") || node.hasAttribute("v-else-if")) {
            isChildlen = false;
        } else if (node.hasAttribute("v-if")) {
            var attrValue = node.getAttribute("v-if");
            node.removeAttribute("v-if");
            var ifNodeList = new Array;
            var getParentNode = node.parentNode;
            var lastNewIsChildlen = "";
            var trueNode = "";
            recursive(attrValue, node, false);
            function recursive(val, node, result) {
                ifNodeList.push({
                    node: node,
                    ifInst: val,
                    value: result
                });
                if (val == "v-else") {
                    if (result) {
                        if (getParentNode) {
                            waitWithList.push({
                                aims: getParentNode,
                                type: "removeChild",
                                value: node
                            });
                        }
                    } else {
                        attrData(node, data, store, function (newNode, newIsChildlen) {
                            trueNode = newNode;
                            isChildlen = newIsChildlen;
                        });
                    }
                } else {
                    var nextSibling = node.nextElementSibling;
                    var nextValue = false;
                    if (nextSibling) {
                        if (nextSibling.hasAttribute("v-else-if")) {
                            nextValue = nextSibling.getAttribute("v-else-if");
                            nextSibling.removeAttribute("v-else-if");
                        } else if (nextSibling.hasAttribute("v-else")) {
                            nextSibling.removeAttribute("v-else");
                            nextValue = "v-else";
                        } else {
                            lastNewIsChildlen = node.nextElementSibling ? node.nextElementSibling : "";
                        }
                    }
                    if (result) {
                        if (getParentNode) {
                            waitWithList.push({
                                aims: getParentNode,
                                type: "removeChild",
                                value: node
                            });
                        }
                        if (nextValue) {
                            recursive(nextValue, nextSibling, true);
                        }
                    } else {
                        jsMatch(val, data, function (text, conditionList, jsList) {
                            if (text) {
                                attrData(node, data, store, function (newNode, newIsChildlen) {
                                    trueNode = newNode;
                                    isChildlen = newIsChildlen;
                                });
                                if (nextValue) {
                                    recursive(nextValue, nextSibling, true);
                                }
                            } else {
                                if (getParentNode) {
                                    waitWithList.push({
                                        aims: getParentNode,
                                        type: "removeChild",
                                        value: node
                                    });
                                }
                                if (nextValue) {
                                    recursive(nextValue, nextSibling, false);
                                }
                            }
                        });
                    }
                }
            };
            if (!trueNode) {
                isChildlen = false;
            }
            if (getParentNode && store) {
                var domConfig = {
                    node: node,
                    make: "v-if",
                    getNextSibling: lastNewIsChildlen,
                    parent: getParentNode,
                    ifNodeList: ifNodeList,
                    trueNode: trueNode
                }
                domList.push(domConfig);
            }
        } else {
            //标签节点数据处理
            var nodeAttr = node.attributes;
            var attrLen = nodeAttr.length;
            //循环单一标签所有属性
            for (var j = 0; j < attrLen; j++) {
                var attr = nodeAttr[j];
                var name = attr.name;
                var attrValue = attr.value;
                //ie8不支持style="{{}}"会识别为语法错误，ie8需要用:style
                if (name == ":style") {
                    name = "style";
                }
                //判断属性值是否有{{}}，如果有并返回值
                jsMatch(attrValue, data, function (text, conditionList, jsList) {
                    var domConfig = {
                        node: node,
                        make: name,
                        initValue: attrValue,
                        oldValue: text
                    };
                    var isRemove = false;
                    if (name == 'v-show') {
                        if (text) {
                            node.style.display = "inherit";
                        } else {
                            node.style.display = "none";
                        };
                        domConfig.type = "style";
                        isRemove = true;
                    } else if (text) { //返回的值是true才执行下面代码
                        if (node.nodeName == "INPUT" || node.nodeName == "TEXTAREA") {
                            node.value = text;
                            domConfig.type = "value";
                            getinput(node, jsList[0]);
                            //input输入框数据绑定
                            function getinput(node, jsNode, attrValue) {
                                //判断浏览器是否支持addEventListener
                                if (node.addEventListener) {
                                    node.addEventListener('input', function (e) {
                                        var newVal = e.target.value;
                                        eval(jsNode + "='" + newVal + "'");
                                        _this.render();
                                    });
                                } else {
                                    node.onpropertychange = function (e) {
                                        var newVal = node.value;
                                        eval(jsNode + "='" + newVal + "'");
                                        _this.render("", attrValue);
                                    }
                                }
                            }
                            isRemove = true;
                        } else if (name == 'v-text') {
                            domConfig.type = "innerText";
                            node.innerText = text;
                            isRemove = true;
                        } else if (name == 'v-html') {
                            domConfig.type = "innerHTML";
                            node.innerHTML = text;
                            isRemove = true;
                        } else {
                            node.setAttribute(name, text);
                            domConfig.type = "setAttribute";
                        }
                    }
                    if (store) {
                        domList.push(domConfig);
                    }
                    if (isRemove) {
                        waitWithList.push({
                            aims: node,
                            type: "removeAttribute",
                            value: attr.name,
                        });
                    }
                });
            };
        }
        callback && callback(node, isChildlen);
    }
    //数据赋值并更新页面数据
    this.setData = function (options) {
        for (var key in options) {
            data[key] = options[key];
        }
        _this.render(options);
    };
    //首次加载替换节点数据
    domReplace($el, data, true);
    //首次加载处理需要操作的元素方法
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
    //获取页面的数据节点集合并向页面添加数据
    function domReplace(frag, data, store) {
        var childNodes = frag.childNodes;
        var childlen = childNodes.length;
        for (var i = 0; i < childlen; i++) {
            var node = childNodes[i];
            
            var txt = node.nodeValue;
            var isChildlen = true;
            var reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}
            //页面里的script和style的标签不做处理并跳过子元素
            if (node.nodeName == "SCRIPT" || node.nodeName == "STYLE") {
                isChildlen = false;
                return;
            }
            //文本节点{{}}处理
            if (node.nodeType === 3) {
                jsMatch(txt, data, function (text, conditionList, jsList) {
                    if (text) {
                        node.nodeValue = text;
                        if (store) {
                            domList.push({
                                node: node,
                                make: "",
                                type: "nodeValue",
                                oldValue: text,
                                initValue: txt
                            });
                        }
                    }
                });
            } else if (node.nodeType === 1) {
                attrData(node, data, store, function (newNode, newIsChildlen) {
                    isChildlen = newIsChildlen;
                });
            };
            // 如果还有子节点，继续递归replace
            if (isChildlen && node.childNodes && node.childNodes.length) {
                domReplace(node, data, store);
            }
        }
        return frag;
    }
}