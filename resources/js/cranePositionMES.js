(function () {
    $(document).ready(function () {
        cranePositionMES.bindEvent();
        cranePositionMES.cranePositionMESRequest();
    })
})()

var cranePositionMES = {
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
            cranePositionMES.cranePositionMESRequest();
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
                        "href": "http://IOLService/MESStorageLocation",
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
                                        "name": "mesCompanyName",
                                        "value": " 2018"
                                    },
                                    {
                                        "name": "storageLocationPoint",
                                        "value": "22"
                                    },
                                    {
                                        "name": "preserveName",
                                        "value": "1111"
                                    },
                                    {
                                        "name": "preserveTime",
                                        "value": "201802131120"
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
                                "href": "http://IOLService/MESStorageLocation",
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
                cranePositionMES.cranePositionMESReader(datas);
            },
            error: function () {
            }
        })
    },

    cranePositionMESReader: function (datas) {
        var _html = '';
        var cranePositionMESReaderList = datas;
        console.log(cranePositionMESReaderList);
        for (var i = 0; i < cranePositionMESReaderList.length; i++) {
            _html += '<tr>'
                + '<td>' + cranePositionMESReaderList[i].storageLocationName + '</td>'
                + '<td><input type="text" readonly value="' + cranePositionMESReaderList[i].mesCompanyName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionMESReaderList[i].storageLocationPoint + '"></td>'
                + '<td>' + cranePositionMESReaderList[i].preserveName + '</td>'
                + '<td>' + cranePositionMES.timeFormat(cranePositionMESReaderList[i].preserveTime) + '</td>'
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