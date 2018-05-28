
//上传文件功能-----------------------------------------------------------
function dialog_upload_file(data){
	this.re_file=/^\S+.\xlsx$/;     //正则匹配文件类型的
	this.file_input=null;    		//上传表单
	this.load_url="";               //发送文件的接口
	this.xhr=null;                  //xhr对象	
	if(data){
		var file_type = data.type || "xlsx";

		this.re_file = new RegExp("^\\S+.\\"+file_type+"$");   //正则表达式

		this.load_url = data.url;   //上传文件接口	
	}
	this.init();
}

//初始化(默认上传的文件格式为.xlsx，若有不同，那么这里需要传参进行设置。)
dialog_upload_file.prototype.init = function(){
	this.file_input = $("#load_input")[0];
	this.events();   //初始化事件添加
}

dialog_upload_file.prototype.events = function(){
		
	var _this = this;

	//点击“关闭”按钮，关闭当前弹框
	$("#dialog_add_all .close_btn").on("click",function(){
		_this.hide_dialog();
	});

	//点击上传按钮，进行文件上传；
	$("#upload_file_trigger").on("click",function(){
		//_this.load_input_event(this);
		$(this).parent().find("input").click();
	});

	//当选取了文件后，表单监测到，自动开始上传文件	
	$("#load_input").on("change",function(){
		console.log("监测到选择文件了");
		_this.fileSelected();   //读取文件信息
		$('#load_input').replaceWith('<input type="file" class="file_input hidden" id="load_input" />');
	});
	
	//点击“取消导入”，取消文件上传
	$("#load_cancel_btn").on("click",function(){
		_this.uploadCanceled();
	});

	/*点击重新上传*/
	$("#reload_btn").on("click",function(){
		_this.fileSelected();
	});
	/*点击取消，关闭当前上传失败的弹框，回到最初的上传弹框部分*/
	$("#reload_cancel_btn").on("click",function(){
		//隐藏所有的弹框
		_this.hide_all_upload_dialog(function(){
			$("#dialog_add_all .upload_file").show();     //上传文件弹框
		});
	});
}

//触发上传表单的点击事件
dialog_upload_file.prototype.load_input_event = function(obj){
	return	$(obj).parent().find("input").click();			
}

dialog_upload_file.prototype.fileSelected = function(){
	 var file = this.file_input.files[0];
	 if (file) {
         var fileSize = 0;
         if (file.size > 1024 * 1024){
             fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';	         	
         }else{
         	 fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
         }
	     console.log('Name: ' + file.name);  //文件类型（文件名字+格式全称）
	     console.log('Size: ' + fileSize);   //文件大小
	     console.log('Type: ' + file.type);  //文件类

	     if(this.re_file.test(file.name)){
	        console.log("匹配成功");
	        this.uploadFile();            //开始上传
	     }else{
	        console.log("匹配失败");
	     }	        
     }
}

//发送文件的事件监听
dialog_upload_file.prototype.uploadFile = function(){
     var _this = this;
     var fd = new FormData();
     fd.append("file", this.file_input.files[0]);
     var xhr = new XMLHttpRequest();
     this.xhr = xhr;   //保存xhr对象
	//上传进度调用方法实现
     xhr.upload.addEventListener("progress", function(e){
	     _this.uploadProgress(e);	
     }, false);

     //请求完成
     xhr.addEventListener("load", function(e){
     	_this.uploadComplete(e);
     }, false); 

	  //请求失败
     xhr.addEventListener("error", function(){
     	_this.uploadFailed();	
     }, false);

    // xhr.addEventListener("abort", this.uploadCanceled, false);       //取消上传
     xhr.open("POST", this.load_url);									//修改成自己的接口
     xhr.send(fd);    													//发送文件数据	
}

//上传进度条的实现
dialog_upload_file.prototype.uploadProgress = function(evt){
	//隐藏所有的弹框，并进行回调，展示相应的弹框
	 this.hide_all_upload_dialog(function(){
		$("#dialog_add_all .loading_file").show();    //正在上传弹框（含进度条）
	 });

	 //进度条比例计算 
     if (evt.lengthComputable) {
         var percent = Math.round(evt.loaded * 100 / evt.total);      
         $("#progress_num").html(percent.toFixed(2)+'%');                  //百分比数字展示
         $("#progress_len").css("width",percent.toFixed(2)+'%');		   //百分比进度条效果

         //if(percent==100){

         //}
     }else{
         //document.getElementById('progress').innerHTML = 'unable to compute';
     }
}

