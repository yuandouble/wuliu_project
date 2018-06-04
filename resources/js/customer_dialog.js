//页面初始化
$(function(){
    customer.bindEvent();
    customer.customerRequest();
});

function customer_dialog(){
	dialog_basic.apply(this,arguments);      //属性继承
    this.title = ["新增客户","编辑客户"];    //数据
    this.edit_dt = {};                       //当前客户的相关数据
    //用于测试
	this.insert_data();
	//私有事件
	this.Events();
}

//类方法的继承
//common_frame.extend(dialog_basic,customer_dialog);
customer_dialog.prototype = new dialog_basic();

//其它事件绑定
customer_dialog.prototype.Events=function(){
	var _this = this;

	this.init();  //公有事件

	//点击“联系人信息的增加按钮”添加一条可编辑的联系人信息；
	$("#add_dialog .add_contacs_btn").click(function(){
		  _this.add_contacts_one(true);
	});
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

    //客户新增or编辑弹框上，联系人列表是否编辑可操作
	$("#add_dialog .contacts_list_demo").on("click",function(e){
		if(e.target.tagName=="IMG"){
			//点击"删除"按钮，删除当前这条联系人信息；
			if($(e.target).hasClass("delete_btn_one")){
				_this.delete_one(e.target);
			}
			//点击“编辑”按钮，编辑(切换隐藏)当前这条联系人信息；
			if($(e.target).hasClass("edit_btn_one")){
				_this.edit_one(e.target);
			}
		}
	});
}

//清空表单数据
customer_dialog.prototype.clear_dialog = function(){
    $("#add_dialog .customer_info").find("input").val("");
    $("#add_dialog .contacts_list_demo").html("");
}

//校验表单数据
customer_dialog.prototype.check_data = function(){
	//客户名称
	if($("#customer_name").val()==""){
		alert("请填写客户名称");
	}
	//客户联系电话
	if($("#customer_tel").val()==""){
		alert("请填写客户电话");
	}
	//客户编码
	if($("#customer_code").val()==""){
		alert("请填写客户编码");
	}
	//装车费类型
	if($("#customer_type").val()==""){
		alert("请选择装车费类型");
	}		
	//客户地址
	if($("#customer_addr").val()==""){
		alert("请填写客户地址");
	}

	//联系人信息的校验
	//var contacts_list = $(".contacts_list_demo").find(".contacts_one");
}

