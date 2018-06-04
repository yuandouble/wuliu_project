$(function(){
    productInfo.bindEvent();
    productInfo.productRequest();
});

//弹框主逻辑 start ------------------------------------

//产品信息维护弹框
function dialog_product_info(){
    dialog_basic.apply(this,arguments);      //属性继承
    this.title = ["新增产品","编辑产品"];    //数据
    this.edit_dt = {};                       //当前客户的相关数据
    this.Events();
}

//类方法的继承
dialog_product_info.prototype = new dialog_basic();

dialog_product_info.prototype.Events = function(){
        var _this = this;
        this.init();
        $("#car_type_list").on("click",function(e){
            if(e.target.tagName=="DIV" && $(e.target).hasClass("info_box")){
                //点击装车费类型，出现下拉框；                
                $(e.target).parents(".customer_info_one").find("ul").toggle();
            }
            if(e.target.tagName=="LI"){
                //选择下拉框中的某一项，将选择的数据填充到装车费类型里去；
                $(e.target).parents(".customer_info_one").find(".info_box").attr("value",$(e.target).attr("value"));
                $(e.target).parents(".customer_info_one").find(".info_box").find("label").html($(e.target).text());
                //隐藏菜单
                $(e.target).parent().hide();
            }
        });

        //鼠标滑过下拉框，每一项有选中效果；
        $("#customer_menu li").hover(function(){
            //鼠标滑入
            $(this).parent().find("li").removeClass("act");
            $(this).addClass("act");
        },function(){
            //鼠标滑出
            $(this).parent().find("li").removeClass("act");
        });
}

//清空表单数据
dialog_product_info.prototype.clear_dialog=function(cb){

    $("#add_dialog .customer_info").find("input").val("");    //清空所有表单存储的值
    //删除存储的产品id属性值；
    $("#add_dialog").removeAttr("productlevel_id");
    $("#add_dialog").removeAttr("product_id");
    //清空所有选中状态的数据
    $("#add_dialog input:radio").each(function(){
        this.checked = false;
    });

    //危化品类型默认选择第一个
    $("#denger_status").find("label").html($("#danger_menu li").eq(0).text());
    $("#denger_status").parent().attr("value",$("#danger_menu li").eq(0).attr("value"));       

    cb && cb();
}
//拼接弹框上所有的数据
dialog_product_info.prototype.get_all_dt=function(){
    /*
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
    */
    var json_dt = {};

    json_dt.mesCode = $("#mes_code").val();    //mes物料编码

    json_dt.mesName = $("#mes_code").val();    //mes物料名称

    json_dt.erpCode = $("#mes_code").val();    //erp物料编号

    json_dt.erpName = $("#mes_code").val();    //erp物料名称

    json_dt.limsCode = $("#mes_code").val();    //lims物料编码

    json_dt.limsName = $("#mes_code").val();    //lims物料名称

    json_dt.dangerLevel = $("#denger_status").parent().attr("value")    //危化品等级

    json_dt.ertruckingType = $("#type_list input:checked").val();    //装车费类型

    json_dt.settlementType = $("#count_before input:checked").val();    //结算类型

    json_dt.erpAccountMark = $("#erp_count input:checked").val();    //erp过账标识

    return json_dt;
       
}
//当为编辑状态时，将数据全部插入到页面上去
dialog_product_info.prototype.Insert_dt=function(){

}
//提交表单数据
dialog_product_info.prototype.submit_data=function(cb){
    
    cb && cb();
}

