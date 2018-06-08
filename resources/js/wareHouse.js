$(function () {
    wareHouse.bindEvent();
    // wareHouse.wareHouseRequest();
})

var wareHouse = {
    bindEvent: function () {
        //初始化文件上传
        var dialog_upload = new dialog_upload_file();

        //初始化批量导入信息
        var file_infolist = new dialog_add_list();

        //批量导入
        $("#add_list_btn").click(function () {
            file_infolist.hide_dialog();
            dialog_upload.show_dialog();
        });
        //新增
        var _index = 0;
        $("#add").on("click", function () {
            var flag = 0;
            //flag为0 时新增仓库信息    flag不为0 时在已有在已有仓库信息上新增库位信息

            $("tbody tr").each(function () {
                if ($(this).hasClass("active")) {
                    flag++;
                }
            })
            //判断是否存在未保存修改项，存在不允许新增
            if ($("tbody input").hasClass("active")) {
                info("请先保存修改项", '温馨提示', function () {
                });
            } else {
                if (flag != 0) {
                    var uls = '<ul class="library-position add">'
                        + '<li><input type="text" value= ""></li>'
                        + '<li><input type="text" value= ""></li>'
                        + '<li></li>'
                        + '<li></li>'
                        + '<li>'
                        + '<div class="switch1 active">'
                        + '<div class="switch2 active"></div>'
                        + '</div>'
                        + '</li>'
                        + '</ul>';
                    $("tbody tr").eq(_index).find("ul").eq(0).before(uls);
                } else {
                    var _tr = '<tr class="add">'
                        + '<td><input type="text"  value= ""></td>'
                        + '<td class="rights"><input type="text"  value= ""></td>'
                        + '<td class="library" colspan="5">'
                        + '<ul class="library-position first">'
                        + '<li><input type="text"  value= ""></li>'
                        + '<li><input type="text"  value= ""></li>'
                        + '<li></li>'
                        + '<li></li>'
                        + '<li>'
                        + '<div class="switch1 active">'
                        + '<div class="switch2 active"></div>'
                        + '</div>'
                        + '</li>'
                        + '</ul>'
                        + '</td>'
                        + '<td>'
                        + '<div class="new-delete">'
                        + '<img src="./../../img/delete.png" alt="">'
                        + '</div>'
                        + '</td>'
                        + '</tr>';

                    if ($("tbody tr").length) {
                        $("tbody").find("tr").eq(0).before(_tr);
                    } else {
                        $("tbody").append(_tr);
                    }
                }

            }
        });

        //点击每一行加样式
        $("tbody").on("click", "tr", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active").siblings().removeClass("active");
                _index = $(this).index();
            }
        })

        //点击表格里面ul加样式
        $("tbody").on("click", ".library-position", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active").siblings().removeClass("active");
            }
        })

        //保存
        $("#save").on("click", function () {
            var flag = 0;
            //判断是否是新增，新增flag为1，修改flag为2，flag为0没有任何变化
            $("tbody tr").each(function () {
                if ($(this).hasClass("add")) {
                    flag = 1;
                }
                if ($(this).find("input").hasClass("active")) {
                    flag = 2;
                }
            })

            //无修改痕迹时，弹出相应提醒
            if (flag == 0) {
                info("当前页面没有需要保存的内容", '温馨提示', function () {
                });
            } else {
                var template = [];
                //为1时，执行新增操作
                if (flag == 1) {
                    var noNull = 0;
                    $("tbody tr.add input").each(function () {
                        if (!commons.deleteSpace($(this))) {
                            noNull++;
                        }
                    })
                    if (noNull != 0) {
                        info("输入内容不能为空", '温馨提示', function () {
                        });
                    } else {
                        //遍历新增项
                        $("tbody tr.add .library-position").each(function () {

                            //新增信息获取
                            var addInfo = {
                                depotCode: $(this).parents("tr").find("td").eq(0).find("input"),
                                depotName: $(this).parents("tr").find("td").eq(1).find("input"),
                                stockCode: $(this).find("li").eq(0).find("input"),
                                stockName: $(this).find("li").eq(1).find("input"),
                                status: "1"
                            }

                            //新增信息组装
                            var addInfomation = {
                                depotCode: commons.deleteSpace(addInfo.depotCode),
                                depotName: commons.deleteSpace(addInfo.depotName),
                                stockCode: commons.deleteSpace(addInfo.stockCode),
                                stockName: commons.deleteSpace(addInfo.stockName),
                                status: addInfo.status
                            }
                            template.push(addInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        wareHouse.wareHouseAdd();
                    }
                } else {
                    var noNull = 0;
                    $("tbody tr.update input").each(function () {
                        if (!commons.deleteSpace($(this))) {
                            noNull++;
                        }
                    })
                    if (noNull != 0) {
                        info("修改内容不能为空", '温馨提示', function () {
                        });
                    } else {
                        //为2时执行修改操作，遍历修改项
                        $("tbody tr.update .library-position.update").each(function () {
                            //修改信息获取
                            var updateInfo = {
                                depotCode: $(this).parents("tr").find("td").eq(0).find("input"),
                                depotName: $(this).parents("tr").find("td").eq(1).find("input"),
                                stockCode: $(this).find("li").eq(0).find("input"),
                                stockName: $(this).find("li").eq(1).find("input"),
                                status: $(this).find("li").eq(4).attr("status")
                            }

                            //修改信息组装
                            var updateInfomation = {
                                depotCode: commons.deleteSpace(updateInfo.depotCode),
                                depotName: commons.deleteSpace(updateInfo.depotName),
                                stockCode: commons.deleteSpace(updateInfo.stockCode),
                                stockName: commons.deleteSpace(updateInfo.stockName),
                                status: updateInfo.status
                            }
                            template.push(updateInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        wareHouse.wareHouseAdd();
                    }

                }
            }
        })
        //刷新
        $("#refresh").on("click", function () {
            wareHouse.wareHouseRequest();
        })
        //删除操作
        $("tbody").on("click", ".new-delete", function () {
            var actives = $(this).parents("tr").find(".library-position.active");    //库位选择项
            var adds = $(this).parents("tr").find(".library-position");                //所有库位信息
            //如果有选中项，删除选中项，没有全部删除
            if (actives.length) {
                if (actives.index() == adds.length - 1) {
                    actives.remove();
                    $(this).parents("tr").find(".library-position.add").eq(adds.length - 2).find("li").css({"border-bottom": "none"});
                } else {
                    actives.remove();
                }

            } else {
                $(this).parents("tr").remove();
            }
        })
        //删除操作
        $("tbody").on("click", ".delete", function () {
            var adds = $(this).parents("tr").find(".library-position.add.active");
            var actives = $(this).parents("tr").find(".library-position.active");
            //判断是否是新增的ul，是直接删除节点，不是调删除接口
            if (adds.length) {
                adds.remove();
            } else {
                if (actives.length) {
                    // actives.remove();
                } else {
                    // $(this).parents("tr").remove();
                }
            }
        })
        //修改操作
        $("tbody").on("click", ".edit", function () {
            //判断是否存在新增项未保存，未保存不允许操作修改
            if ($("tbody tr").hasClass("add") || $(this).parents("tr").find("ul").hasClass("add")) {
                info("请先保存新增项", '温馨提示', function () {
                });
            } else {
                //  判断是全部修改还是单条修改
                var adds = $(this).parents("tr").find(".library-position.active");
                if (adds.length) {
                    adds.find("input").addClass("active").removeAttr("readonly");
                    adds.addClass("update");
                } else {
                    $(this).parents("tr").find("input").addClass("active").removeAttr("readonly");
                    $(this).parents("tr").find(".library-position").addClass("update");
                }
                $(this).parents("tr").addClass("update");
            }
        })

        // 启用禁用开关
        $("tbody").on("click", ".switch1", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).find(".switch2").removeClass("active");
            } else {
                $(this).addClass("active");
                $(this).find(".switch2").addClass("active");
            }
        })
    },
    //仓库/库位信息查询
    wareHouseRequest: function (datas) {
        $.ajax({
            // url:"",
            // type:"get",
            // timeout:10000,
            // data:{
            //
            // },
            success: function (data) {
                var data = {
                    "collection": {
                        "version": "1.0",
                        "href": "http://localhost:8094/IOLService/depot",
                        "items": [
                            {
                                "data": [
                                    {
                                        "name": "depotId",
                                        "value": 5
                                    },
                                    {
                                        "name": "depotCode",
                                        "value": "55"
                                    },
                                    {
                                        "name": "depotName",
                                        "value": "调查VB"
                                    },
                                    {
                                        "name": "stockCode",
                                        "value": ""
                                    },
                                    {
                                        "name": "stockName",
                                        "value": ""
                                    },
                                    {
                                        "name": "status",
                                        "value": 0
                                    },
                                    {
                                        "name": "operator",
                                        "value": ""
                                    },
                                    {
                                        "name": "operateTime",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 2
                                    },
                                    {
                                        "name": "codeList",
                                        "value": ""
                                    },
                                    {
                                        "name": "direction",
                                        "value": ""
                                    },
                                    {
                                        "name": "sortColumn",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "data": [
                                    {
                                        "name": "depotId",
                                        "value": 4
                                    },
                                    {
                                        "name": "depotCode",
                                        "value": "44"
                                    },
                                    {
                                        "name": "depotName",
                                        "value": "规范地方"
                                    },
                                    {
                                        "name": "stockCode",
                                        "value": ""
                                    },
                                    {
                                        "name": "stockName",
                                        "value": ""
                                    },
                                    {
                                        "name": "status",
                                        "value": 0
                                    },
                                    {
                                        "name": "operator",
                                        "value": ""
                                    },
                                    {
                                        "name": "operateTime",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 2
                                    },
                                    {
                                        "name": "codeList",
                                        "value": ""
                                    },
                                    {
                                        "name": "direction",
                                        "value": ""
                                    },
                                    {
                                        "name": "sortColumn",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "data": [
                                    {
                                        "name": "depotId",
                                        "value": 3
                                    },
                                    {
                                        "name": "depotCode",
                                        "value": "eerwerewwerwer"
                                    },
                                    {
                                        "name": "depotName",
                                        "value": ""
                                    },
                                    {
                                        "name": "stockCode",
                                        "value": ""
                                    },
                                    {
                                        "name": "stockName",
                                        "value": ""
                                    },
                                    {
                                        "name": "status",
                                        "value": 0
                                    },
                                    {
                                        "name": "operator",
                                        "value": ""
                                    },
                                    {
                                        "name": "operateTime",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 2
                                    },
                                    {
                                        "name": "codeList",
                                        "value": ""
                                    },
                                    {
                                        "name": "direction",
                                        "value": ""
                                    },
                                    {
                                        "name": "sortColumn",
                                        "value": ""
                                    }
                                ]
                            }
                        ],
                        "page": {
                            "data": [
                                {
                                    "name": "last",
                                    "value": false
                                },
                                {
                                    "name": "totalPages",
                                    "value": 2
                                },
                                {
                                    "name": "totalElements",
                                    "value": 5
                                },
                                {
                                    "name": "size",
                                    "value": 3
                                },
                                {
                                    "name": "number",
                                    "value": 1
                                },
                                {
                                    "name": "first",
                                    "value": true
                                },
                                {
                                    "name": "sort",
                                    "value": "[{\"ascending\":false,\"direction\":\"DESC\",\"ignoreCase\":false,\"nullHandling\":\"NATIVE\",\"property\":\"depotId\"}]"
                                },
                                {
                                    "name": "numberOfElements",
                                    "value": 3
                                }
                            ]
                        },
                        "templates": [
                            {
                                "data": [
                                    {
                                        "name": "depotId",
                                        "value": ""
                                    },
                                    {
                                        "name": "depotCode",
                                        "value": ""
                                    },
                                    {
                                        "name": "depotName",
                                        "value": ""
                                    },
                                    {
                                        "name": "stockCode",
                                        "value": ""
                                    },
                                    {
                                        "name": "stockName",
                                        "value": ""
                                    },
                                    {
                                        "name": "status",
                                        "value": ""
                                    },
                                    {
                                        "name": "operator",
                                        "value": ""
                                    },
                                    {
                                        "name": "operateTime",
                                        "value": ""
                                    }
                                ]
                            }
                        ]
                    }
                };
                datas = cj.Parse(data);
                wareHouse.wareHouseReader(datas);
            },
            error: function () {
            }
        })
    },

    //仓库and库位  新增/修改接口
    wareHouseAdd: function (types, templates) {
        $.ajax({
            url: "",
            type: types,
            timeout: 100000,
            data: templates,
            success: function (data) {
            },
            error: function (data) {

            }
        })
    },
    //鹤位删除接口
    wareHouseDelete: function (wareHouseId) {
        $.ajax({
            url: "",
            type: "delete",
            timeout: 10000,
            data: {
                depotId: wareHouseId
            },
            success: function () {

            },
            error: function () {

            }
        })
    },


    //仓库/库位信息数据处理
    wareHouseReader: function (datas) {
        var _html = '';
        var wareHouseReaderList = datas;
        console.log(wareHouseReaderList);
        for (var i = 0; i < wareHouseReaderList.length; i++) {
            _html += '<tr>'
                // + '<td>' + wareHouseReaderList[i].depotCode + '</td>'
                + '<td><input type="text" readonly value="' + wareHouseReaderList[i].depotCode + '"></td>'
                + '<td><input type="text" readonly value="' + wareHouseReaderList[i].depotName + '"></td>'
                + '<td><input type="text" readonly value="' + wareHouseReaderList[i].stockCode + '"></td>'
                + '<td><input type="text" readonly value="' + wareHouseReaderList[i].stockName + '"></td>'
                + '<td>' + wareHouseReaderList[i].operator + '</td>'
                + '<td>' + commons.timeFormat(wareHouseReaderList[i].operateTime) + '</td>'
                + '<td>';
            if (wareHouseReaderList[i].status == 1) {
                _html += '<div class="switch1 active">'
                    + '<div class="switch2 active"></div>'
                    + '</div>'
            } else {
                _html += '<div class="switch1">'
                    + '<div class="switch2"></div>'
                    + '</div>'
            }
            _html += '</td>'
                + '<td>'
                + '<div class="fl img edit">'
                + '<img src="./../../img/edit.png" alt="">'
                + '</div>'
                + '<div class="fl img delete">'
                + '<img src="./../../img/delete.png" alt="">'
                + '</div>'
                + '</td>'
                + '</tr>';
        }
        $("tbody").html(_html);
    }
}