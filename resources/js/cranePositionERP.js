(function () {
    $(document).ready(function () {
        cranePositionERP.bindEvent();
        cranePositionERP.cranePositionERPRequest();
    })
})()

var cranePositionERP = {
    bindEvent: function () {
        //新增
        $("#add").on("click", function () {
            if ($("tbody input").hasClass("active")) {
                info("请先保存修改项", '温馨提示', function () {
                });
            } else {
                var _tr = '<tr class="add">'
                    + '<td>北京石油化工厂</td>'
                    + '<td><input type="text"></td>'
                    + '<td><input type="text"></td>'
                    + '<td><input type="text"></td>'
                    + '<td><input type="text"></td>'
                    + '<td>张立新</td>'
                    + '<td>2018-04-10</td>'
                    + '<td>'
                    + '<div class="switch1">'
                    + '<div class="switch2"></div>'
                    + '</div>'
                    + '</td>'
                    + '<td>'
                    + '</td>'
                    + '</tr>';
                $("tbody").find("tr").eq(0).before(_tr);
            }
        });
        //保存
        $("#save").on("click", function () {

        })
        //刷新
        $("#refresh").on("click", function () {
            cranePositionERP.cranePositionERPRequest();
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
    //鹤位ERP库位映射信息查询
    cranePositionERPRequest: function (datas) {
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
                cranePositionERP.cranePositionERPReader(datas);
            },
            error: function () {
            }
        })
    },

    cranePositionERPReader: function (datas) {
        var _html = '';
        var cranePositionERPReaderList = datas;
        console.log(cranePositionERPReaderList);
        for (var i = 0; i < cranePositionERPReaderList.length; i++) {
            _html += '<tr>'
                + '<td>' + cranePositionERPReaderList[i].storageLocationName + '</td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpCompanyId + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpCompanyName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpFactoryName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].storageLocationPoint + '"></td>'
                + '<td>' + cranePositionERPReaderList[i].preserveName + '</td>'
                + '<td>' + cranePositionERP.timeFormat(cranePositionERPReaderList[i].preserveTime) + '</td>'
                + '<td>'
                + '<div class="switch1">'
                + '<div class="switch2"></div>'
                + '</div>'
                + '</td>'
                + '<td>'
                + '<div class="fl img edit">'
                + '<img src="../../resources/img/edit.png" alt="">'
                + '</div>'
                + '<div class="fl img delete">'
                + '<img src="../../resources/img/delete.png" alt="">'
                + '</div>'
                + '</td>'
                + '</tr>';
        }
        $("tbody").html(_html);
    },
    //时间格式化
    timeFormat: function (time) {
        return time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2);
    }
}