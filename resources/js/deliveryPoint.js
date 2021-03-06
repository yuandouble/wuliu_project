(function () {
    $(document).ready(function () {
        deliveryPoint.bindEvent();
        deliveryPoint.deliveryPointRequest();
    })
})()

var deliveryPoint = {
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
                    + '<td>12338746</td>'
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

                if($("tbody tr").length){
                    $("tbody").find("tr").eq(0).before(_tr);
                }else {
                    $("tbody").append(_tr);
                }

            }
        });
        //刷新
        $("#refresh").on("click", function () {
            deliveryPoint.deliveryPointRequest();
        })
        //保存
        $("#save").on("click", function () {
            var flag = 0;
            $("tbody tr").each(function () {
                if ($(this).hasClass("add")) {
                    flag = 1;
                }
                if ($(this).find("input").hasClass("active")) {
                    flag = 2;
                }
            })
            console.log(flag);
            if (flag == 0) {
                info("当前页面没有需要保存的内容", '温馨提示', function () {
                });
            } else {
                var template = [];
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
                        $("tbody tr.add").each(function () {
                            //新增信息获取
                            var addInfo = {
                                pointerCode: $(this).find("td").eq(0).html(),
                                pointerName: $(this).find("td").eq(1).find("input"),
                                status:"1"
                            }

                            //新增信息组装
                            var addInfomation = {
                                pointerCode: addInfo.pointerCode,
                                pointerName: commons.deleteSpace(addInfo.pointerName),
                                status: addInfo.status
                            }

                            template.push(addInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        deliveryPoint.deliveryPointAdd();
                    }
                } else {
                    var noNull = 0;
                    $("tbody tr input.active").each(function () {
                        if (!commons.deleteSpace($(this))) {
                            noNull++;
                        }
                    })
                    //判断input是否为空，为空不允许修改
                    if (noNull != 0) {
                        info("修改内容不能为空", '温馨提示', function () {
                        });
                    }else{
                        $("tbody tr.update").each(function () {

                            //修改信息获取
                            var updateInfo = {
                                pointerId:$(this).attr("pointerId"),
                                pointerCode: $(this).find("td").eq(0).find("input"),
                                pointerName: $(this).find("td").eq(1).find("input"),
                                status:$(this).find("td").eq(4).attr("status")
                            }

                            //修改信息组装
                            var updateInfomation = {
                                pointerId:updateInfo.pointerId,
                                pointerCode: commons.deleteSpace(updateInfo.pointerCode),
                                pointerName: commons.deleteSpace(updateInfo.pointerName),
                                status: updateInfo.status
                            }


                            template.push(updateInfomation)
                        })
                        console.log(cj.parseCjArray(template));
                        deliveryPoint.deliveryPointAdd();
                    }
                }
            }
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
        //删除操作
        $("tbody").on("click", ".new-delete", function () {
            $(this).parents("tr").remove();
        })
        //删除操作
        $("tbody").on("click", ".delete", function () {
            var pointerid = $(this).parents("tr").attr("pointerid");
            alert("确定要删除吗", '删除确定', function () {
                deliveryPoint.deliveryPointDelete(pointerid);
            });
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

    //发货点信息查询接口
    deliveryPointRequest: function (datas) {
        $.ajax({
            // url:"",
            // type:"get",
            // timeout:100000,
            // data:{
            //
            // },
            success: function (data) {
                var data = {

                    "collection": {
                        "version": 1.0,
                        "href": "http://IOLService/deliverypts ",
                        "items": [{
                            "href": "{id}",
                            "data": [
                                {
                                    "name": "pointerId",
                                    "value": "0000001 "
                                },
                                {
                                    "name": "pointerCode",
                                    "value": "123123124"
                                },
                                {
                                    "name": "pointerName",
                                    "value": "北门发货点"
                                },
                                {
                                    "name": "status",
                                    "value": "2"
                                },
                                {
                                    "name": "operator",
                                    "value": "张三"
                                },
                                {
                                    "name": "operateTime",
                                    "value": "201805161334"
                                }
                            ],
                            "links": []
                        },
                            {
                                "href": "{id}",
                                "data": [
                                    {
                                        "name": "pointerId",
                                        "value": "0000002 "
                                    },
                                    {
                                        "name": "pointerCode",
                                        "value": "123123123"
                                    },
                                    {
                                        "name": "pointerName",
                                        "value": "西门发货点"
                                    },
                                    {
                                        "name": "status",
                                        "value": " 1 "
                                    },
                                    {
                                        "name": "operator",
                                        "value": "李四"
                                    },
                                    {
                                        "name": "operateTime",
                                        "value": "201805181334"
                                    }
                                ],
                                "links": []
                            }],
                        "queries": [{
                            "href": " http://IOLService/deliverypts ",
                            "rel": "search",
                            "prompt": "1、列表查询",
                            "data": [
                                {
                                    "name": "$ pointerCode ",
                                    "value": ""
                                },
                                {
                                    "name": "$ pointerName",
                                    "value": ""
                                }, {
                                    "name": "$ status ",
                                    "value": ""
                                }]
                        }
                        ],
                        "templates": {
                            "data": [
                                {"name": " pointerCode ", "value": "", "prompt": "发运点编码"},
                                {"name": " pointerName ", "value": "", "prompt": "发运点名称"},
                                {"name": " status ", "value": "", "prompt": "状态"},
                                {"name": " operator ", "value": "", "prompt": "操作人"},
                                {"name": " operateTime ", "value": "", "prompt": "操作时间"},
                            ]
                        },
                        "error": {
                            "code": "",
                            "message": ""
                        }
                    }

                };

                datas = cj.Parse(data);
                deliveryPoint.deliveryPointReader(datas);
            },
            error: function (data) {

            }
        })
    },
    //发货点新增/修改接口
    deliveryPointAdd: function (types, templates) {
        $.ajax({
            url:"",
            type:types,
            timeout:100000,
            data:templates,
            success: function (data) {
            },
            error: function (data) {

            }
        })
    },
    //发货点删除接口
    deliveryPointDelete: function (pointerid) {
        $.ajax({
            url: "",
            type: "delete",
            timeout: 10000,
            data: {
                pointerid: pointerid
            },
            success: function () {

            },
            error: function () {

            }
        })
    },

    //列表数据处理
    deliveryPointReader: function (datas) {
        var _html = '';
        var deliveryPointList = datas;
        console.log(deliveryPointList);
        // status: 1启用  2停用
        for (var i = 0; i < deliveryPointList.length; i++) {
            _html += '<tr pointerId="' + deliveryPointList[i].pointerId + '">'
                // + '<td>' + deliveryPointList[i].pointerCode + '</td>'
                + '<td><input type="text" readonly value="' + deliveryPointList[i].pointerCode + '"></td>'
                + '<td><input type="text" readonly value="' + deliveryPointList[i].pointerName + '"></td>'
                + '<td>' + deliveryPointList[i].operator + '</td>'
                + '<td times="' + deliveryPointList[i].operateTime + '">' + commons.timeFormat(deliveryPointList[i].operateTime) + '</td>'
                + '<td status="' + deliveryPointList[i].status + '">';
            if (deliveryPointList[i].status == 1) {
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