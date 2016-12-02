window.onload = function(){
	search();
	sKill();
	scrollPic();
}
// 搜索框透明效果
var search = function(){
	//获取到搜索框和轮播图
	var search = document.getElementsByClassName('jd_header_box')[0];
	var banner = document.getElementsByClassName('jd_banner')[0];
	var height = banner.offsetHeight;
	// 滚动事件
	window.onscroll = function(){
		// 文档被卷曲的高度
		var top = document.body.scrollTop;
		//轮播图的高度
		
		if (top > height) {
			search.style.background = 'rgba(255, 0, 0, 1.0)';
		}else {
			var color = top / height * 0.85;
			// console.log(color)
			search.style.background = 'rgba(255, 0, 0, '+color+')';
		}
	}
}
// 秒杀倒计时
var sKill = function(){
	// 一定要指定下标
	var sk_time = document.getElementsByClassName('sk_time')[0];
	// var spans = sk_time.getElementsByTagName("span");
	var spans = sk_time.getElementsByClassName("time");
	// console.log(spans.length)

	var times = 16 * 60 * 60;
	var timer = null;
	timer = setInterval(function(){
		times--;
		var h = Math.floor(times / 3600);
		var m = Math.floor(times / 60 % 60);
		var s = times % 60;
		// console.log(h + '-'+m+'-'+s);

		spans[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
		spans[1].innerHTML = h % 10;

		spans[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
		spans[3].innerHTML = m % 10;

		spans[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
		spans[5].innerHTML = s % 10;
	}, 1000);
	if (times <= 0) {
		clearInterval(timer);
	}
}

// 轮播图
var scrollPic = function(){

	var banner = document.getElementsByClassName('jd_banner')[0];
	var width = banner.offsetWidth;
	//获取图片
	var picBox = banner.getElementsByTagName('ul')[0];

	// console.log(picLis);
	// 获取小点
	var pointBox = banner.getElementsByTagName('ul')[1];
	var pointLis = pointBox.getElementsByTagName('li');
	// console.log(pointLis)

	//轮播核心代码
	

	//增加和移除过渡
	var addTransition = function(){
		picBox.style.transition = 'transform .3s ease 0s';
		// picBox.style.webkitTransition = 'transform .3s ease 0s';
	}
	var removeTransition = function(){
		picBox.style.transition = 'none';
	}
	// 设置图片左右移动
	var setTransform = function(t){
		picBox.style.transform = 'translateX('+t+'px)';
	}
	var index = 1;
	var timer;
	timer = setInterval(function(){
		index ++;
		addTransition();
		setTransform(-index * width);

	},1000)
	//过渡完成执行的事件
	picBox.addEventListener('transitionend', function(){

		// pointLis[index-2].className = 'active';
		
		if (index >= 9) {
			index = 1;
		}else if (index <= 0) {
			index = 8;
		}
		removeTransition();
		setTransform(-index * width);
	},false);

	
 }