//请求完成后进行的操作
dialog_upload_file.prototype.uploadComplete = function(){
	 var _this = this;
	 //隐藏所有的弹框，并进行回调，展示相应的弹框
	 this.hide_all_upload_dialog(function(){
		$("#dialog_add_all .load_success").show();    //上传成功弹框
		//当选取了文件后，表单监测到，自动开始上传文件	
		$("#load_input").on("change",function(){
			console.log("监测到选择文件了");
			_this.fileSelected();   //读取文件信息
			$('#load_input').replaceWith('<input type="file" class="file_input hidden" id="load_input" />');
		});
	 });

	 //调用信息列表的弹框，隐藏当前弹框；
	 setTimeout(function(){
		 $("#dialog_add_all").hide();
		 $("#add_contacts_list").show();	 	
	 },1000);

}

//请求失败后完成的操作；
dialog_upload_file.prototype.uploadFailed = function(){
 	//隐藏所有的弹框，并进行回调，展示相应的弹框
	 this.hide_all_upload_dialog(function(){
		$("#dialog_add_all .load_fail").show();    //上传失败弹框
	 });
}
//取消上传；
dialog_upload_file.prototype.uploadCanceled=function(cb) {

	this.xhr.abort();   //取消上传
	//隐藏所有的弹框，并进行回调，展示相应的弹框
	this.hide_all_upload_dialog(function(){
		$("#dialog_add_all .upload_file").show();     //上传文件弹框			
	});

	cb && cb();
}
//隐藏上传失败、正在上传、上传成功的信息提示框
dialog_upload_file.prototype.hide_all_upload_dialog=function(cb){

	$("#dialog_add_all .upload_file").hide();     //上传文件弹框

	$("#dialog_add_all .loading_file").hide();    //正在上传弹框（含进度条）

	$("#dialog_add_all .load_success").hide();    //上传成功弹框

	$("#dialog_add_all .load_fail").hide();       //上传失败弹框

	cb && cb();

}
//显示弹框
dialog_upload_file.prototype.show_dialog=function(){
	this.hide_all_upload_dialog(function(){
		$("#dialog_add_all .upload_file").show();     //上传文件弹框     		
		});
	$("#dialog_add_all").show();
	$("#screen_page").show();
}
//隐藏弹框
dialog_upload_file.prototype.hide_dialog=function(){
	$("#dialog_add_all").hide();
	$("#screen_page").hide();
}

//批量导入信息列表---------------------------------------------------------
function dialog_add_list(){
	this.url="";
	this.init();
}

dialog_add_list.prototype.init = function(){
	this.events();	
}

dialog_add_list.prototype.events = function(){
	var _this = this;
	//点击关闭按钮，关闭当前弹框
	$("#add_contacts_list .header .close_btn").click(function(){
		_this.hide_dialog();     //关闭弹框
		_this.clear_dialog();    //清空弹框里的数据
	});
	//点击确认导入按钮，确认导入信息；
	$("#add_contacts_sure").on("click",function(){
		//请求导入信息列表
		_this.get_file_dt(function(){
			_this.insert_dt();			//插入信息列表	
		});

	});
	//点击删除，删除某些信息
	$("#remove_contacts_sure").on("click",function(){
         if($("#infolist_arr_list input:checked").length>0){
         	 $("#infolist_arr_list input:checked").each(function(){
         	 	$(this).parents(".infolist_one").remove();
         	 });
         }else{
         	//提示用户去选中要删除的信息
         }
	});

	//全选/全不选
	$("#check_all").on("click",function(){
		var _this_check = this;
		$("#infolist_arr_list input:checkbox").each(function(){
			this.checked = _this_check.checked;
		});
	});
}
dialog_add_list.prototype.get_file_dt = function(){
	var _this = this;
	$.ajax({
		url:_this.url,
		method:"GET",
		success:function(dt){
			_this.insert_dt(dt);			
			cb && cb(dt);
		}
	});
}
//插入数据
dialog_add_list.prototype.insert_dt = function(){

}
dialog_add_list.prototype.hide_dialog = function(){
    $("#add_contacts_list").hide();
    $("#screen_page").hide();
}
dialog_add_list.prototype.show_dialog = function(){
    $("#add_contacts_list").show();
    $("#screen_page").show();
}
dialog_add_list.prototype.clear_dialog = function(){
	//$("#infolist_arr_list input:checked").each(function(){
 	 //	$(this).parents(".infolist_one").remove();
 	//});
    $("#infolist_arr_list .infolist_one").remove();
}

//（新增or编辑）弹框基本模型----------------------------------------------------------------

