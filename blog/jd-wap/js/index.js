window.onload = function(){
	search();
	sKill();
	scrollPic();
}
// ������͸��Ч��
var search = function(){
	//��ȡ����������ֲ�ͼ
	var search = document.getElementsByClassName('jd_header_box')[0];
	var banner = document.getElementsByClassName('jd_banner')[0];
	var height = banner.offsetHeight;
	// �����¼�
	window.onscroll = function(){
		// �ĵ��������ĸ߶�
		var top = document.body.scrollTop;
		//�ֲ�ͼ�ĸ߶�
		
		if (top > height) {
			search.style.background = 'rgba(255, 0, 0, 1.0)';
		}else {
			var color = top / height * 0.85;
			// console.log(color)
			search.style.background = 'rgba(255, 0, 0, '+color+')';
		}
	}
}
// ��ɱ����ʱ
var sKill = function(){
	// һ��Ҫָ���±�
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

// �ֲ�ͼ
var scrollPic = function(){

	var banner = document.getElementsByClassName('jd_banner')[0];
	var width = banner.offsetWidth;
	//��ȡͼƬ
	var picBox = banner.getElementsByTagName('ul')[0];

	// console.log(picLis);
	// ��ȡС��
	var pointBox = banner.getElementsByTagName('ul')[1];
	var pointLis = pointBox.getElementsByTagName('li');
	// console.log(pointLis)

	//�ֲ����Ĵ���
	

	//���Ӻ��Ƴ�����
	var addTransition = function(){
		picBox.style.transition = 'transform .3s ease 0s';
		// picBox.style.webkitTransition = 'transform .3s ease 0s';
	}
	var removeTransition = function(){
		picBox.style.transition = 'none';
	}
	// ����ͼƬ�����ƶ�
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
	//�������ִ�е��¼�
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