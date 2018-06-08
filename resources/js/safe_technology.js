
//页面初始化
$(function(){

   //安全教育材料维护模块
    var oTechnology = new safe_technology();

	//初始化文件上传
   	var dialog_upload = new dialog_upload_file();

	//初始化批量导入信息
    var file_infolist = new dialog_add_list();

    $("#menu_list div").on("click",function(e){
    	switch($(this).text()){
		    //上传功能
			case "上传":
				oTechnology.hide_dialog();
				file_infolist.hide_dialog();
				dialog_upload.show_dialog();
			break;
		    //下载功能
			case "下载":
				window.location.href = $(this).attr("_href");
			break;
		    //删除功能
			case "删除":
				oTechnology.delete($("#technology_list tbody input:checked"));
			break;
		    //刷新功能
			case "刷新":
				window.location.reload();
			break;
    	}
    });

    //上传、下载、删除、刷新 按钮滑过效果；
    common_frame.btn_hover($("#menu_list div"),"active");

    //模糊搜索模块
    new search_block({
    	  posi_box:$("#search_input_box"),                //下拉菜单参考的其它demo位置;
		  oInput:$("#search_input_box input"),   	      //表单输入框;
    	  oSearch_btn:$("#search_input_box div"),         //搜索按钮;
   		  oList_box:$("#search_menu_list"),               //下拉菜单;
    	  demo:"li",                  					  //下拉列表每一项的demo标签;
    	  url:"",										  //模糊搜索请求的url;
    	  key:"",										  //模糊搜索，请求后端需要的字段
    });
    
});


//搜索模块类
function search_block(){
	search_model.apply(this,arguments);         //属性继承
    this.init();				               //事件初始化;
}

search_block.prototype = new search_model();    //方法继承


//初始化
search_block.prototype.init=function(){
	this.bindEvent();
}

//刷新页面列表数据
search_block.prototype.refresh_page_list=function(){
     
};

//填充搜索下拉菜单列表数据
search_block.prototype.search_dt=function(dt){
      
};


function safe_technology(){
	dialog_basic.apply(this,arguments);      //属性继承
    this.title = ["新增客户","编辑客户"];    //数据
    this.edit_dt = {};                       //当前客户的相关数据
    //用于测试
	//this.insert_data();
	//私有事件
	this.Events();
}

//类方法的继承
safe_technology.prototype = new dialog_basic();

//其它事件绑定
safe_technology.prototype.Events = function(){
	var _this = this;

	this.init();  //公有事件

	//鼠标滑过下拉框，每一项有选中效果；
    $("#customer_menu li").hover(function(){
    	//鼠标滑入
    	$(this).parent().find("li").removeClass("act");
    	$(this).addClass("act");
    },function(){
        //鼠标滑出
    	$(this).parent().find("li").removeClass("act");
    });

    //列表页头全选功能
	$("#technology_list thead").on("click","input:checkbox",function(e){
    	  //全选、全不选功能
          $("#technology_list tbody input:checkbox").each(function(){
			  this.checked = e.target.checked;
		  })
	});
	//当单选时，只要有一个没有选中，那么此刻应当取消页头的全选功能；若列表页全部选中，那么此刻页头的全选功能也是选中状态；
	$("#technology_list tbody").on("click","input:checkbox",function(){
		var trigger_btn = true;
		$("#technology_list tbody input").each(function(){
			if(!this.checked){
				trigger_btn = false;	
			}
		});
		$("#technology_list thead input:checkbox")[0].checked = trigger_btn;
	})

}

//上传文件
//safe_technology.prototype.upload = function(){

//}

//删除功能
safe_technology.prototype.delete = function(aInput){
	$(aInput).each(function(){
		$(this).parents("tr").remove();
	})
}
//刷新功能
safe_technology.prototype.refresh = function(){

}

//插入搜索数据
safe_technology.prototype.search_insert_list = function(){

}

//填充列表
safe_technology.prototype.insert_list = function(){

}

//清空表单数据
safe_technology.prototype.clear_dialog = function(){
    $("#add_dialog .customer_info").find("input").val("");
    $("#add_dialog .contacts_list_demo").html("");
}

//提交表单数据(通过回调函数进行回调)
safe_technology.prototype.submit_data = function(cb){
    var _this = this;
	var post_dt = this.selection_data(),  		 //拼接数据
		sub_type = this.iseditor?"PUT":"POST";   //提交方式，PUT为编辑提交；POST为新增；
		//提交
		$.ajax({
			url:"http://IOLService/customers",
			data:post_dt,
			method:sub_type,
			success:function(res){
				//提交成功后,重新刷新数据
	            customer.customerRequest();
			    //清空弹框数据；
			    _this.clear_dialog();
				cb && cb();
			},
			fail:function(){

			}
		})
}
