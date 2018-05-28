(function () {
    $(document).ready(function () {
        customer.bindEvent();
        // customer.customerRequest();
    })
})()

var customer = {
    bindEvent:function () {
        var flag = true;
        var selectFlag = true;

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
        // 启用禁用开关
        $("#customerList").on("click",".switch1",function () {
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                $(this).find(".switch2").removeClass("active");
            }else{
                $(this).addClass("active");
                $(this).find(".switch2").addClass("active");
            }
        })
        // 联系人电话下拉框
        $("#customerList").on("click",".contacts-select",function () {
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
            _html = '<tr>'
                +'<td>'+(i+1)+'</td>'
                +'<td class="customer-num">'+customerList[i].customerCode+'</td>'
                +'<td  class="left">'+customerList[i].customerName+'</td>'
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
                +'<td  class="left">'+customerList[i].customerAddress+'</td>'
                +'<td>'+customer.source(customerList[i].source)+'</td>'
                +'<td>'+customerList[i].totileSource+'</td>'
                +'<td>'
                +'<div class="switch1">'
                +'<div class="switch2"></div>'
                +'</div>'
                +'</td>'
                +'<td>'
                +'<div class="fl img edit"><img src="../../resources/img/edit.png" alt=""></div>'
                +'<div class="fl img"><img src="../../resources/img/delete.png" alt=""></div>'
                +'</td>'
                +'</tr>';
        }
        $("tbody").html(_html);

        // $("#totalAll").text(data.totalSize+" 条");
        // var totalPage = data.totalPage;
        // var index = data.current;
        //分页
        laypage({
            cont: 'page-right' //分页容器的id
            , pages: totalPage //总页数
            ,curr:index
            ,first:1
            ,last:totalPage
            , skin: '#1A9EFE' //自定义选中色值
            , skip: true //开启跳页
            , groups: 9  //连续分页数
            , jump: function (obj,first) {
                if(!first){
                    customer.customerRequest(false,obj.curr);
                }
            }
        });
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