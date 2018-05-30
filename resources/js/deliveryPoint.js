(function () {
    $(document).ready(function () {
        deliveryPoint.bindEvent();
        deliveryPoint.deliveryPointRequest();
    })
})()

var deliveryPoint = {
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
            deliveryPoint.deliveryPointRequest();
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
    deliveryPointRequest:function (datas) {
        $.ajax({
            // url:"",
            // type:"get",
            // timeout:10000,
            // data:{
            //
            // },
            success:function (data) {
                var data ={

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
                                    "value": " 0 "
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
                                {"name":" pointerCode ","value":"","prompt":"发运点编码"},
                                {"name":" pointerName ","value":"","prompt":"发运点名称"},
                                {"name":" status ","value":"","prompt":"状态"},
                                {"name":" operator ","value":"","prompt":"操作人"},
                                {"name":" operateTime ","value":"","prompt":"操作时间"},
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
            error:function (data) {

            }
        })
    },
    deliveryPointReader:function (datas) {
        var _html = '';
        var deliveryPointList = datas;
        console.log(deliveryPointList);
        for(var i = 0; i < deliveryPointList.length; i++){
            _html+= '<tr>'
                +'<td>'+deliveryPointList[i].pointerCode+'</td>'
                +'<td><input type="text" readonly value="'+deliveryPointList[i].pointerName+'"></td>'
                +'<td>'+deliveryPointList[i].operator+'</td>'
                +'<td>'+commons.timeFormat(deliveryPointList[i].operateTime)+'</td>'
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