(function () {
   $(document).ready(function () {
       cranePosition.bindEvent();
       cranePosition.cranePositionRequest();
   })
})()

var cranePosition = {
    bindEvent:function () {
        //新增
        $("#add").on("click",function () {
            if($("tbody input").hasClass("active")){
                info("请先保存修改项",'温馨提示',function () {});
            }else {
                var _tr = '<tr class="add">'
                    +'<td>12338746</td>'
                    +'<td><input type="text"></td>'
                    +'<td>张立新</td>'
                    +'<td>2018-04-10</td>'
                    +'<td>'
                    +'<div class="switch1">'
                    +'<div class="switch2"></div>'
                    +'</div>'
                    +'</td>'
                    +'<td>'
                    +'</td>'
                    +'</tr>';
                $("tbody").find("tr").eq(0).before(_tr);
            }
        });
        //保存
        $("#save").on("click",function () {

        })
        //刷新
        $("#refresh").on("click",function () {
            cranePosition.cranePositionRequest();
        })
        //修改操作
        $("tbody").on("click",".edit",function () {
            if($("tbody tr").hasClass("add")){
                info("请先保存新增项",'温馨提示',function () {});
            }else {
                $(this).parents("tr").find("input").addClass("active").removeAttr("readonly");
            }
        })
        // 启用禁用开关
        $("tbody").on("click",".switch1",function () {
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                $(this).find(".switch2").removeClass("active");
            }else{
                $(this).addClass("active");
                $(this).find(".switch2").addClass("active");
            }
        })
    },
    //鹤位信息查询
    cranePositionRequest:function (datas) {
        $.ajax({
            // url:"",
            // type:"get",
            // timeout:10000,
            // data:{
            //
            // },
            success:function (data) {
                var data ={"collection": {
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
                                "value": "0"
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
                            {"name":" cranePositionCode ","value":"","prompt":"鹤位编码"},
                            {"name":" crane_position_name","value":"","prompt":"鹤位名称"},
                            {"name":"status","value":"","prompt":"状态"},
                            {"name":"operator","value":"","prompt":"操作人"},
                            {"name":"operate_time","value":"","prompt":"操作时间"},
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
            error:function (data) {

            }
        })
    },
    cranePositionReader:function (datas) {
        var _html = '';
        var cranePositionList = datas;
        console.log(cranePositionList);
        for(var i = 0; i < cranePositionList.length; i++){
            _html+= '<tr>'
                   +'<td>'+cranePositionList[i].cranePositionCode+'</td>'
                   +'<td><input type="text" readonly value="'+cranePositionList[i].cranePositionName+'"></td>'
                   +'<td>'+cranePositionList[i].operator+'</td>'
                   +'<td>'+commons.timeFormat(cranePositionList[i].operateTime)+'</td>'
                   +'<td>'
                   +'<div class="switch1">'
                   +'<div class="switch2"></div>'
                   +'</div>'
                   +'</td>'
                   +'<td>'
                   +'<div class="fl img edit">'
                   +'<img src="./../../img/edit.png" alt="">'
                   +'</div>'
                   +'<div class="fl img delete">'
                   +'<img src="./../../img/delete.png" alt="">'
                   +'</div>'
                   +'</td>'
                   +'</tr>';
        }
        $("tbody").html(_html);
    }
}