//页面初始化
$(function(){
	productInfo.bindEvent();
	productInfo.productRequest();
});


/*产品等级维护对话框类*/
function dialog_product_level(){
	dialog_basic.apply(this,arguments);      //属性继承
    this.edit_dt = {};   //当前产品的数据
    this.title = ["新增产品","编辑产品"];    //数据
   // this.Events();
   this.init();
}

//类方法的继承
dialog_product_level.prototype = new dialog_basic();

//私有化事件绑定
//dialog_product_level.prototype.Events=function(){
//	this.init();
//}

//清空表单数据
dialog_product_level.prototype.clear_dialog=function(){

}
//拼接弹框上所有的数据
dialog_product_level.prototype.get_all_dt=function(){

}

//当弹框为编辑状态时，将数据插入到弹框当中去
dialog_product_level.prototype.Insert_edit_dt=function(){
    
    console.log("数据："+JSON.stringify(this.edit_dt));

    //物料类型; 

    //MES物料编码; 

    //MES物料名称; 

    //MES物料等级; 

    //ERP工厂;

    //ERP评估类型; 

    //ERP批次;

}

//当为编辑状态时，将数据全部插入到页面上去
dialog_product_level.prototype.Insert_dt=function(){

}

//提交表单数据
dialog_product_level.prototype.submit_data=function(){

}


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


        $("#product_level").on("click","img",function(){
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
                console.log(editData);
                dialog_product.edit_dt = editData; //将当期要编辑的这套数据存储起来；
                dialog_product.iseditor = true;   //将弹框的状态设置为编辑状态；
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
		var dialog_product = new dialog_product_level();

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
		$("#add_infolist_btn").click(function(){
			dialog_product.hide_dialog();
			dialog_upload.hide_dialog();
			file_infolist.show_dialog();
		}); 

		//物料编码的模糊搜索
		$("#wuliao_code").on("click",function(){
			$("#wuliao_code").parent().find(".type-list").show();
		});
		/*物料编码的下拉菜单点击选择以后，将数据填入物料编码的表单中，同时刷列表数据*/
		$("#wuliao_code").parent().find(".type-list li").on("click",function(){
			$("#wuliao_code").val($(this).text());
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