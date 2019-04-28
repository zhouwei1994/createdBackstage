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
    ]
};

module.exports = function (page, callback) {
    var pageContent = getFile(page, "", "");
    if (page.pageType == "page" || page.pageType == "childPage") {
        var pageHtmlContent = getFile({
            template: "pageHtml",
            ...defaultData.baseSetting,
            verifyList: defaultData.verifyList
        }, "", "");
        if (pageHtmlContent) {
            pageHtmlContent.templateHtml = pageHtmlContent.templateHtml.replace("<!--&&htmlchildren-->", pageContent.templateHtml);
            if (pageContent.scriptText) {
                pageHtmlContent.templateHtml = pageHtmlContent.templateHtml.replace("//&&scriptchildren", pageContent.scriptText);
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
        let len
        let childrenNameList = [];
        name = name || "children";
        if (i >= 0 && name) {
            len = options.content.length;
            pageOptions = options.content[i];
            url = config[pageOptions.template].path;
        } else {
            url = config[pageOptions.template].path;
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
                    if (template) {
                        template = template[0].replace(/<template>|<\/template>/g, "");
                        templateHtml = ejs.render(template, compileData.result);
                    }
                    if (templateScript) {
                        templateScript = templateScript[0].replace(/<script name="templateScript">|<\/script>/g, "");
                        scriptText = ejs.render(templateScript, compileData.result);
                    }
                    for (let index = 0; index < 100; index++) {
                        if (index == 0) {
                            if (pageOptions["children"]) {
                                childrenNameList.push("children");
                            } else {
                                break;
                            }
                        } else {
                            if (pageOptions["children" + index]) {
                                childrenNameList.push("children" + index);
                            } else {
                                break;
                            }
                        }
                    }
                    let childrenLen = childrenNameList.length;
                    if (childrenLen > 0) {
                        for (let key of childrenNameList) {
                            let getChildrenData = getFile(pageOptions[key], templateHtml, scriptText, 0, key);
                            if (templateHtml) {
                                templateHtml = getChildrenData.templateHtml;
                            }
                            if (getChildrenData.scriptText) {
                                scriptText = getChildrenData.scriptText;
                            }
                        };
                        return dataProcessing(
                            pageTemplateHtml,
                            pageTemplateScript,
                            "children", {
                                templateHtml: templateHtml,
                                scriptText: scriptText
                            }
                        );
                    } else {
                        if (i >= 0 && name) {
                            if (i >= len - 1) {
                                return dataProcessing(pageTemplateHtml, pageTemplateScript, name, {
                                    templateHtml: templateHtml,
                                    scriptText: scriptText
                                });
                            } else {
                                if (templateHtml) {
                                    templateHtml = templateHtml + "<!--&&html" + name + "-->";
                                }
                                if (scriptText) {
                                    scriptText = scriptText + "//&&script" + name;
                                }
                                return dataProcessing(
                                    pageTemplateHtml,
                                    pageTemplateScript,
                                    name,
                                    getFile(options, templateHtml, scriptText, i + 1, name)
                                );
                            }
                        } else {
                            let value1 = dataProcessing(pageTemplateHtml, pageTemplateScript, "children", {
                                templateHtml: templateHtml,
                                scriptText: scriptText
                            });
                            return value1;
                        }
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

    function dataProcessing(pageTemplateHtml, pageTemplateScript, name, content) {
        let callbackData = {
            templateHtml: pageTemplateHtml,
            scriptText: pageTemplateScript,
        };
        if (content.templateHtml) {
            if (pageTemplateHtml) {
                let reg = new RegExp("<!--&&html" + name + "-->");
                callbackData.templateHtml = pageTemplateHtml.replace(reg, content.templateHtml);
            } else {
                callbackData.templateHtml = content.templateHtml;
            }
        }
        if (content.scriptText) {
            if (pageTemplateScript) {
                let reg;
                console.log(content.scriptText);
                if (content.scriptText.indexOf("//&&insert:scriptchildren") == -1) {
                    reg = new RegExp("//&&script" + name);
                    callbackData.scriptText = pageTemplateScript.replace(reg, content.scriptText);
                } else {
                    var insertList = content.scriptText.split("//&&insert:scriptchildren");
                    callbackData.scriptText = contentInsert(pageTemplateScript,insertList,0,name);
                }
            } else {
                callbackData.scriptText = content.scriptText;
            }
        }
        return callbackData;
    }
    function trim(str){   
        return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');   
    }  
    function contentInsert(pageTemplateScript,insertList,index,name) {
        var insert = trim(insertList[index]);
        var len = insertList.length;
        let reg;
        if (insert) {
            var subIndex = insert.substring(0, 1);

            if (/\d/.test(subIndex)) {
                reg = new RegExp("//&&scriptchildren" + subIndex);
                insert = insert.substring(1);
                if (name != "children" + subIndex) {
                    insert = insert + "//&&scriptchildren" + subIndex;
                }
            } else {
                if (name != "children") {
                    insert = insert + "//&&script" + name;
                }
                reg = new RegExp("//&&scriptchildren");
            }
        }
        if (index >= len - 1) {
            if (reg) {
                var content = pageTemplateScript.replace(reg, insert);
                return content;
            } else {
                return pageTemplateScript;
            }
        } else {
            if (reg) {
                return contentInsert(pageTemplateScript, insertList, index + 1, name).replace(reg, insert);
            } else {
                return contentInsert(pageTemplateScript, insertList, index + 1, name);
            }
        }
    }
};