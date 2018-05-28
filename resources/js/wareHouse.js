$(function () {
    wareHouse.bindEvent();
    // wareHouse.wareHouseRequest();
})

var wareHouse = {
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
                if ($("tbody tr").hasClass("add")  && $("tbody tr").find("input").eq(0).attr("readonly")) {
                    info("请先保存新增项", '温馨提示', function () {
                    });
                } else {
                    var uls = $("tbody tr").eq(_index).find("ul");
                    var lis = '<li class="add-li"><input type="text" value= ""></li>';
                    var operator = '<li class="add-li">张立新</li>';
                    var operateTime = '<li class="add-li">2018-01-01</li>';
                    var switchs = '<li class="add-li"><div class="switch1"><div class="switch2"></div></div></li>';
                    for (var i = 0; i < uls.length; i++) {
                        if (i < 2) {
                            uls.eq(i).find("li").eq(0).before(lis);
                        } else if (i == 2) {
                            uls.eq(i).find("li").eq(0).before(operator);
                        } else if (i == 3){
                            uls.eq(i).find("li").eq(0).before(operateTime);
                        }else{
                            uls.eq(i).find("li").eq(0).before(switchs);
                        }

                    }
                }
            } else {
                if ($("tbody input").hasClass("active")) {
                    info("请先保存修改项", '温馨提示', function () {
                    });
                } else {
                    var _tr = '<tr class="add">'
                        + '<td>12338746</td>'
                        + '<td class="rights"><input type="text" value= ""></td>'
                        + '<td class="padd">'
                        + '<ul>'
                        + '<li class="first-li"><input type="text" value= ""></li>'
                        + '</ul>'
                        + '</td>'
                        + '<td class="padd">'
                        + '<ul>'
                        + '<li class="first-li"><input type="text" value= ""></li>'
                        + '</ul>'
                        + '</td>'
                        + '<td class="padd">'
                        + '<ul>'
                        + '<li class="first-li">张立新</li>'
                        + '</ul>'
                        + '</td>'
                        + '<td class="padd">'
                        + '<ul>'
                        + '<li class="first-li">2018-04-10</li>'
                        + '</ul>'
                        + '</td>'
                        + '<td class="padd rights open">'
                        + '<ul>'
                        + '<li class="first-li">'
                        + '<div class="switch1">'
                        + '<div class="switch2"></div>'
                        + '</div>'
                        + '</li>'
                        + '</ul>'
                        + '</td>'
                        + '<td>'
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
        $("tbody").on("click", ".padd li", function () {
            // var _index = $(this).index();
            // console.log("aaa"+_index);
            // var uls = $(this)
            // for()
            // $(this).css({"background":"red"});
            // $(this).find("input").css({"background":"red"});
        })

        //保存
        $("#save").on("click", function () {

        })
        //刷新
        $("#refresh").on("click", function () {
            wareHouse.wareHouseRequest();
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
                wareHouse.wareHouseReader(datas);
            },
            error: function () {
            }
        })
    },

    wareHouseReader: function (datas) {
        var _html = '';
        var wareHouseReaderList = datas;
        console.log(wareHouseReaderList);
        for (var i = 0; i < wareHouseReaderList.length; i++) {
            _html += '<tr>'
                + '<td>' + cranePositionERPReaderList[i].storageLocationName + '</td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpCompanyId + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpCompanyName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpFactoryName + '"></td>'
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].storageLocationPoint + '"></td>'
                + '<td>' + cranePositionERPReaderList[i].preserveName + '</td>'
                + '<td>' + wareHouse.timeFormat(cranePositionERPReaderList[i].preserveTime) + '</td>'
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