//页面初始化
$(function(){

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
});

/*产品等级维护对话框类*/
function dialog_product_level(){
	dialog_basic.apply(this,arguments);      //属性继承
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

//当为编辑状态时，将数据全部插入到页面上去
dialog_product_level.prototype.Insert_dt=function(){

}

//提交表单数据
dialog_product_level.prototype.submit_data=function(){

}