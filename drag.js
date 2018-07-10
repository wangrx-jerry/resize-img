window.onload = function () {
	document.getElementsByTagName('img')[0].onmousedown = function (e) {
		e.preventDefault()
	}; 

	var container = document.getElementById('container');
	var box = document.getElementById('box');
	var coor = document.getElementById('coor');

	document.addEventListener('mousemove', function(event){
		if (!!this.move) {
			var callback = document.call_size || document.call_position 
			callback();
		}
	})
	document.addEventListener('mouseup', function (e) { //鼠标停止点击将所有的状态置为初始状态
		if (!!this.move) {
			judgeState();
			document = Object.assign(this, {
				'move': false,
				'call_size': false,
			});
		}
	});

	function judgeState(state) { // 判断是否在容器范围内/或者超出容器
		var dragBox = {
			w: box.offsetWidth,
			h: box.offsetHeight,
			left : box.offsetLeft,
			top : box.offsetTop
		}
		if (!(dragBox.left >= 0 && dragBox.top >= 0 && dragBox.left + dragBox.w < container.offsetWidth && dragBox.top + dragBox.h < container.offsetHeight)) {
			box.style.top = 0 + 'px';
			box.style.left = 0 + 'px';
		}
		if (dragBox.w > container.offsetWidth) {
			box.style.width = container.offsetWidth + 'px'; 
		}
		if (dragBox.h > container.offsetHeight) {
			box.style.height = container.offsetHeight + 'px'; 
		}
	}

	box.addEventListener('mousedown', function(event){
		var event = event || window.event,
			x = event.pageX - this.offsetLeft - container.offsetLeft, //pageX和clientX：都是相对浏览器左上角的点为参照点，但是pagex不会随页面滚动改变参考值（document左上角），clientx：可视区左上角
			y = event.pageY - this.offsetTop - container.offsetTop,
			dragBox = {
				w: box.offsetWidth,
				h: box.offsetHeight,
				left: box.offsetLeft,
				top: box.offsetTop
			};
			this.posix = {x, y};
			document = Object.assign(document, {
				move: true,
				move_target: this,
				call_position: function (event) {
					event = event || window.event;
					if (dragBox.left >= 0 && dragBox.top >= 0 && dragBox.left + dragBox.w < container.offsetWidth && dragBox.top + dragBox.h < container.offsetHeight) {
						var top = event.pageY - container.offsetTop - y;
						var left = event.pageX - container.offsetLeft - x;
						box.style.top = top + 'px';
						box.style.left = left + 'px';
					}
				}
			})
	})

	coor.addEventListener('mousedown', function(event){
		var event = event || window.event,
			posix = {
				w: box.offsetWidth,
				h: box.offsetHeight,
				x: event.pageX,
				y: event.pageY
			};
		document = Object.assign(document, {
			move: true,
			call_size: function (event) {
				event = event || window.event;
				if (posix.w <= container.offsetWidth) {
					box.style.width = event.pageX - box.offsetLeft - container.offsetLeft + 'px';
				}
				if (posix.h <= container.offsetHeight) {
					box.style.height = event.pageY - box.offsetTop - container.offsetTop + 'px';
				}
			}
		}) 
	})
}