//当前产品，编辑弹框，数据填充
dialog_product_info.prototype.Insert_edit_dt=function(){
    console.log("当前产品的数据："+JSON.stringify(this.edit_dt));

    /*
    {
        "productId":" 00001 ",
        "productLevelId":"000001 ",

        "mesCode":"0000001",
        "mesName":"97#汽油",
        
        "erpCode":"333322 ",
        "erpName":"97#汽油",
        
        "limCode":"2434",
        "limsName":"97#汽油",
       
        "dangerLevel":"一般危化品",
        "entruckingType":"常客",
        "settlementType":"结算",
        "erpAccountMark":"是"

    }
    */
    
    //产品id;
    $("#add_dialog").attr("product_id",this.edit_dt.productId);
    //产品等级id;
    $("#add_dialog").attr("productLevel_id",this.edit_dt.productLevelId);
    //物料mes编码和物料mes名称；
    $("#mes_code").val(this.edit_dt.mesCode);
    $("#mes_name").val(this.edit_dt.mesName);
    
    //物料ERP编码和物料ERP名称；
    $("#erp_code").val(this.edit_dt.erpCode);
    $("#erp_name").val(this.edit_dt.erpName);

    //物料LIMS编码和物料LIMS名称；
    $("#lims_code").val(this.edit_dt.limCode);
    $("#lims_name").val(this.edit_dt.limsName);

    //危化品类型

    //装车费收费类型

    //提前结算标记

    //ERP发货过账标记

}


//弹框主逻辑 end --------------------------------------


//产品信息维护列表页主效果-----------------------------
var productLis = "";
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
        });


        $("#productInfo").on("click","img",function(){
            //点击编辑按钮，显示编辑弹框
            if($(this).attr("src").indexOf("edit.png")!=-1){
                 //当前产品的所有数据拼接
                //拼接数据
                var productId = $(this).parents("tr").attr("productId"),
                    editData;
                for(var i = 0; i < productLis.length; i++){
                    if(productLis[i].productId == productId){
                        editData = productLis[i];
                    }
                }
                dialog_product.edit_dt = editData; //将当期要编辑的这套数据存储起来；

                  dialog_product.show_dialog("edit",function(){
                       dialog_product.Insert_edit_dt();
                  });  
            };
            //点击删除按钮，删除这一行；
            if($(this).attr("src").indexOf("delete.png")!=-1){
                $(this).parents("tr").remove();
            };
        });

        //弹框主逻辑----------------------start

        //初始化新增（编辑）产品信息
        var dialog_product = new dialog_product_info();

        //初始化文件上传
        var dialog_upload = new dialog_upload_file();

        //初始化批量导入信息
        var file_infolist = new dialog_add_list();   

        //点击新增按钮，展示新增弹框
        $("#add_one_btn").click(function(){
            dialog_product.show_dialog("add");
        });
        //点击编辑按钮，展示编辑弹框
        $("#edit_one_btn").click(function(){
            dialog_product.show_dialog("edit");
        });
        
        //点击批量导入按钮，展示批量导入弹框
        $("#add_list_btn").click(function(){
            dialog_product.hide_dialog();
            file_infolist.hide_dialog();
            dialog_upload.show_dialog();
        });

        //点击批量导入文件信息
        $("#dialog_product").click(function(){
            dialog_product.hide_dialog();
            dialog_upload.hide_dialog();
            file_infolist.show_dialog();
        }); 

        //弹框主逻辑----------------------end
        
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
                productLis = cj.Parse(data);
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
            _html+= '<tr productId="'+productList[i].productId+'" dangerLevel="'+productList[i].dangerLevel+'">'
                   +'<td>'+(i+1)+'</td>'
                   +'<td>'+productList[i].mesCode+'</td>'
                   +'<td>'+productList[i].mesName+'</td>'
                   +'<td>'+productList[i].erpCode+'</td>'
                   +'<td>'+productList[i].erpName+'</td>'
                   +'<td>'+productList[i].limCode+'</td>'
                   +'<td>'+productList[i].limsName+'</td>'
                   +'<td>'+productList[i].dangerLevel+'</td>'
                   +'<td>'+productList[i].entruckingType+'</td>'
                   +'<td>'+productList[i].settlementType+'</td>'
                   +'<td>'+productList[i].erpAccountMark+'</td>'
                   +'<td>'
                   +'<div class="fl img">'
                   +'<img src="./../../img/edit.png" alt="">'
                   +'</div>'
                   +'<div class="fl img">'
                   +'<img src="./../../img/delete.png" alt="">'
                   +'</div>'
                   +'</td>'
                   +'</tr>';
        }
        $("tbody").html(_html);
    }

}