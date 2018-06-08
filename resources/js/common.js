var common_frame = {
	search_init:function(){

    }
}


var commons = {
    //时间格式化
    // timeFormat: function (time) {
    //     return time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2);
    // },
    timeFormat: function (time) {
        return time.substr(0,10);
    },
	// 去除空格
    deleteSpace:function (para) {
        return para.val().replace(/\s/g, "")
    }
}


//搜索模块---------------------------------------------------------------------------------------------

function search_model(data){
    var dt = data || {};
    this.posi_box = dt.posi_box || null;              //下拉菜单参考的其它demo位置;（必传）
    this.left = dt.left || null;                      //下拉菜单的距离左边的距离；（可选）
    this.top = dt.top || null;                        //下拉菜单距离顶端的距离；（可选）

    this.Input = dt.oInput || null;                   //表单输入框;  （必传）
    this.Search_btn = dt.oSearch_btn || null;         //搜索按钮;（若是模糊搜索，必传）
    this.list_box = dt.oList_box || null;             //下拉菜单;（必传）
    this.one_demo = dt.demo || "*";                  //下拉列表每一项的demo标签;（必传）
    this.demo_attr = dt.demo_attr || "index";         //设置下拉列表每一项的demo标签上的相对应的属性key（若非模糊搜索，必传）
    this.url = dt.url || null;                        //模糊搜索请求的url;（若是模糊搜索，必传）
    this.key = dt.key || "value";                     //模糊搜索，请求后端需要的字段,默认为value; （必传）
    this.type = dt.type || "GET";                     //请求方式，默认为GET;（若个性化，必传）
    


    this.class_act = dt.class_act || "active";        //每一项鼠标滑过的样式class名
    
   // this.bindEvent();                                 //事件初始化;
}

//绑定事件
search_model.prototype.bindEvent=function(){

        var _this = this;

        //设置下拉菜单的位置
        this.set_position();

      
      if($(this.Input).attr("type")=="text"){
         //若是表单，那么进行表单监听
         $(this.Input).on("change",function(){
            _this.get_search_list();
         });    
         $(this.Input).on("blur",function(){
            _this.hide_search_list();
         })     
      }else{
        //点击按钮，展示下拉菜单
        $(this.Input).on("click",function(){
            _this.show_search_list();
        });
      }
    //绑定鼠标滑入滑出事件
    var aList = $(this.list_box).find(this.one_demo);
    this.bind_hover(aList); 


     //下拉列表每一项点击
     $(this.list_box).on("click",this.one_demo,function(){
        
        if($(_this.Input).attr("type")=="text"){
            $(_this.Input).val($(this).text());                           //存储value值
        }else{
            $(_this.Input).html($(this).text());            
        }
        if($(this).attr(_this.demo_attr)){
            $(_this.Input).attr("index",$(this).attr(_this.demo_attr));       //存储某一项对应的id值            
        }
        _this.hide_search_list();           //隐藏下拉菜单
     });

     //点击搜索按钮，进行刷新数据
     if(this.Search_btn){
         $(this.Search_btn).on("click",function(){
            _this.refresh_page_list();
         });        
     } 
}

//根据搜索条件刷新页面列表数据
search_model.prototype.refresh_page_list=function(){

}

//显示搜索列表
search_model.prototype.show_search_list=function(){
    $(this.list_box).show();
}
//隐藏搜索列表
search_model.prototype.hide_search_list=function(){
    this.clear_show_list();    //清空搜索列表数据
    $(this.list_box).hide();    
}

//下拉菜单位置设置
search_model.prototype.set_position=function(){
    
    var left = $(this.posi_box).position().left,
        top = $(this.posi_box).position().top+$(this.posi_box).height()+2;

    if(this.left && this.top){
        left = this.left;
        top = this.top;
    }
    $(this.list_box).css({
        "position":"absolute",
        "left":left+"px",
        "top":top+"px",
        "width":$(this.posi_box).width()+"px"
    });    
}

//请求搜索列表数据
search_model.prototype.get_search_list=function(){
    var _this = this,
        sValue = $(this.Input).val();
    if(this.url){
        $.ajax({
           type:this.type,
           url:this.url,
           data:this.key+"="+sValue,
           success: function(dt){
                console.log(dt);
                _this.insert_search_list(dt);
           }
        });
    }
}

//搜索列表数据填充
search_model.prototype.insert_search_list=function(dt){
    this.search_dt(dt);   //下拉菜单数据填充
     //为下拉列表添加滑入滑出事件
     var aList = $(this.list_box).find(this.one_demo);
     if(aList.length>0){
         this.bind_hover();                //为下拉列表绑定鼠标滑入滑出效果
         this.show_search_list();          //展示下拉菜单
     }else{
         this.hide_search_list();    //隐藏下拉菜单
     }
}


//下拉菜单数据填充
search_model.prototype.search_dt = function(dt){
}

//搜索列表，绑定鼠标滑入滑出事件
search_model.prototype.bind_hover=function(aList){
    var _this = this;
    aList.hover(function(){
        $(_this.list_box).find(_this.one_demo).removeClass(_this.class_act);   //删除鼠标滑过的效果
        $(this).addClass(_this.class_act);
     },function(){
        $(this).removeClass(_this.class_act);
     });
}
//清空搜索列表数据
search_model.prototype.clear_show_list=function(){
    $(this.list_box).find(this.one_demo).remove();
}
