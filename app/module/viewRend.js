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
    }
};

module.exports = function (page, callback) {
    var pageContent = getFile(page, "", "");
    if (page.pageType == "page" || page.pageType == "childPage") {
        var pageHtmlContent = getFile({
            template: "pageHtml",
            ...defaultData.baseSetting
        }, "", "");
        pageHtmlContent.templateHtml = pageHtmlContent.templateHtml.replace("<!--&&htmlchildren-->", pageContent.templateHtml + "<!--&&htmlchildren-->");
        if (pageContent.scriptText) {
            pageHtmlContent.templateHtml = pageHtmlContent.templateHtml.replace("/*&&scriptchildren*/", pageContent.scriptText + "/*&&scriptchildren*/");
        }
        callback(true, pageHtmlContent);
    }
    callback(true, pageContent);

    function getFile(options, pageTemplateHtml, pageTemplateScript, i, name) {
        var pageOptions = options;
        name = name || "children";
        if (i >= 0 && name) {
            var len = options.length;
            pageOptions = options[i];
            var url = config[pageOptions.template].path;
        } else {
            var url = config[pageOptions.template].path;
        }

        var data = fs.readFileSync(path.join(__dirname, './../..', url));
        // 读取文件失败/错误
        if (data) {
            var contentText = data.toString();
            //模板文本
            var template = contentText.match(/<template>[\d\D]*?<\/template>/);
            //编译代码
            var compile = contentText.match(/<script name="compile">[\d\D]*?<\/script>/);
            //模板js
            var templateScript = contentText.match(/<script name="templateScript">[\d\D]*?<\/script>/);
            if (templateScript) {
                templateScript = templateScript[0].replace(/<script name="templateScript">|<\/script>/g, "");
            }
            if (template && compile) {
                template = template[0].replace(/<template>|<\/template>/g, "");
                compile = compile[0].replace(/<script name="compile">|<\/script>/g, "");
                eval(compile);
                var compileData = templateCompile(pageOptions);
                if (compileData.success) {
                    var templateHtml = ejs.render(template, compileData.result);
                    var scriptText;
                    if (templateScript) {
                        scriptText = ejs.render(templateScript, compileData.result);
                    }
                    if (i >= 0 && name) {
                        if (i >= len - 1) {
                            return dataProcessing(pageTemplateHtml, pageTemplateScript, name, {
                                templateHtml: templateHtml,
                                scriptText: scriptText
                            });
                        } else {
                            templateHtml = templateHtml + "<!--&&html" + name + "-->";
                            console.log(scriptText);
                            if (scriptText) {
                                scriptText = scriptText + "/*&&scriptchildren*/";
                            }
                            return dataProcessing(
                                pageTemplateHtml,
                                pageTemplateScript,
                                name,
                                getFile(options, templateHtml, scriptText, i + 1, name)
                            );
                        }
                    }
                    var childrenNameList = [];
                    for (var index = 0; index < 100; index++) {
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
                    var childrenLen = childrenNameList.length;
                    if (childrenLen > 0) {
                        for (var key  of childrenNameList){
                            templateHtml = templateHtml + "<!--&&html" + name + "-->";
                            console.log(scriptText);
                            if (scriptText) {
                                scriptText = scriptText + "/*&&scriptchildren*/";
                            }
                            var getChildrenData = getFile(pageOptions[key], templateHtml, scriptText, 0, key);

                            templateHtml = getChildrenData.templateHtml;
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
                        var value1 = dataProcessing(pageTemplateHtml, pageTemplateScript, "children", {
                            templateHtml: templateHtml,
                            scriptText: scriptText
                        });
                        return value1;
                    }
                } else {
                    console.error(compileData.result);
                }
            } else {
                console.error("未找到模板");
            }
        } else {
            console.error("文件读取失败");
        }
    }

    function dataProcessing(pageTemplateHtml, pageTemplateScript, name, content) {
        var callbackData = {
            templateHtml: pageTemplateHtml,
            scriptText: pageTemplateScript,
        };
        if (pageTemplateHtml) {
            var reg = new RegExp("<!--&&html" + name + "-->");
            callbackData.templateHtml = pageTemplateHtml.replace(reg, content.templateHtml);
        } else {
            callbackData.templateHtml = content.templateHtml;
        }
        if (content.scriptText) { 
            if (pageTemplateScript) {
                callbackData.scriptText = pageTemplateScript.replace("/*&&scriptchildren*/", content.scriptText);
            } else {
                callbackData.scriptText = content.scriptText;
            }
        } 
        return callbackData;
    }
};