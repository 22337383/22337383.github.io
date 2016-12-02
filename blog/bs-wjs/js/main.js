$(function(){
	function res(){
		var nowScreen = $(window).width() < 768;
	// 遍历并根据屏幕宽度切换data值
	$('#adimg > .carousel-inner > .item ').each(function(index, el) {
		var imgSrc = nowScreen ? $(el).data('ad-xs') : $(el).data('ad-lg');
		// console.log(imgSrc)
	// 设置背景图片
	$(el).css('backgroundImage', 'url(' + imgSrc + ')');
	// 当为小屏幕时，插入img标签
	if (nowScreen) {
		$(el).html('<img src="'+imgSrc+'" alt="" />')
	}else {
		$(el).empty();
	}
	});
	}
	// 这里的res函数不加括号，只有resize的时候执行res函数
	$(window).on('resize',res).trigger('resize');
	$("[data-toggle='tooltip']").tooltip();

	// 手机端滑动导航
	var ulWidth = 0;
	$('.channel ul').children().each(function(i,e){
		ulWidth += e.clientWidth;
		// console.log(ulWidth)
	})
	if (ulWidth > $(window).width()) {
		$('.channel ul').css('width',ulWidth);
	}
	
	// 新闻列表标题控制
	$("#news .nav-pills a").on("click",function(){
		// 获取属性值需加引号
		var title = $(this).data("title");
		// console.log(title);
		$(".newstitle").text(title);
	})

	// 手机端轮播图控制
	var startX;
	var endX;
	var playDis = 60;
	//点击盒子时候的x坐标值
	$(".carousel").on("touchstart",function(e){
		startX = e.originalEvent.touches[0].clientX;
		// console.log(e.originalEvent.touches[0].clientX);
	})
	// 移动手指后x的坐标值
	$(".carousel").on("touchmove",function(e){
		endX = e.originalEvent.touches[0].clientX;
		// console.log(endX);
	})
	//手指离开屏幕图片控制
	$(".carousel").on("touchend",function(e){
		// 判断左右
		playNow = Math.abs(startX - endX);
		console.log(playNow);
		if (playNow > playDis) {
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	})
})