(function () {
    $(document).ready(function () {
        cranePosition.bindEvent();
        cranePosition.cranePositionRequest();
    })
})()

var cranePosition = {
    bindEvent: function () {
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
                $("tbody").find("tr").eq(0).before(_tr);
            }
        });
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
                    console.log(noNull);
                    if (noNull != 0) {
                        info("输入内容不能为空", '温馨提示', function () {
                        });
                    } else {
                        $("tbody tr.add").each(function () {
                            var delivery = {
                                cranePositionCode: $(this).find("td").eq(0).html(),
                                cranePositionName: commons.deleteSpace($(this).find("input")),
                                status: "1",
                                operator: "",
                                operateTime: ""
                            }
                            template.push(delivery)
                        })
                        console.log(cj.parseCjArray(template));
                        cranePosition.cranePositionPointAdd();
                    }
                } else {
                    $("tbody tr input.active").each(function () {
                        var delivery = {
                            cranePositionCode: $(this).parents("tr").find("td").eq(0).html(),
                            cranePositionName: commons.deleteSpace($(this).parents("tr").find("input")),
                            status: $(this).parents("tr").find("td").eq(4).attr("status"),
                            operator: $(this).parents("tr").find("td").eq(2).html(),
                            operateTime: $(this).parents("tr").find("td").eq(3).attr("times")
                        }
                        template.push(delivery)
                    })
                    console.log(cj.parseCjArray(template));
                    cranePosition.cranePositionPointAdd();
                }
            }
        })
        //刷新
        $("#refresh").on("click", function () {
            cranePosition.cranePositionRequest();
        })
        //修改操作
        $("tbody").on("click", ".edit", function () {
            if ($("tbody tr").hasClass("add")) {
                info("请先保存新增项", '温馨提示', function () {
                });
            } else {
                $(this).parents("tr").find("input").addClass("active").removeAttr("readonly");
            }
        })
        //删除操作
        $("tbody").on("click", ".new-delete", function () {
            $(this).parents("tr").remove();
        })
        //删除操作
        $("tbody").on("click", ".delete", function () {
            var cranePositionId = $(this).parents("tr").attr("cranePositionId");
            alert("确定要删除吗", '删除确定', function () {
                cranePosition.cranePositionDelete(cranePositionId);
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
    //鹤位信息查询
    cranePositionRequest: function (datas) {
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
                        "version": 1.0,
                        "href": "http://IOLService/cranepositions ",
                        "items": [{
                            "href": "{id}",
                            "data": [{
                                "name": "cranePositionId",
                                "value": "0000012"
                            },
                                {
                                    "name": "cranePositionCode",
                                    "value": "1231231 "
                                },
                                {
                                    "name": "cranePositionName",
                                    "value": "1#"
                                },
                                {
                                    "name": "status",
                                    "value": "1"
                                },
                                {
                                    "name": "operator",
                                    "value": "张三"
                                },
                                {
                                    "name": "operateTime",
                                    "value": "201805031123"
                                }

                            ],
                            "links": []
                        }],
                        "queries": [{
                            "href": " http://IOLService/cranepositions ",
                            "rel": "search",
                            "prompt": "1、列表查询",
                            "data": [
                                {
                                    "name": "$craneName",
                                    "value": ""
                                }
                            ]
                        }
                        ],
                        "templates": {
                            "data": [
                                {"name": " cranePositionCode ", "value": "", "prompt": "鹤位编码"},
                                {"name": " cranePositionName", "value": "", "prompt": "鹤位名称"},
                                {"name": "status", "value": "", "prompt": "状态"},
                                {"name": "operator", "value": "", "prompt": "操作人"},
                                {"name": "operate_time", "value": "", "prompt": "操作时间"},
                            ]
                        },
                        "error": {
                            "code": "",
                            "message": ""
                        }
                    }
                };

                datas = cj.Parse(data);
                cranePosition.cranePositionReader(datas);
            },
            error: function (data) {

            }
        })
    },
    //鹤位新增/修改接口
    cranePositionPointAdd: function (types, templates) {
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
    //鹤位删除接口
    cranePositionDelete: function (cranePositionId) {
        $.ajax({
            url: "",
            type: "delete",
            timeout: 10000,
            data: {
                pointerid: cranePositionId
            },
            success: function () {

            },
            error: function () {

            }
        })
    },

    //鹤位列表数据处理
    cranePositionReader: function (datas) {
        var _html = '';
        var cranePositionList = datas;
        console.log(cranePositionList);
        for (var i = 0; i < cranePositionList.length; i++) {
            _html += '<tr cranePositionId="'+cranePositionList[i].cranePositionId+'">'
                + '<td>' + cranePositionList[i].cranePositionCode + '</td>'
                + '<td><input type="text" readonly value="' + cranePositionList[i].cranePositionName + '"></td>'
                + '<td>' + cranePositionList[i].operator + '</td>'
                + '<td>' + commons.timeFormat(cranePositionList[i].operateTime) + '</td>'
                + '<td>';
            if (cranePositionList[i].status == 1) {
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