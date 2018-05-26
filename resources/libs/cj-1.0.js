window.cj = window.cj || {};
cj.malert=function(){
	console.log("cj");
}
// 转换成json对象
cj.Parse = function (cjObject, isLazy) {
    isLazy = isLazy || false;
    var cjData = [];
    try {
        var version = cjObject.collection.version;
        var href = cjObject.collection.href;
        var items = cjObject.collection.items;
        if (items == null || items == undefined) {
            return [];
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemHref = item.href;
            var data = item.data;
            var links = item.links;

            var single = {};
            for (var j = 0; j < data.length; j++) {
                var name = data[j].name;
                var value = data[j].value;
                if (value == undefined) {
                    single[name] = "";
                } else {
                    single[name] = value;
                }
                if (isLazy) {
                    if (value == "True") {
                        single[name] = true;
                    }
                    if (value == "False") {
                        single[name] = false;
                    }
                }
            }
            cjData.push(single);
        }
    } catch (e) {
        console.log("数据格式不正确");
    }
    return cjData;
}
// 提取error
cj.Error = function (cjString) {
    var cjObject = JSON.parse(cjString);
    var error = cjObject.collection.error;
    return error.message;
}

cj.parseCj = function (formObj) {
    var cjObject = {};
    var collection = {};
    var templates = [];
    var template = {};
    var data = [];
    for (var key in formObj) {
        var single = {};
        single["name"] = key;
        if (formObj[key] === "") {
            single["value"] = null;
        } else {
            single["value"] = '' + formObj[key];
        }

        data.push(single);
    }
    template["data"] = data;
    templates.push(template);
    collection["templates"] = templates;
    cjObject["collection"] = collection;
    return JSON.stringify(cjObject);
}

// json对象转换成collection-json 里面的templates
cj.parseCjArray = function (formObj) {
    var cjObject = {};
    var collection = {};
    var templates = [];
    for (var i = 0; i < formObj.length; i++) {
        var obj = formObj[i];
        var template = {};
         var data = [];
        for (var key in obj) {
            var single = {};
            single["name"] = key;
            if (obj[key] === "") {
                single["value"] = null;
            } else {
                single["value"] = obj[key];
            }

            data.push(single);
        }
        template["data"] = data;
        templates.push(template);
    }

    collection["version"] = "1.0";
    collection["templates"] = templates;
    cjObject["collection"] = collection;
    return JSON.stringify(cjObject);
}