$(document).ready(function () {
    productInfo.bindEvent();
    productInfo.productRequest();
})
var productInfo = {
    bindEvent:function () {
        var flag = true;
        var typeFlag = false;
        $("#refresh").on("click",function () {
            productInfo.productRequest();
        })
        //高级搜索
        $("#advSearch").on("click",function () {
            if(flag){
                $("#searchModal").show();
                $("#advBtn").html("收起");
                flag = false;
            }else{
                $("#searchModal").hide();
                $("#advBtn").html("高级搜索");
                flag = true;
            }
        })
        //高级搜索清除
        $("#searchClear").on("click",function () {
            $("#searchModal input").val("");
            $(".s-types").html("全部类型");
        })

        //危化品下拉框
        $(".types").on("click",function () {
            typeFlag = !typeFlag;
            if(typeFlag){
                $(".type-list").show();
            }else{
                $(".type-list").hide();
            }
        })
        //高级搜索里面下拉框
        $(".s-types").on("click",function () {
            typeFlag = !typeFlag;
            if(typeFlag){
                $(this).siblings(".s-type-list").show();
            }else{
                $(this).siblings(".s-type-list").hide();
            }
        })
        //危化品选择
        $(".type-list").on("click","li",function () {
            $(".types").html($(this).html());
            $(".type-list").hide();
            typeFlag  = false;
            $("tbody tr").hide();
            $("tbody tr").each(function () {
                if($(".types").html() == "全部类型"){
                    $("tbody tr").show();
                }else if($(this).attr("dangerlevel") ==  $(".types").html()){
                    $(this).show().siblings().hide();
                }
            })
        })
        $(".type-select,.select").on("mouseleave",function () {
            $(".type-list").hide();
            $(".s-type-list").hide();
            typeFlag  = false;
        })
        //搜索类型选择
        $(".s-type-list").on("click","li",function () {
            $(this).parent().siblings(".s-types").html($(this).html());
            $(".s-type-list").hide();
            typeFlag  = false;
        })
        //点击新增，添加一条进来；

        //点击批量导入，进行文件上传，批量导入信息
        
    },

    // 产品信息查询
    productRequest:function (datas) {
        $.ajax({
            // url:"",
            // type:"get",
            // timeout:10000,
            // data:{
            //
            // },
            success:function (data) {
                var data ={ "collection": {
                    "version": 1.0,
                        "href": "http://IOLService/cbmetrls",
                        "items": [{
                        "href": "{id}",
                        "data": [{
                            "name": "productId",
                            "value": " 00001 "
                        },
                            {
                                "name": "productLevelId",
                                "value": "000001 "
                            },
                            {
                                "name": "mesCode",
                                "value": "0000001"
                            },
                            {
                                "name": "mesName",
                                "value": "97#汽油"
                            },
                            {
                                "name": "erpCode",
                                "value": "333322 "
                            },
                            {
                                "name": "erpName",
                                "value": "97#汽油"
                            },
                            {
                                "name": "limCode",
                                "value": "2434"
                            },
                            {
                                "name": "limsName",
                                "value": "97#汽油"
                            },
                            {
                                "name": "dangerLevel",
                                "value": "一般危化品"
                            },
                            {
                                "name": "entruckingType",
                                "value": "常客"
                            },
                            {
                                "name": "settlementType",
                                "value": "结算"
                            },

                            {
                                "name": "erpAccountMark",
                                "value": "是"
                            }
                        ],
                        "links": []
                    }],
                        "queries": [{
                        "href": " http://IOLService/cbmetrls",
                        "rel": "search",
                        "prompt": "1、列表查询",
                        "data": [
                            {
                                "name": "$mesCode",
                                "value": ""
                            },
                            {
                                "name": "$mesName",
                                "value": ""
                            }, {
                                "name": "$erpCode",
                                "value": ""
                            }, {
                                "name": "$erpName",
                                "value": ""
                            }, {
                                "name": "$limsCode",
                                "value": ""
                            }, {
                                "name": "$limsName",
                                "value": ""
                            }



                        ]
                    }
                    ],
                        "templates": {
                        "data": [
                            {"name":"mesCode","value":"","prompt":"mes物料编码"},
                            {"name":"mesName","value":"","prompt":"mes物料名称"},
                            {"name":"erpCode","value":"","prompt":"erp物料编号"},
                            {"name":"erpName","value":"","prompt":"erp物料名称"},
                            {"name":"limsCode","value":"","prompt":"lims物料编码"},
                            {"name":"limsName","value":"","prompt":"lims物料名称"},
                            {"name":" dangerLevel ","value":"","prompt":"危化品等级"},
                            {"name":"ertruckingType","value":"","prompt":"装车费类型"},
                            {"name":"settlementType","value":"","prompt":"结算类型"},
                            {"name":" erpAccountMark ","value":"","prompt":"erp过账标识"},
                        ]
                    },
                    "error": {
                        "code": "",
                            "message": ""
                    }
                }

            };
                datas = cj.Parse(data);
                productInfo.productReader(datas);
            },
            error:function (data) {

            }
        })
    },

    productReader:function (datas) {
        var _html = '';
        var productList = datas;
        for(var i = 0; i < productList.length; i++){
            _html+= '<tr dangerLevel="'+productList[i].dangerLevel+'">'
                   +'<td>'+(i+1)+'</td>'
                   +'<td>'+productList[i].mesCode+'</td>'
                   +'<td>'+productList[i].mesName+'</td>'
                   +'<td>'+productList[i].erpCode+'</td>'
                   +'<td>'+productList[i].erpName+'</td>'
                   +'<td>'+productList[i].limCode+'</td>'
                   +'<td>'+productList[i].limsName+'</td>'
                   +'<td class="left">'+productList[i].dangerLevel+'</td>'
                   +'<td class="left">'+productList[i].entruckingType+'</td>'
                   +'<td>'+productList[i].settlementType+'</td>'
                   +'<td>'+productList[i].erpAccountMark+'</td>'
                   +'<td>'
                   +'<div class="fl img">'
                   +'<img src="../../resources/img/edit.png" alt="">'
                   +'</div>'
                   +'<div class="fl img">'
                   +'<img src="../../resources/img/delete.png" alt="">'
                   +'</div>'
                   +'</td>'
                   +'</tr>';
        }
        $("tbody").html(_html);
    }

}