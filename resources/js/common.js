var common_frame = {
	//继承方法封装；par是父类，child是子类；
	extend:function(par,child){
		var obj = Object.create(par.prototype);
		obj.constructor = child;
		child.prototype = obj.prototype;
	}
}

