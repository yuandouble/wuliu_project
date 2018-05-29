var common_frame = {
	//继承方法封装；par是父类，child是子类；
	extend:function(par,child){
		var obj = Object.create(par.prototype);
		obj.constructor = child;
		child.prototype = obj.prototype;
	}
}

//时间格式化
var commons = {
    timeFormat: function (time) {
        return time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2);
    }
}
