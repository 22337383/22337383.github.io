// 核心部分
    function animate(obj,json,fn){
 		clearInterval(obj.timer);
 		obj.timer = setInterval(function(){
 			var flag = true; // 通过判断停止定时器
 			var current = 0;
 			for(var k in json){
 				if (k == "opacity") {
 					// opacity的默认值是1
 					current = parseInt(getStyle(obj,k)*100);
 				}else{
 					current = parseInt(getStyle(obj,k));
 				}

 				var step = (json[k] - current) / 10;// 步长计算
 				
 				step = step > 0 ? Math.ceil(step) : Math.floor(step);// 步长取整，解决除不断情况
 				// 判断json中存在opacity
				if (k == "opacity") {
					// 判断浏览器支持opacity
					if ("opacity" in obj.style) {
						obj.style.opacity = (current + step) / 100;
						console.log(obj.style.opacity)
					}else {
						// ie 6 7 8
						obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";
					}
					
				}else if(k == "zIndex"){
                    obj.style.zIndex = json[k];
                }
				else {
					obj.style[k] = step + current + "px";
				}

 				// 有一个没有到达到达目的地，就要继续执行
 				if (current != json[k]) {
 					// return false;//一个一个执行变化
 					flag =  false;// 同时执行
 				}
 			}
 			if (flag) {
 			clearInterval(obj.timer);
	 		if (fn) {
	 			fn();
	 		}
 		}
 		},30)
 	}
 	
		// 获得当前样式函数
		function getStyle(obj,attr){
			// ie + opera
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			}else {// w3c官方
				return window.getComputedStyle(obj,null)[attr];
			}
		}