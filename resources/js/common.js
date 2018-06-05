var common_frame = {
	//继承方法封装；par是父类，child是子类；
	extend:function(par,child){
		var obj = Object.create(par.prototype);
		obj.constructor = child;
		child.prototype = obj.prototype;
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
