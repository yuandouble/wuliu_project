$(function () {
    cranePositionMES.bindEvent();
    cranePositionMES.cranePositionMESRequest();
})

var cranePositionMES = {
    bindEvent: function () {

        //初始化文件上传
        var dialog_upload = new dialog_upload_file();

        //初始化批量导入信息
        var file_infolist = new dialog_add_list();

        //批量导入
        $("#add_list_btn").click(function(){
            file_infolist.hide_dialog();
            dialog_upload.show_dialog();
        });

        //新增
        $("#add").on("click", function () {
            if ($("tbody input").hasClass("active")) {
                info("请先保存修改项", '温馨提示', function () {
                });
            } else {
                var _tr = '<tr class="add">'
                    + '<td><input type="text"></td>'
                    + '<td><input type="text"></td>'
                    + '<td><input type="text"></td>'
                    + '<td></td>'
                    + '<td></td>'
                    + '<td>'
                    + '<div class="switch1 active">'
                    + '<div class="switch2 active"></div>'
                    + '</div>'
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
        });

        //保存
        $("#save").on("click", function () {
            //判断是否是新增，新增flag为1，修改flag为2，flag为0没有任何变化
            var flag = 0;
            $("tbody tr").each(function () {
                if ($(this).hasClass("add")) {
                    flag = 1;
                }
                if ($(this).find("input").hasClass("active")) {
                    flag = 2;
                }
            })

            //没有修改痕迹时，弹出相应提醒
            if (flag == 0) {
                info("当前页面没有需要保存的内容", '温馨提示', function () {
                });
            } else {
                var template = [];

                //为1时执行新增
                if (flag == 1) {
                    var noNull = 0;
                    $("tbody tr.add input").each(function () {
                        if (!commons.deleteSpace($(this))) {
                            noNull++;
                        }
                    })
                    console.log(noNull);
                    if (noNull != 0) {
                        info("输入内容不能为空", '温馨提示', function () {
                        });
                    } else {
                        $("tbody tr.add").each(function () {
                            //新增信息获取
                            var addInfo = {
                                storageLocationName: $(this).find("td").eq(0).find("input"),
                                mesCompanyName: $(this).find("td").eq(1).find("input"),
                                storageLocationPoint: $(this).find("td").eq(2).find("input")
                            }

                            //新增信息组装
                            var addInfomation = {
                                storageLocationName: commons.deleteSpace(addInfo.storageLocationName),
                                mesCompanyName: commons.deleteSpace(addInfo.mesCompanyName),
                                storageLocationPoint: commons.deleteSpace(addInfo.storageLocationPoint),
                                storageLocationStatus: "1"
                            }
                            template.push(addInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        cranePositionMES.cranePositionMESAdd();
                    }
                } else {
                    var noNull = 0;
                    //input为空时noNull递增
                    $("tbody tr.update input").each(function () {
                        if (!commons.deleteSpace($(this))) {
                            noNull++;
                        }
                    })
                    //input为空时不允许修改
                    if (noNull != 0) {
                        info("修改内容不能为空", '温馨提示', function () {
                        });
                    } else {
                        //执行修改操作
                        $("tbody tr.update").each(function () {
                            //新增信息获取
                            var updateInfo = {
                                locationid: $(this).attr("locationid"),
                                mesCompanyName: $(this).find("td").eq(1).find("input"),
                                storageLocationPoint: $(this).find("td").eq(2).find("input"),
                                storageLocationStatus: $(this).find("td").eq(5).attr("storageLocationStatus")
                            }
                            //新增信息组装
                            var updateInfomation = {
                                locationid: updateInfo.locationid,
                                cranePositionName: commons.deleteSpace(updateInfo.mesCompanyName),
                                storageLocationPoint: commons.deleteSpace(updateInfo.storageLocationPoint),
                                storageLocationStatus: updateInfo.storageLocationStatus
                            }
                            template.push(updateInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        cranePositionMES.cranePositionMESAdd();
                    }
                }
            }
        })
        //刷新
        $("#refresh").on("click", function () {
            cranePositionMES.cranePositionMESRequest();
        })
        //删除操作
        $("tbody").on("click", ".new-delete", function () {
            $(this).parents("tr").remove();
        })
        //删除操作
        $("tbody").on("click", ".delete", function () {
            var locationId = $(this).parents("tr").attr("locationId");
            alert("确定要删除吗", '删除确定', function () {
                cranePositionMES.cranePositionMESDelete(locationId);
            });
        })
        //修改操作
        $("tbody").on("click", ".edit", function () {
            if ($("tbody tr").hasClass("add")) {
                info("请先保存新增项", '温馨提示', function () {
                });
            } else {
                $(this).parents("tr").find("input").addClass("active").removeAttr("readonly");
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
    //鹤位ERP库位映射信息查询接口
    cranePositionMESRequest: function (datas) {
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
                        "href": "http://localhost:8094/ioc/locMes/3",
                        "items": [
                            {
                                "data": [
                                    {
                                        "name": "locationId",
                                        "value": 3
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": "hengyang11"
                                    },
                                    {
                                        "name": "mesCompanyName",
                                        "value": "sss"
                                    },
                                    {
                                        "name": "storageLocationPoint",
                                        "value": "sss"
                                    },
                                    {
                                        "name": "storageLocationStatus",
                                        "value": 3
                                    },
                                    {
                                        "name": "version",
                                        "value": 33
                                    },
                                    {
                                        "name": "crtUserId",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtUserName",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtDate",
                                        "value": "2018-06-01 17:04:33"
                                    },
                                    {
                                        "name": "mntUserId",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntUserName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntDate",
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
                                        "name": "locationId",
                                        "value": 3
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": "hengyang11"
                                    },
                                    {
                                        "name": "mesCompanyName",
                                        "value": "sss"
                                    },
                                    {
                                        "name": "storageLocationPoint",
                                        "value": "sss"
                                    },
                                    {
                                        "name": "storageLocationStatus",
                                        "value": 3
                                    },
                                    {
                                        "name": "version",
                                        "value": 33
                                    },
                                    {
                                        "name": "crtUserId",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtUserName",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtDate",
                                        "value": "2018-06-01 17:04:33"
                                    },
                                    {
                                        "name": "mntUserId",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntUserName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntDate",
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
                        "templates": [
                            {
                                "data": [
                                    {
                                        "name": "locationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mesCompanyName",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationPoint",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationStatus",
                                        "value": ""
                                    },
                                    {
                                        "name": "version",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtUserId",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtUserName",
                                        "value": ""
                                    },
                                    {
                                        "name": "crtDate",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntUserId",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntUserName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mntDate",
                                        "value": ""
                                    }
                                ]
                            }
                        ]
                    }
                };
                datas = cj.Parse(data);
                cranePositionMES.cranePositionMESReader(datas);
            },
            error: function () {
            }
        })
    },

    //鹤位ERP库位映射新增/修改接口
    cranePositionMESAdd: function (types, templates) {
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
    //鹤位ERP库位映射删除接口
    cranePositionMESDelete: function (locationId) {
        console.log(locationId);
        $.ajax({
            url: "",
            type: "delete",
            timeout: 10000,
            data: {
                locationId: locationId
            },
            success: function () {

            },
            error: function () {

            }
        })
    },

    //鹤位ERP库位映射数据处理
    cranePositionMESReader: function (datas) {
        var _html = '';
        var cranePositionMESReaderList = datas;
        console.log(cranePositionMESReaderList);
        for (var i = 0; i < cranePositionMESReaderList.length; i++) {
            _html += '<tr locationId="' + cranePositionMESReaderList[i].locationId + '">'
                + '<td>' + cranePositionMESReaderList[i].storageLocationName + '</td>'
                + '<td><input type="text" readonly value="' + cranePositionMESReaderList[i].mesCompanyName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionMESReaderList[i].storageLocationPoint + '"></td>'
                + '<td>' + cranePositionMESReaderList[i].mntUserName + '</td>'
                + '<td>' + commons.timeFormat(cranePositionMESReaderList[i].mntDate) + '</td>'
                + '<td storageLocationStatus="' + cranePositionMESReaderList[i].storageLocationStatus + '">'
            if (cranePositionMESReaderList[i].storageLocationStatus == 1) {
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