//提交表单数据(通过回调函数进行回调)
customer_dialog.prototype.submit_data = function(cb){
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

//弹框拼接数据
customer_dialog.prototype.selection_data=function(){
     var json_dt = {};

     //拼接客户信息
     var customerName  = $("#customer_name").val(),    //客户名称
     	 customerPhone  = $("#customer_name").val(),   //客户联系电话
         customerCode  = $("#customer_name").val(),      //客户编码：
         customerAddress  = $("#customer_name").val(); //客户地址
	
	json_dt.customerName = customerName;
	json_dt.customerPhone = customerPhone;
	json_dt.customerId = customerCode;
	json_dt.customerAddress = customerAddress;

	json_dt.loadingType = "";  //装车费类型(1:常客2：散户3：无需缴费)

	if(this.iseditor){
  	    json_dt.userFlag="";  				 //编辑模式，是否为启用状态，看当前编辑这条客户的状态是否为启用状态；
    	json_dt.customerId = $("#customer_name").attr("customerId");     //客户id唯一标识			      
		json_dt.source = "";       			 //来源（1:手工新增0：ERP批量导入）
	}else{
  	    json_dt.userFlag="";  				//新增模式，只能为启用状态；		
	}
    
     //拼接联系人信息集合
     var contacts_list = [];

     $(".contacts_list_demo .contacts_one").each(function(){
     	var one_dt = {};   //单条联系人的信息
		one_dt.contactName = $(this).find("input").eq(0).val();    //联系人姓名
		one_dt.contactPhone = $(this).find("input").eq(1).val();    //联系人电话
		one_dt.contactCardId = $(this).find("input").eq(2).val();    //联系人身份证号码
		contacts_list.push(one_dt);		
		one_dt = null;
     });
     json_dt.$contactList = contacts_list;

     //返回数据
	 return json_dt;		         

	/*
	//提交的数据格式：
	"templates" : {
	   "data" : [
		  	{"name":" customerName ","value":"","prompt":"客户名称"},
			{"name":" customerPhone ","value":"","prompt":"客户联系电话"},
			{"name":"customerId","value":"","prompt":"客户编码：唯一标识"},
			{"name":"customerAddress","value":"","prompt":"客户地址"},
			{
			  	"name":"$contactList ",
			  	"value":[
			  				{
					            "name": "contactName",
					            "value": "",
					            "prompt":"联系人姓名"
					        },
							{
					            "name": " contactPhone ",
					            "value": "",
					            "prompt":"联系人电话"
					        },
					        {
								"name": " contactCardId ",
							    "value": "",
								"prompt":"联系人身份证号码"
							}
						],
				"prompt":"联系人集合"
			}
		]
	}
	*/
}

//编辑其中一条联系人信息；
customer_dialog.prototype.edit_one=function(obj){
	var cur_btn = true;
	switch($(obj).parents(".contacts_one").data("btn")){
		case "true":
			cur_btn = false;
			$(obj).parents(".contacts_one").data("btn","false");
		break;
		case "false":
			cur_btn = true;
			$(obj).parents(".contacts_one").data("btn","true");
		break;
	}
	this.set_isedit($(obj).parents(".contacts_one"),cur_btn);	
}


//删除其中一条联系人信息；
customer_dialog.prototype.delete_one=function(obj){
	$(obj).parents(".contacts_one").remove();
}


//添加一条联系人信息；(默认，添加的是不带有编辑状态的，有具体数据的；若传参数为true，那么表示要添加带有编辑状态且无数据的表格；)
customer_dialog.prototype.add_contacts_one=function(obj_btn,data){
	var _this = this,
	    edit_btn = obj_btn || false,
	    contact_one = $('<div class="contacts_one">'+
			'<p class="contacts_w_0 fl">'+
				'<label class="ft_red ml_0 mr_1 fl">*</label>'+
				'<input type="text" value="" class="contacts_text contacts_w_2" />'+
			'</p>'+
			'<p class="contacts_w_0 fl">'+
				'<label class="ft_red ml_0 mr_1 fl">*</label>'+
				'<input type="text" value="" class="contacts_text contacts_w_2" />'+
			'</p>'+
			'<p class="contacts_w_1 fl">'+
				'<label class="ft_red ml_0 mr_1 fl">*</label>'+
				'<input type="text" value="" class="contacts_text contacts_w_3" />'+
			'</p>'+
			'<p class="contacts_w_0 fl edit_box">'+
				'<img src="" alt="" class="edit_btn_one">'+
				'<img src="" alt="" class="delete_btn_one">'+
			'</p>'+
		'</div>');
	
	//有具体数据，需要插入，同时设置为不可编辑状态；
	if(data){
		_this.insert_data($(contact_one),data);
	}
	//表单设置为可编辑状态 or 不可编辑状态；
	_this.set_isedit($(contact_one),edit_btn);

	//添加到列表demo当中
   $(".contacts_list_demo").append(contact_one);
}


//当前这条联系人信息，可编辑状态与不可编辑状态切换展示，oPar表示单条联系人的盒子；btn为true表示可编辑，false表示不可编辑；
customer_dialog.prototype.set_isedit=function(oPar,btn){
  var _this = this,
	  edit_btn = btn || false,
      edit_img_src = edit_btn?_this.img_list[0]:_this.img_list[1],
      delete_img_src = edit_btn?_this.img_list[2]:_this.img_list[3];
	if(edit_btn){
		//表单可编辑
		$(oPar).find("input:text").removeClass("border_none");
		$(oPar).find("input:text").removeAttr("disabled");
		$(oPar).data("btn","true");
	}else{
		//设置为不可编辑状态
		$(oPar).find("input:text").addClass("border_none");
		$(oPar).find("input:text").attr("disabled",true);
		$(oPar).data("btn","false");
	}
	//按钮可编辑
	$(oPar).find("img.edit_btn_one").attr("src",edit_img_src);
	$(oPar).find("img.delete_btn_one").attr("src",delete_img_src);
}

//显示编辑框，并将客户的相关数据插进来
customer_dialog.prototype.insert_edit_dialog=function(){

    var _this = this; 	
	
	console.log("当前编辑的这条客户数据："+JSON.stringify(this.edit_dt));

	//客户状态
	$("#add_dialog").attr("customer_id",this.edit_dt.customerId);    						//客户id
	$("#add_dialog").attr("source",this.edit_dt.source?this.edit_dt.source:"");    			//客户来源
	$("#add_dialog").attr("userFlag",this.edit_dt.userFlag?this.edit_dt.userFlag:"");    	//启用状态
	
    
    //客户信息填充
    $("#customer_name").val(this.edit_dt.customerName);        //客户名称
	$("#customer_tel").val(this.edit_dt.customerPhone);		   //客户联系电话
	$("#customer_code").val(this.edit_dt.customerCode);		   //客户编码
	$("#customer_addr").val(this.edit_dt.customerAddress);	   //客户地址
	$("#car_type_list .info_box label").html(this.loadingType[this.edit_dt.loadingType]);   //装车费类型
	
     //客户相关的联系人列表信息填充
     var aContacs_list = this.edit_dt.contactList["0"]["value"];
     var Demo_list = "";     											//拼接联系人列表信息；
     for(var key in aContacs_list){
		Demo_list+='<div class="contacts_one">';
		Demo_list+='<p class="contacts_w_0 fl">';
		Demo_list+='<label class="ft_red ml_0 mr_1 fl">*</label>';
		Demo_list+='<input type="text" value="'+aContacs_list[key].contactName+'" class="contacts_text contacts_w_2">';
		Demo_list+='</p>';
		Demo_list+='<p class="contacts_w_0 fl">';
		Demo_list+='<label class="ft_red ml_0 mr_1 fl">*</label>';
		Demo_list+='<input type="text" value="'+aContacs_list[key].contactPhone+'" class="contacts_text contacts_w_2">';
		Demo_list+='</p>';
		Demo_list+='<p class="contacts_w_1 fl">';
		Demo_list+='<label class="ft_red ml_0 mr_1 fl">*</label>';
		Demo_list+='<input type="text" value="'+aContacs_list[key].contactCardId+'" class="contacts_text contacts_w_3">';
		Demo_list+='</p>';
		Demo_list+='<p class="contacts_w_0 fl edit_box">';
		Demo_list+='<img src="./../../img/edit.png" alt="" class="edit_btn_one">';
		Demo_list+='<img src="./../../img/delete.png" alt="" class="delete_btn_one">';
		Demo_list+='</p>';
		Demo_list+='</div>';
     }

     //填充联系人列表信息
     $(".contacts_list_demo").html(Demo_list);
     //设置联系人列表，每条为不可编辑状态；
     $(".contacts_list_demo .contacts_one").each(function(){
	    _this.set_isedit($(this),false);    	
     });
}

//插入某个客户的信息以及相关的联系人列表信息
customer_dialog.prototype.insert_data=function(oPar,data){
	var json_dt = {
					  "collection": {
					    "version": "1.0",
						"href": "http://IOLService/customers",
					    "links": [ ],
					    "items": [
						      {
						        "href": "/",
						        "data": [
								 	  {
							            "name": "customerId",
							            "value": "0001 "
							          },
							          {
							            "name": "customerCode",
							            "value": "0001 "
							          },
				    		          {
							            "name": "customerName",
							            "value": "北京航空航天"
							          },
									  {
							            "name": "customerPhone",
							            "value": "1343434345"
							          },
								  	  {
							            "name": "loadingType",
							            "value": "1"
							          },
							    	  {
							            "name": "customerAddress",
							            "value": "北京市北汽北郊加油站南口102"
							          },
									  {
							            "name": "source",
							            "value": "0"
							          },
							 		  {
							            "name": "totileSource ",
							            "value": "30-60%"
							          },
							          {
							          	"name": "contactList ",
										"value": [{
												"value": [{
													"contactName": "xiaoLi",
													"contactPhone": "110",
													"contactCardId": "001"
												}]

								          }]
								      }
								],
						        "links": [ ]
						      } 
					    ],
					    "queries": [
					      {
					        "rel": "search",
					        "href": "http://IOLService/customers",
					        "prompt": "1、条件查询",
					        "data": [
						          {
						            "name": " customerCode",
						            "value": ""
						          },{
						            "name": "customerName",
						            "value": ""
						          }, 
								  {
						            "name": "customerPhone",
						            "value": ""
						          },
						   		  {
						            "name": "contactName",
						            "value": ""
						          },
						          {
						            "name": " contactPhone ",
						            "value": ""
						          },
						  		  {
						            "name": "loadingType",
						            "value": ""
						          }
					         ]
					     }
					],
					"templates" : {
					   "data" : [
						  	{"name":" customerName ","value":"","prompt":"客户名称"},
							{"name":" customerPhone ","value":"","prompt":"客户联系电话"},
							{"name":"customerId","value":"","prompt":"客户编码：唯一标识"},
							{"name":"customerAddress","value":"","prompt":"客户地址"},
							{
							  	"name":"$contactList ",
							  	"value":[
							  				{
									            "name": "contactName",
									            "value": "",
									            "prompt":"联系人姓名"
									        },
											{
									            "name": " contactPhone ",
									            "value": "",
									            "prompt":"联系人电话"
									        },
									        {
												"name": " contactCardId ",
											    "value": "",
												"prompt":"联系人身份证号码"
											}
										],
								"prompt":"联系人集合"
							}
						]
					},
				    "error": {
				      "code": "",
				      "message": ""
				    }
		    }
	};
	console.log(cj.Parse(json_dt));
    
	//$(oPar).find("input").eq(0).val(data.name);   //姓名
	//$(oPar).find("input").eq(1).val(data.tel);    //电话
	//$(oPar).find("input").eq(2).val(data.id);     //身份证号
}



//页面主效果--------------------------------------------------------------------------------------------------------

var customerLis = "";
var customer = {
    bindEvent:function () {
        var flag = true;
        var selectFlag = true;

		//初始化新增（编辑）客户
		var dialog_customer = new customer_dialog();

	    //初始化文件上传
		var dialog_upload = new dialog_upload_file();

	    //初始化批量导入信息
	    var file_infolist = new dialog_add_list();

		//点击新增按钮，展示新增弹框
		$("#add_one_btn").click(function(){
    		dialog_customer.iseditor = false;             //设置为编辑状态
			dialog_customer.show_dialog("add");
		});
		//点击编辑按钮，展示编辑弹框
		$("#edit_one_btn").click(function(){
			dialog_customer.show_dialog("edit",function(){
				dialog_customer.insert_edit_dialog();
			});
		});
		
		//点击批量导入按钮，展示批量导入弹框
		$("#add_list_btn").click(function(){
			dialog_customer.hide_dialog();
			file_infolist.hide_dialog();
			dialog_upload.show_dialog();
		});
		//点击批量导入文件信息
		$("#add_infolist_btn").click(function(){
			dialog_customer.hide_dialog();
			dialog_upload.hide_dialog();
			file_infolist.show_dialog();
		});

        //高级搜索
        $("#advSearch").on("click",function () {
            if(flag){
                $("#searchModal").show();
                $("#advBtn").html("收起");
                $("#advBtns").addClass("active");
                flag = false;
            }else{
                $("#searchModal").hide();
                $("#advBtn").html("高级搜索");
                $("#advBtns").removeClass("active");
                flag = true;
            }
        });
        //高级搜索查询
        $("#searchModbtn").on("click",function () {
            customer.advSearch();
        })
        //高级搜索清除
        $("#searchClear").on("click",function () {
            $("#searchModal input").val("");
        })
        //刷新
        $("#refresh").on("click",function () {
            customer.customerRequest();
        })
        $("#customerList").on("click","img,.switch1,.contacts-select",function(e){

	        //列表页点击编辑图标，打开编辑弹框，进行相关编辑操作；
        	if(e.target.tagName=="IMG" && $(e.target).parent().hasClass("edit")){

				//点击编辑，打开编辑弹框；

				//拼接数据
				var customerid = $(this).parents("tr").attr("customerid"),
					editData;
				for(var i = 0; i < customerLis.length; i++){
					if(customerLis[i].customerId == customerid){
	                    editData = customerLis[i];
					}
				}

				dialog_customer.edit_dt = editData;   //将当期要编辑的这套数据存储起来；
				//显示当前这条编辑框
				dialog_customer.show_dialog("edit",function(){
					dialog_customer.iseditor = true;             //设置为编辑状态
					dialog_customer.insert_edit_dialog();         //插入数据
				});

        	}

        	//点击删除图标，删除这一行数据
			if(e.target.tagName=="IMG" && $(e.target).parent().hasClass("img") && !$(e.target).parent().hasClass("edit")){
                 $(this).parents("tr").remove();
			}
			
            //启用（禁用）开关切换
            if($(e.target).hasClass("switch1")){
	            if($(this).hasClass("active")){
	                $(this).removeClass("active");
	                $(this).find(".switch2").removeClass("active");
	            }else{
	                $(this).addClass("active");
	                $(this).find(".switch2").addClass("active");
	            }	
            }
            //联系人电话下拉框
            if($(e.target).hasClass("contacts-select")){
            	if(selectFlag){
	                $(this).addClass("active");
	                if($(this).parent().hasClass("contacts")){
	                    $(this).siblings(".contacts-modal").show();
	                }else{
	                    $(this).parents(".contacts-modal").show();
	                }
	                selectFlag = false;
	            }else{
	                if($(this).parent().hasClass("contacts")){
	                    $(this).siblings(".contacts-modal").hide();
	                }else{
	                    $(this).parents(".contacts-modal").hide();
	                }
	                selectFlag = true;
	            } 
            }
        })
        $("#customerList").on("mouseleave",".contacts-modal",function () {
            selectFlag = true;
            $(this).hide();
        })
    },
    // 客户管理查询
    customerRequest:function (datas) {
        $.ajax({
            // url:"",
            // type:"get",
            // timeout:10000,
            // data:{
            //
            // },
            success:function (data) {
                var data = {
                    "collection": {
                        "version": "1.0",
                        "href": "http://IOLService/customers",
                        "links": [ ],
                        "items": [
                            {
                                "href": "/",
                                "data": [
                                    {
                                        "name": "customerId",
                                        "value": "0001 "
                                    },
                                    {
                                        "name": "customerCode",
                                        "value": "0001 "
                                    },
                                    {
                                        "name": "customerName",
                                        "value": "北京航空航天"
                                    },
                                    {
                                        "name": "customerPhone",
                                        "value": "1343434345"
                                    },
                                    {
                                        "name": "loadingType",
                                        "value": "1"
                                    },
                                    {
                                        "name": "customerAddress",
                                        "value": "北京市北汽北郊加油站南口102"
                                    },
                                    {
                                        "name": "source",
                                        "value": "0"
                                    },
                                    {
                                        "name": "totileSource",
                                        "value": "30-60%"
                                    },
                                    {
                                        "name": "contactList",
                                        "value": [{
                                            "value": [{
                                                "contactName": "李光",
                                                "contactPhone": "18411213455",
                                                "contactCardId": "001"
                                            },
                                                {
                                                    "contactName": "xiaoWu",
                                                    "contactPhone": "120",
                                                    "contactCardId": "002"
                                                }]

                                        }]
                                    }
                                ],
                                "links": [ ]
                            }
                        ],
                        "queries": [
                            {
                                "rel": "search",
                                "href": "http://IOLService/customers",
                                "prompt": "1、条件查询",
                                "data": [
                                    {
                                        "name": " customerCode",
                                        "value": ""
                                    },{
                                        "name": "customerName",
                                        "value": ""
                                    },
                                    {
                                        "name": "customerPhone",
                                        "value": ""
                                    },
                                    {
                                        "name": "contactName",
                                        "value": ""
                                    },
                                    {
                                        "name": " contactPhone ",
                                        "value": ""
                                    },
                                    {
                                        "name": "loadingType",
                                        "value": ""
                                    }
                                ]
                            }
                        ],
                        "templates" : {
                            "data" : [
                                {"name":" customerName ","value":"","prompt":"客户名称"},
                                {"name":" customerPhone ","value":"","prompt":"客户联系电话"},
                                {"name":"customerId","value":"","prompt":"客户编码：唯一标识"},
                                {"name":"customerAddress","value":"","prompt":"客户地址"},
                                {
                                    "name":"$contactList ",
                                    "value":[
                                        {
                                            "name": "contactName",
                                            "value": "",
                                            "prompt":"联系人姓名"
                                        },
                                        {
                                            "name": " contactPhone ",
                                            "value": "",
                                            "prompt":"联系人电话"
                                        },
                                        {
                                            "name": " contactCardId ",
                                            "value": "",
                                            "prompt":"联系人身份证号码"
                                        }
                                    ],
                                    "prompt":"联系人集合"
                                }
                            ]
                        },
                        "error": {
                            "code": "",
                            "message": ""
                        }
                    }
                };
                customerLis = cj.Parse(data);
                datas = cj.Parse(data);
                customer.customerReader(datas);
            },
            error:function (data) {

            }
        })
    },
    //高级搜索
    advSearch:function(){
        var inpFlag = 0;
        var inp =  $("#searchModal input");
        var searchData = [{
            customerCode:$("#customerCode").val().replace(/\s/g, ""),
            customerName:$("#customerName").val().replace(/\s/g, ""),
            customerPhone:$("#customerPhone").val().replace(/\s/g, ""),
            contactName:$("#contactName").val().replace(/\s/g, ""),
            contactPhone:$("#contactPhone").val().replace(/\s/g, ""),
            loadingType:$("#loadingType").val().replace(/\s/g, "")
        }];
        
        console.log(cj.parseCjArray(searchData))
        for(var i = 0; i <  inp.length;i++){
            if(inp.eq(i).val().replace(/\s/g, "")==""){
               inpFlag++;
            }
        }
        if(inpFlag == inp.length){
            info("请至少输入一个搜索条件",'温馨提示',function () {});
            // alert("请至少输入一个搜索条件")
        }else{
            $.ajax({
                // url:"",
                // type:"get",
                // timeout:10000,
                // data:searchData,
                success:function () {
                    
                },
                error:function () {
                	
                }
            })
        }
    },
    customerReader:function (datas) {
        var _html = '';
        var customerList = datas;
        for(var i= 0;i < customerList.length;i++){
            _html += '<tr customerId="'+customerList[i].customerId+'">'
                +'<td>'+(i+1)+'</td>'
                +'<td class="customer-num">'+customerList[i].customerCode+'</td>'
                +'<td  class="left" title="'+customerList[i].customerName+'">'+customerList[i].customerName+'</td>'
                +'<td>'+customerList[i].customerPhone+'</td>'
                +'<td>'
                +'<div class="contacts">'
                +'<p class="fl name">'+customerList[0].contactList[0].value[0].contactName+'</p>'
                +'<p class="fl">'+customerList[0].contactList[0].value[0].contactPhone+'</p>'
                +'<p class="fr contacts-select"></p>'
                +'<div class="cl"></div>'
                +'<div class="contacts-modal">'
                +'<div>'
                +'<p class="fl name">李敏</p>'
                +'<p class="fl">18611027266</p>'
                +'<p class="fr contacts-select"></p>'
                +'</div>'
                +'<div>'
                +'<p class="fl name">李敏</p>'
                +'<p class="fl">18611027266</p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</td>'
                +'<td>'+customer.loadingType(customerList[i].loadingType)+'</td>'
                +'<td  class="left" title="'+customerList[i].customerAddress+'">'+customerList[i].customerAddress+'</td>'
                +'<td>'+customer.source(customerList[i].source)+'</td>'
                +'<td>'+customerList[i].totileSource+'</td>'
                +'<td>'
                +'<div class="switch1">'
                +'<div class="switch2"></div>'
                +'</div>'
                +'</td>'
                +'<td>'
                +'<div class="fl img edit"><img src="./../../img/edit.png" alt=""></div>'
                +'<div class="fl img"><img src="./../../img/delete.png" alt=""></div>'
                +'</td>'
                +'</tr>';
        }
        $("tbody").html(_html);

        // $("#totalAll").text(data.totalSize+" 条");
        // var totalPage = data.totalPage;
        // var index = data.current;
        //分页
        // laypage({
        //     cont: 'page-right' //分页容器的id
        //     , pages: totalPage //总页数
        //     ,curr:index
        //     ,first:1
        //     ,last:totalPage
        //     , skin: '#1A9EFE' //自定义选中色值
        //     , skip: true //开启跳页
        //     , groups: 9  //连续分页数
        //     , jump: function (obj,first) {
        //         if(!first){
        //             customer.customerRequest(false,obj.curr);
        //         }
        //     }
        // });
    },

    // 装车费类型
    loadingType:function (type) {
        switch (type){
            case "1":
                return "常客";
            case "2":
                return "散户";
            case "3":
                return "无需缴纳";
        }
    },
    //来源
    source:function (type) {
        switch (type){
            case "0":
                return "ERP批量导入";
            case "1":
                return "手工新增";
        }
    }
}
//页面主效果结束----------------------------------------------------------------------------------------------------
