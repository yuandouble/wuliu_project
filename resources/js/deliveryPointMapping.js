$(function () {
    deliveryPointMapping.bindEvent();
    // deliveryPointMapping.deliveryPointMappingRequest();
})

var deliveryPointMapping = {
    bindEvent: function () {
        //新增
        var _index = 0;
        $("#add").on("click", function () {
            var flag = 0;
            $("tbody tr").each(function () {
                if ($(this).hasClass("active")) {
                    flag++;
                }
            })
            if (flag != 0) {
                if ($("tbody tr").hasClass("add") && $("tbody tr").find("input").eq(0).attr("readonly")) {
                    info("请先保存新增项", '温馨提示', function () {
                    });
                } else {
                    if ($("tbody tr").eq(_index).find(".library-position input").hasClass("active")) {
                        info("请先保存修改项", '温馨提示', function () {
                        });
                    } else {
                        var uls = '<ul class="library-position add">'
                            + '<li><input type="text"  value= ""></li>'
                            + '<li></li>'
                            + '<li></li>'
                            + '<li>'
                            + '<div class="switch1 active">'
                            + '<div class="switch2 active"></div>'
                            + '</div>'
                            + '</li>'
                            + '</ul>';
                        $("tbody tr").eq(_index).find("ul").eq(0).before(uls);
                    }
                }
            } else {
                if ($("tbody input").hasClass("active")) {
                    info("请先保存修改项", '温馨提示', function () {
                    });
                } else {
                    var _tr = '<tr class="add">'
                        + '<td class="rights">'
                        +'<div class="crane"><input type="text"><p class="crane-pos"><img src="../img/select.png" alt=""></p></div>'
                        +'</td>'
                        + '<td class="library librarys" colspan="4">'
                        + '<ul class="library-position first">'
                        + '<li>'
                        +'<div class="crane"><input type="text"><p class="crane-pos"><img src="../img/select.png" alt=""></p></div>'
                        +'</li>'
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
                    $("tbody").find("tr").eq(0).before(_tr);
                }
            }
        });

        //点击每一行加样式
        $("tbody").on("click", "tr", function () {
            $(this).addClass("active").siblings().removeClass("active");
            _index = $(this).index();
            console.log(_index);
        })

        //点击表格里面ul加样式
        $("tbody").on("click", ".library-position", function () {
            $(this).css({"background": "BlanchedAlmond"});
            $(this).find("input").css({"background": "BlanchedAlmond"});
        })

        //保存
        $("#save").on("click", function () {

        })
        //删除操作
        $("tbody").on("click", ".new-delete", function () {
            $(this).parents("tr").remove();
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
                $(this).parents("tr").find("input").addClass("active").removeAttr("readonly");
                $(this).parents("tr").find(".crane-pos").show();

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