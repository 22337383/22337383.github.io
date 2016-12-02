// 获取元素
window.onload = function(){
function $(id) {return document.getElementById(id);}
var w_slider = $("w_slider");// 大盒子
var slider = $("slider");// 图片组父亲
var slider_main = $("slider_main");// 图片组
var imgs = slider_main.children;// 所有滚动图片
var slider_ctrl = $("slider_ctrl");// 所有控制按钮

// 操作元素
for (var i = 0; i < imgs.length; i++) {
	var span = document.createElement("span");
	var lastSpan = slider_ctrl.children[1];// 获取到的是slider-ctrl-next
	span.innerHTML = imgs.length - i;
	span.className = "slider-ctrl-con";
	slider_ctrl.insertBefore(span,lastSpan);
}

var spans = slider_ctrl.children;
spans[1].className = "slider-ctrl-con current";// 高亮第一个控制按钮
var scrollWidth = w_slider.clientWidth;// 获得大盒子宽度
for (var i = 1; i < imgs.length; i++) {
	imgs[i].style.left = scrollWidth + "px";// 除了第一张图片，其他的都定位到右边准备运动
}

// 遍历所有控制器
var key = 0;// 控制播放第几张
for(var k in spans){
	spans[k].onclick = function(){
		if (this.className == "slider-ctrl-prev") {
			animate(imgs[key],{left: scrollWidth});
			key--;
			key < 0 ? key = imgs.length - 1 : key;
			// 重点：点击上一张图片时先迅速回到左边再执行动画
			imgs[key].style.left = -scrollWidth + "px";
			animate(imgs[key],{left:0});

			setSpan();
		}else if (this.className == "slider-ctrl-next") {
			animate(imgs[key],{left: -scrollWidth});
			key++;
			key > imgs.length - 1 ? key = 0 : key;
			// 重点：点击下一张图片时先迅速回到右边再执行动画
			imgs[key].style.left = scrollWidth + "px";
			animate(imgs[key],{left:0});

			setSpan();
		}else {
			// 核心难点1：判断
			var that = this.innerHTML - 1;// 获取控制器的索引号
			if (that > key) {
				animate(imgs[key],{left: -scrollWidth});
				imgs[that].style.left = scrollWidth + "px";
			}else if (that < key) {
				animate(imgs[key],{left: scrollWidth});
				imgs[that].style.left = -scrollWidth + "px";
			}
			key = that;
			animate(imgs[key],{left:0});
			
			setSpan();
		}
	}
}

// 高亮控制器按钮
function setSpan(){
	// 我们只要1--6的span，0和7是左箭头和右箭头
for (var i = 1; i < spans.length - 1; i++) {
	spans[i].className = "slider-ctrl-con";
}
	// 索引号一定加1，因为索引号0是左箭头
	spans[key + 1].className = "slider-ctrl-con current";
}

// 定时器设置，循环执行向右
var timer = null;
timer = setInterval(autoPlay,1000);
function autoPlay(){
	animate(imgs[key],{left: -scrollWidth});
	key++;
	key > imgs.length - 1 ? key = 0 : key;
	imgs[key].style.left = scrollWidth + "px";
	animate(imgs[key],{left:0});

	setSpan();
}

// 清除定时器
w_slider.onmouseover = function(){
	clearInterval(timer);
}
w_slider.onmouseout = function(){
	clearInterval(timer);// 开启定时器先清除定时器
	timer = setInterval(autoPlay,1000);
}
}