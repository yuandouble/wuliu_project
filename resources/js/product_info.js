//页面初始化
$(function(){

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
});

//产品信息维护弹框
function dialog_product_info(){
	dialog_basic.apply(this,arguments);      //属性继承
    this.title = ["新增产品","编辑产品"];    //数据
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
dialog_product_info.prototype.clear_dialog=function(){

}
//拼接弹框上所有的数据
dialog_product_info.prototype.get_all_dt=function(){

}
//当为编辑状态时，将数据全部插入到页面上去
dialog_product_info.prototype.Insert_dt=function(){

}
//提交表单数据
dialog_product_info.prototype.submit_data=function(cb){
	cb && cb();
}