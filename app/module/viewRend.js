var ejs = require('ejs');
var fs = require('fs');
var config = require('./../../views/config');
var path = require('path');
//临时默认数据
var defaultData = {
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
    "request": {
        "requestUrl": "http://localhost:8000",
        "imageUrl": "http://localhost:8000",
        "headers": {

        }
    },
    "verifyList": [
        {
            name: "用户名验证",
            value: "username",
            verify: [
                {
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
            verify: [
                {
                    rule: "/^[\S]{6,12}$/",
                    prompt: "密码必须6到12位，且不能出现空格"
                }
            ]
        },
        {
            name: "数字验证",
            value: "number",
            verify: [
                {
                    rule: "!/^\\b$/",
                    prompt: "必须全部是数字"
                }
            ]
        },
        {
            name: "手机号验证验证",
            value: "phone",
            verify: [
                {
                    rule: "!/^1\\d{10}$/",
                    prompt: "手机号格式不正确"
                }
            ]
        },
        {
            name: "标题验证",
            value: "title",
            verify: [
                {
                    rule: "!/.{5,}/",
                    prompt: "标题至少得5个字符啊"
                }
            ]
        },
    ]
};

module.exports = function (page, callback) {
    var pageContent = "";
    if(page.pageType == "childPage" && page.children){
        pageContent = getFile(page.children, "", "",0,"children");
    } else {
        pageContent = getFile(page, "", "");
    }
    if (page.pageType == "page" || page.pageType == "childPage") {
        var template = "pageHtml";
        if (page.pageType == "childPage") {
            template = "childPage";
        }
        var pageHtmlContent = getFile({
            template: template,
            ...defaultData.baseSetting,
            verifyList: defaultData.verifyList
        }, "", "");
        if (pageHtmlContent) {
            pageHtmlContent.templateHtml = pageHtmlContent.templateHtml.replace("<!--&&htmlchildren&&-->", pageContent.templateHtml);
            if (pageContent.scriptText) {
                pageHtmlContent.templateHtml = pageHtmlContent.templateHtml.replace("//&&scriptchildren&&", pageContent.scriptText);
            }
            callback(true, pageHtmlContent);
        }
    }
    if (pageContent) {
        callback(true, pageContent);
    }
    function getFile(options, pageTemplateHtml, pageTemplateScript, i, name) {
        let pageOptions = options;
        let url;
        let len;
        let childName = name;
        if (i >= 0 && name) {
            len = options.content.length;
            pageOptions = options.content[i];
        }
        if (pageOptions.template) {
            if (config[pageOptions.template]) {
                url = config[pageOptions.template].path;
            } else {
                callback(false, "未找到模板，名称为：" + config[pageOptions.template]);
                return false;
            }
        } else {
            callback(false, "未找到模板名称，" + JSON.stringify(pageOptions));
            return false;
        }
        let data = fs.readFileSync(path.join(__dirname, './../..', url));
        // 读取文件失败/错误
        if (data) {
            let contentText = data.toString();
            //模板文本
            let template = contentText.match(/<template>[\d\D]*?<\/template>/);
            //编译代码
            let compile = contentText.match(/<script name="compile">[\d\D]*?<\/script>/);
            //模板js
            let templateScript = contentText.match(/<script name="templateScript">[\d\D]*?<\/script>/);
            if (template && compile || templateScript && compile) {
                compile = compile[0].replace(/<script name="compile">|<\/script>/g, "");
                eval(compile);
                let compileData = templateCompile(pageOptions);
                if (compileData.success) {
                    let templateHtml;
                    let scriptText;
                    pageOptions = compileData.result;
                    compileData.result.verifyList = defaultData.verifyList;
                    compileData.result.baseSetting = defaultData.baseSetting;
                    if (template) {
                        template = template[0].replace(/<template>|<\/template>/g, "");
                        templateHtml = ejs.render(template, compileData.result);
                    }
                    if (templateScript) {
                        templateScript = templateScript[0].replace(/<script name="templateScript">|<\/script>/g, "");
                        scriptText = trim(ejs.render(templateScript, compileData.result));
                    }
                    if (i >= 0 && name) {
                        if (i >= len - 1) {
                            var ccc = forChild(pageOptions, {
                                templateHtml: templateHtml,
                                scriptText: scriptText
                            });
                            var qqq = dataProcessing(pageTemplateHtml, pageTemplateScript, childName,
                                ccc
                            );
                            return qqq;
                        } else {
                            var forChildData = forChild(pageOptions, {
                                templateHtml: templateHtml,
                                scriptText: scriptText
                            });
                            if (forChildData.templateHtml) {
                                forChildData.templateHtml = forChildData.templateHtml.replace(/<!--&&html(.*?)&&--/g, "");
                                forChildData.templateHtml = forChildData.templateHtml + "<!--&&html" + childName + "&&-->";
                            }
                            if (forChildData.scriptText) {
                                forChildData.scriptText = forChildData.scriptText.replace(/\/\/&&script(.*?)&&/g, "");
                                forChildData.scriptText = forChildData.scriptText + "//&&script" + childName + "&&";
                            }
                            var aaa = getFile(options, forChildData.templateHtml, forChildData.scriptText, i + 1, childName);
                            var bbb = dataProcessing(
                                pageTemplateHtml,
                                pageTemplateScript,
                                childName,
                                aaa
                            );
                            return bbb;
                        }
                    } else {
                        return dataProcessing(pageTemplateHtml, pageTemplateScript, childName,
                            forChild(pageOptions, {
                                templateHtml: templateHtml,
                                scriptText: scriptText
                            }));
                    }
                } else {
                    callback(false, "模板【" + pageOptions.template + "】错误消息：" + compileData.result);
                    return false;
                }
            } else {
                callback(false, "未找到模板，url=" + url);
                return false;
            }
        } else {
            callback(false, "文件读取失败，url=" + url);
            return false;
        }
    }
    function forChild(pageOptions, content) {
        let callbackData = content;
        let childrenNameList = [];
        for (let index = 0; index < 100; index++) {
            if (index == 0) {
                if (pageOptions["children"] && pageOptions["children"].content && pageOptions["children"].content.length > 0) {
                    childrenNameList.push("children");
                } else {
                    break;
                }
            } else {
                if (pageOptions["children" + index] && pageOptions["children" + index].content && pageOptions["children" + index].content.length > 0) {
                    childrenNameList.push("children" + index);
                } else {
                    break;
                }
            }
        };
        let childrenLen = childrenNameList.length;
        if (childrenLen > 0) {
            recursive(0);
            function recursive(index) {
                let getChildrenData = dataProcessing(
                    "",
                    "",
                    childrenNameList[index],
                    getFile(pageOptions[childrenNameList[index]], callbackData.templateHtml, callbackData.scriptText, 0, childrenNameList[index])
                );
                if (getChildrenData.templateHtml) {
                    callbackData.templateHtml = getChildrenData.templateHtml;
                }
                if (getChildrenData.scriptText) {
                    callbackData.scriptText = getChildrenData.scriptText;
                }
                if (index < childrenLen - 1) {
                    recursive(index + 1);
                }
            }
        }
        return callbackData;
    }
    function dataProcessing(pageTemplateHtml, pageTemplateScript, name, content) {
        let callbackData = {
            templateHtml: pageTemplateHtml,
            scriptText: pageTemplateScript
        };
        if (content.templateHtml) {
            if (pageTemplateHtml) {
                let reg = new RegExp("<!--&&html" + name + "&&-->");
                callbackData.templateHtml = pageTemplateHtml.replace(reg, content.templateHtml);
            } else {
                callbackData.templateHtml = content.templateHtml;
            }
        }
        if (content.scriptText) {
            if (pageTemplateScript) {
                let insertReg = /\/\/&&insertStart:\([\d\D]*?\/\/&&insertEnd&&/g;
                let reg = new RegExp("//&&script" + name + "&&");
                if (insertReg.test(content.scriptText)) {
                    var insertList = content.scriptText.match(insertReg);
                    var normalScriptText = trim(content.scriptText.replace(insertReg, ""));
                    if (normalScriptText) {
                        callbackData.scriptText = pageTemplateScript.replace(reg, normalScriptText);
                    }
                    callbackData.scriptText = contentInsert(callbackData.scriptText, insertList, 0, name);
                } else {
                    callbackData.scriptText = pageTemplateScript.replace(reg, content.scriptText);
                }
                
            } else {
                callbackData.scriptText = content.scriptText;
            }
        }
        return callbackData;
    }
    function trim(str) {
        return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
    }
    function contentInsert(pageTemplateScript, insertList, index, name) {
        var insert = insertList[index];
        var len = insertList.length;
        insertContent = insert.substring(17, insert.length - 15);
        var bitIndex = insertContent.indexOf(")&&");
        let reg;
        if (bitIndex == -1) {
            console.log("模板插入指定位置参数错误");
        } else {
            var subName = insertContent.substring(0, bitIndex);
            if (new RegExp("//&&" + subName + "&&").test(pageTemplateScript)) {
                insertContent = insertContent.substring(bitIndex + 3);
                if (subName ) {
                    reg = new RegExp("//&&" + subName + "&&");
                    if ("script" + name != subName) {
                        insertContent = insertContent + "//&&" + subName + "&&";
                    }
                } else {
                    if (name != "children") {
                        insertContent = insertContent + "//&&script" + name + "&&";
                    }
                    reg = new RegExp("//&&scriptchildren&&");
                }
            } else {
                insertContent = insert + "//&&script" + name + "&&";
                reg = new RegExp("//&&scriptchildren&&");
            }
        }
        if (index >= len - 1) {
            if (reg) {
                var content = pageTemplateScript.replace(reg, insertContent);
                return content;
            } else {
                return pageTemplateScript;
            }
        } else {
            if (reg) {
                return contentInsert(pageTemplateScript, insertList, index + 1, name).replace(reg, insertContent);
            } else {
                return contentInsert(pageTemplateScript, insertList, index + 1, name);
            }
        }
    }
};