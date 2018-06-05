$(function () {
    cranePositionERP.bindEvent();
    cranePositionERP.cranePositionERPRequest();
})

var cranePositionERP = {
    bindEvent: function () {
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
        //删除操作
        $("tbody").on("click", ".new-delete", function () {
            $(this).parents("tr").remove();
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
                        "href": "http://localhost:8094/IOLService/LocErpesPage",
                        "items": [
                            {
                                "data": [
                                    {
                                        "name": "erpStorageID",
                                        "value": 8
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": "21"
                                    },
                                    {
                                        "name": "erpCompanyName",
                                        "value": "xxxxxx"
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": "北京石化12"
                                    },
                                    {
                                        "name": "erpStorageName",
                                        "value": "朝阳区石化12"
                                    },
                                    {
                                        "name": "version",
                                        "value": 1
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
                                        "value": "2018-05-30 18:00:14"
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
                                        "value": "2018-05-30 16:15:57"
                                    },
                                    {
                                        "name": "Flag",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mtrl",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 25
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
                                        "name": "erpStorageID",
                                        "value": 6
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": "21"
                                    },
                                    {
                                        "name": "erpCompanyName",
                                        "value": "xxxxxx"
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": "北京石化12"
                                    },
                                    {
                                        "name": "erpStorageName",
                                        "value": "朝阳区石化12"
                                    },
                                    {
                                        "name": "version",
                                        "value": 1
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
                                        "value": "2018-05-30 18:00:14"
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
                                        "value": "2018-05-30 16:15:57"
                                    },
                                    {
                                        "name": "Flag",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mtrl",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 25
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
                                        "name": "erpStorageID",
                                        "value": 5
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": "21"
                                    },
                                    {
                                        "name": "erpCompanyName",
                                        "value": "xxxxxx"
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": "北京石化12"
                                    },
                                    {
                                        "name": "erpStorageName",
                                        "value": "朝阳区石化12"
                                    },
                                    {
                                        "name": "version",
                                        "value": 1
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
                                        "value": "2018-05-30 18:00:14"
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
                                        "value": "2018-05-30 16:15:57"
                                    },
                                    {
                                        "name": "Flag",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mtrl",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 25
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
                                        "name": "erpStorageID",
                                        "value": -36
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": "21"
                                    },
                                    {
                                        "name": "erpCompanyName",
                                        "value": "xxxxxx"
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": "北京石化12"
                                    },
                                    {
                                        "name": "erpStorageName",
                                        "value": "朝阳区石化12"
                                    },
                                    {
                                        "name": "version",
                                        "value": 1
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
                                        "value": "2018-05-30 18:00:14"
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
                                        "value": "2018-05-30 16:15:57"
                                    },
                                    {
                                        "name": "Flag",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mtrl",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 25
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
                                        "name": "erpStorageID",
                                        "value": -39
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": "21"
                                    },
                                    {
                                        "name": "erpCompanyName",
                                        "value": "xxxxxx"
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": "北京石化12"
                                    },
                                    {
                                        "name": "erpStorageName",
                                        "value": "朝阳区石化12"
                                    },
                                    {
                                        "name": "version",
                                        "value": 1
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
                                        "value": "2018-05-30 18:00:14"
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
                                        "value": "2018-05-30 16:15:57"
                                    },
                                    {
                                        "name": "Flag",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mtrl",
                                        "value": ""
                                    },
                                    {
                                        "name": "top",
                                        "value": 1
                                    },
                                    {
                                        "name": "size",
                                        "value": 25
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
                                    "value": true
                                },
                                {
                                    "name": "totalPages",
                                    "value": 1
                                },
                                {
                                    "name": "totalElements",
                                    "value": 9
                                },
                                {
                                    "name": "size",
                                    "value": 25
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
                                    "value": "[{\"ascending\":false,\"direction\":\"DESC\",\"ignoreCase\":false,\"nullHandling\":\"NATIVE\",\"property\":\"erpStorageID\"}]"
                                },
                                {
                                    "name": "numberOfElements",
                                    "value": 9
                                }
                            ]
                        },
                        "templates": [
                            {
                                "data": [
                                    {
                                        "name": "erpStorageID",
                                        "value": ""
                                    },
                                    {
                                        "name": "erpCompanyId",
                                        "value": ""
                                    },
                                    {
                                        "name": "erpCompanyName",
                                        "value": ""
                                    },
                                    {
                                        "name": "erpFactoryName",
                                        "value": ""
                                    },
                                    {
                                        "name": "erpStorageName",
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
                                    },
                                    {
                                        "name": "Flag",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationId",
                                        "value": ""
                                    },
                                    {
                                        "name": "storageLocationName",
                                        "value": ""
                                    },
                                    {
                                        "name": "mtrl",
                                        "value": ""
                                    }
                                ]
                            }
                        ]
                    }
                };
                datas = cj.Parse(data);
                cranePositionERP.cranePositionERPReader(datas);
            },
            error: function () {
            }
        })
    },

    //鹤位ERP库位映射信息数据展示
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
                + '<td><input type="text" readonly value="' + cranePositionERPReaderList[i].erpStorageName + '"></td>'
                + '<td>' + cranePositionERPReaderList[i].mntUserName + '</td>'
                + '<td>' + commons.timeFormat(cranePositionERPReaderList[i].mntDate) + '</td>'
                + '<td status = "' + cranePositionERPReaderList[i].Flag + '">'
            if (cranePositionERPReaderList[i].Flag == 1) {
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