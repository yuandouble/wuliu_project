$(function () {
    deliveryPointMapping.bindEvent();
    // deliveryPointMapping.deliveryPointMappingRequest();
})

var deliveryPointMapping = {
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
            //flag为0 时新增仓库/库位信息    flag不为0 时在已有在已有仓库信息上新增库位信息
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
                        + '<li>'
                        + '<div class="crane">'
                        + '<input type="text" value="">'
                        + '<p class="crane-pos"><img src="../img/select.png" alt=""></p>'
                        + '<ul class="crane-select">'
                        + '</ul>'
                        + '</div>'
                        + '</li>'
                        + '<li></li>'
                        + '<li></li>'
                        + '<li>'
                        + '<div class="switch1 active">'
                        + '<div class="switch2 active"></div>'
                        + '</div>'
                        + '</li>'
                        + '<div class="cl"></div>'
                        + '</ul>';
                    $("tbody tr").eq(_index).find("ul.library-position").eq(0).before(uls);
                } else {
                    var _tr = '<tr class="add">'
                        + '<td class="rights crane-modal">'
                        + '<div class="crane">'
                        + '<input type="text">'
                        + '<p class="crane-pos"><img src="../img/select.png" alt=""></p>'
                        + '<ul class="crane-select">'
                        + '<li>111111111111111</li>'
                        + '<li>222222222222</li>'
                        + '</ul>'
                        + '</div>'
                        + '</td>'
                        + '<td class="library librarys" colspan="4">'
                        + '<ul class="library-position first">'
                        + '<li class="crane-modal">'
                        + '<div class="crane">'
                        + '<input type="text">'
                        + '<p class="crane-pos"><img src="../img/select.png" alt=""></p>'
                        + '<ul class="crane-select">'
                        + '<li>111111111111111</li>'
                        + '<li>222222222222</li>'
                        + '</ul>'
                        + '</div>'
                        + '</li>'
                        + '<li></li>'
                        + '<li></li>'
                        + '<li>'
                        + '<div class="switch1 active">'
                        + '<div class="switch2 active"></div>'
                        + '</div>'
                        + '</li>'
                        + '<div class="cl"></div>'
                        + '</ul>'
                        + '</td>'
                        + '<td>'
                        + '<div class="new-delete">'
                        + '<img src="./../../img/delete.png" alt="">'
                        + '</div>'
                        + '</td>'
                        + '</tr>';
                    $("tbody").find("tr").eq(0).before(_tr);
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
                                pointerName: $(this).parents("tr").find("td").eq(0).find("input"),
                                positionNumber: $(this).find("li").eq(0).find("input"),
                                status: "1"
                            }

                            //新增信息组装
                            var addInfomation = {
                                pointerName: commons.deleteSpace(addInfo.pointerName),
                                positionNumber: commons.deleteSpace(addInfo.positionNumber),
                                status: addInfo.status
                            }
                            template.push(addInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        deliveryPointMapping.deliveryPointMappingAdd();
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
                                pointerName: $(this).parents("tr").find("td").eq(0).find("input"),
                                positionNumber: $(this).find("li").eq(0).find("input"),
                                status: $(this).find("li").eq(3).attr("status")
                            }

                            //修改信息组装
                            var updateInfomation = {
                                pointerName: commons.deleteSpace(updateInfo.pointerName),
                                positionNumber: commons.deleteSpace(updateInfo.positionNumber),
                                status: updateInfo.status
                            }
                            template.push(updateInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        deliveryPointMapping.deliveryPointMappingAdd();
                    }

                }
            }
        })


        //新增项删除操作
        $("tbody").on("click", ".new-delete", function () {
            var actives = $(this).parents("tr").find(".library-position.active");     //鹤位选择项
            var adds = $(this).parents("tr").find(".library-position");                //所有鹤位信息
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

        //刷新
        $("#refresh").on("click", function () {
            deliveryPointMapping.deliveryPointMappingRequest();
        })
        //修改操作
        $("tbody").on("click", ".edit", function () {
            if ($("tbody tr").hasClass("add") || $(this).parents("tr").find("ul").hasClass("add")) {
                info("请先保存新增项", '温馨提示', function () {
                });
            } else {
                //  判断是全部修改还是单条修改
                var adds = $(this).parents("tr").find(".library-position.active");
                if (adds.length) {
                    adds.find("input").addClass("active").removeAttr("readonly");
                    adds.find(".crane-pos").show();
                    adds.addClass("update");
                } else {
                    $(this).parents("tr").find("input").addClass("active").removeAttr("readonly");
                    $(this).parents("tr").find(".library-position").addClass("update");
                    $(this).parents("tr").find(".crane-pos").show();
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
    //仓库/库位信息查询接口
    deliveryPointMappingRequest: function (datas) {
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
                        "href": "http://IOLService/locerps ",
                        "links": [],
                        "items": [
                            {
                                "href": "{id}",
                                "data": [
                                    {
                                        "name": "storageLocationId",
                                        "value": "000001"
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": "1"
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": " 00001"
                                    },

                                    {
                                        "name": "erpCompanyName",
                                        "value": " 北京石油化工"
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": "北京石油化工"
                                    },

                                    {
                                        "name": "storageLocationPoint",
                                        "value": "石化"
                                    },
                                    {
                                        "name": "preserveName",
                                        "value": "1111"
                                    },
                                    {
                                        "name": "preserveTime",
                                        "value": "201801111234"
                                    },
                                    {
                                        "name": "storageLocationStatus",
                                        "value": "1"
                                    }
                                ],
                                "links": []
                            }
                        ],
                        "queries": [
                            {
                                "rel": "search",
                                "href": "http://IOLService/locerps ",
                                "prompt": "1、查询",
                                "data": [
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    }
                                ]
                            }
                        ],
                        "templates": {
                            "data": []
                        },
                        "error": {
                            "code": "",
                            "message": ""
                        }
                    }
                };
                datas = cj.Parse(data);
                deliveryPointMapping.deliveryPointMappingReader(datas);
            },
            error: function () {
            }
        })
    },

    //仓库and库位  新增/修改接口
    deliveryPointMappingAdd: function (types, templates) {
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
    deliveryPointMappingDelete: function (pointMappingId) {
        $.ajax({
            url: "",
            type: "delete",
            timeout: 10000,
            data: {
                pointMappingId: pointMappingId
            },
            success: function () {

            },
            error: function () {

            }
        })
    },

    //仓库/库位信息数据展示
    deliveryPointMappingReader: function (datas) {
        var _html = '';
        var deliveryPointMappingReaderList = datas;
        console.log(deliveryPointMappingReaderList);
        for (var i = 0; i < deliveryPointMappingReaderList.length; i++) {
            _html += '<tr>'
                + '<td>' + cranePositionERPReaderList[i].storageLocationName + '</td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpCompanyId + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpCompanyName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpFactoryName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].storageLocationPoint + '"></td>'
                + '<td>' + cranePositionERPReaderList[i].preserveName + '</td>'
                + '<td>' + commons.timeFormat(cranePositionERPReaderList[i].preserveTime) + '</td>'
                + '<td>'
                + '<div class="switch1">'
                + '<div class="switch2"></div>'
                + '</div>'
                + '</td>'
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