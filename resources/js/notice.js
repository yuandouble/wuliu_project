$(function(){

	UE.getEditor('container');  //实例化编辑器

	var notice_action = new notice();  //初始化须知须知模块

	$("#container").html("hello????来尝试下哈哈");

	//点击修改的按钮，切换到可编辑状态；
	$("#notice_edit_btn").on("click",function(){
		notice_action.show_edit();
	});
	//点击发布按钮，进行发布；
	$("#notice_publish_btn").on("click",function(){
		notice_action.publish(function(dt){
			$("#notice_page .notice_priview").html(dt);
		});
	});
	//点击保存按钮，进行保存
	$("#notice_store_btn").on("click",function(){
		notice_action.store(function(dt){
    		$("#notice_page .notice_priview").html(dt);
		});
	});
	//点击取消按钮，切换到不可编辑状态
	$("#notice_cancel_btn").on("click",function(){
		 notice_action.show_demo();
	});
});


//入厂须知模块的基本方法
function notice(){
    this.notice_page =  $("#notice_page");
    this.notice_edit_page = $("#notice_edit_page");
}

//显示预览
notice.prototype.show_demo=function(){
	this.notice_page.show();
	this.notice_edit_page.hide();
}

//显示编辑
notice.prototype.show_edit=function(){
	this.notice_page.hide();
	this.notice_edit_page.show();
}

//保存功能
notice.prototype.store=function(cb){
    var get_dt = this.get_editor();
    cb && cb(get_dt);  //进行回调
}

//发布功能
notice.prototype.publish=function(cb){
    var get_dt = this.get_editor();
	cb && cb(get_dt);   //进行回调
}

//获取编辑器里的内容；
notice.prototype.get_editor=function(){
    return UE.getEditor('editor').getContent();
}

//将页面的内容插入编辑器里；
notice.prototype.insert_editor=function(notice_content){
	UE.getEditor('editor').setContent(notice_content, true);
}

//编辑器内容的发送
notice.prototype.send_dt=function(){
	
}