function dialog_basic(){
	this.img_list=["./../../img/edit.png","./../../img/edit_false.png","./../../img/delete.png","./../../img/delete_false.png"];
	this.title = ["新增客户","编辑客户"];
	this.title_in = 0;
}

dialog_basic.prototype.init = function(){
	$(".contacts_list_demo .contacts_one").data("btn","true");		
	//事件绑定
	this.events();
}

dialog_basic.prototype.events = function(){
	var _this = this;
	//点击关闭按钮，关闭当前弹框
	$("#add_dialog .header .close_btn").click(function(){
		_this.hide_dialog();
	});
	//点击取消，关闭当前弹框，并清空数据
	$("#add_dialog .cancel_btn").click(function(){
		_this.hide_dialog();
	});
	//“点击继续并新增”，新增一条，并且不关闭弹框
	$("#add_dialog .add_next_btn").click(function(){
		_this.submit_data(function(){
			//清空数据 or 不做处理；（进行新增一条）
		});
	});
	//点击"确定"新增一条，并关闭弹框，并清空数据
	$("#add_dialog .ensure_btn").click(function(){
		_this.submit_data(function(){
 			_this.hide_dialog();
			//清空数据 or 不做处理；（进行新增一条）
		});
	});
}

//提交数据
dialog_basic.prototype.submit_data = function(cb){
	cb && cb();
}

//设置弹框标题
dialog_basic.prototype.set_title = function(){
	var _this = this;
	$("#add_dialog .header").find("span").html(_this.title[_this.title_in]);
}

//隐藏对话框
dialog_basic.prototype.hide_dialog = function(){
    $("#add_dialog").hide();
    $("#screen_page").hide();
}

//显示对话框
dialog_basic.prototype.show_dialog = function(type){
	var _this = this;
    var oToggle_btn = $("#add_dialog .footer").find("input").eq(0);
    var dialog_footer = $("#add_dialog .footer");
    switch(type){
		//若是增加
    	case "add":
			oToggle_btn.show();
			dialog_footer.css("text-align","right");
			this.title_in = 0;
    	break;
		//若是编辑
    	case "edit":
			oToggle_btn.hide();
			dialog_footer.css("text-align","center");
			this.title_in = 1;
    	break;
    }
	//设置弹框title标题
	_this.set_title();
	//显示弹框
    $("#add_dialog").show();
    $("#screen_page").show();
}

//信息确认弹框------------------------------------------------------------------
function dialog_message(data){
	var dt = data || {};
	this.title = dt.title || "提示";              //弹框信息标题
	this.content = dt.content || "信息提示内容";  //弹框信息内容
	this.cancel_btn  = dt.cancel_btn || false;    //取消按钮开关 
	this.ensure_btn = dt.ensure_btn || false;     //确认按钮开关
	this.callback = dt.callback || false;         //回调
	//若设置了show_all_btn,确定和取消按钮的开关全部为true
	if(dt.show_all_btn){
		this.cancel_btn = true;	
		this.ensure_btn = true;
	}
	//初始化
	this.init();

}

//初始化
dialog_message.prototype.init = function(){
    this.setContent();
    this.show_button();
    this.show_dialog();
    this.Events();
}

//事件委托处理
dialog_message.prototype.Events=function(){
	
	var _this = this;

	//点击关闭按钮，关闭弹框
	$("#dialog_message .header").on("click","img",function(){
		_this.hide_dialog();
	});

	//点击确定/取消按钮，关闭弹框
	$("#dialog_message .footer").on("click","button",function(){
		_this.hide_dialog();
		if($(this).text()=="确认"){
			typeof this.callback=="function" || _this.callback();		
		}
	});
}

//设置弹框的标题和内容
dialog_message.prototype.setContent = function(){
	$("#dialog_message_t").html(this.title);
	$("#dialog_message_content").html(this.content);
}

//隐藏弹框
dialog_message.prototype.hide_dialog = function(cb){
	$("#dialog_message").hide();
	cb && cb();
}

//显示弹框
dialog_message.prototype.show_dialog = function(cb){
	$("#dialog_message").show();
	cb && cb();
}

//是否显示确定和取消按钮；
dialog_message.prototype.show_button = function(){
    //显示取消按钮
	var aBtn = $("#dialog_message .footer").find("button");
    if(this.cancel_btn){
         aBtn.eq(1).show();
    }else{
         aBtn.eq(1).hide();
    }
    //显示确定按钮
    if(this.ensure_btn){
         aBtn.eq(0).show();
    }else{
        aBtn.eq(0).hide();
    }
}
