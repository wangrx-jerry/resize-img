window.onload = function () {
	document.getElementsByTagName('img')[0].onmousedown = function (e) {
		e.preventDefault()
	}; 

	var container = document.getElementById('container');
	var box = document.getElementById('box');
	var coor = document.getElementById('coor');

	document.addEventListener('mousemove', function(event){
		if (!!this.move) {
			var posix = !document.move_target ? {
				'x': 0,
				'y': 0
			} : document.move_target.posix;
			var callback = document.call_size || function () { //点击box部分移动鼠标执行匿名函数，点击右下角再移动鼠标执行call_size 函数
				var dragBox = {
					w: box.offsetWidth,
					h: box.offsetHeight,
					left: box.offsetLeft,
					top: box.offsetTop
				},
				event = event || window.event;
				if (dragBox.left >= 0 && dragBox.top >= 0 && dragBox.left + dragBox.w < container.offsetWidth && dragBox.top + dragBox.h < container.offsetHeight) {
					var top = event.pageY - container.offsetTop - posix.y;
					var left = event.pageX - container.offsetLeft - posix.x;
					box.style.top = top + 'px';
					box.style.left = left + 'px';
					console.log(box.style.top, box.style.left);
				}
			};
			callback.call(this, event, posix);
		}
	})
	document.addEventListener('mouseup', function (e) { //鼠标停止点击将所有的状态置为初始状态
		if (!!this.move) {
			judgeState();
			var callback = document.call_up || function () { };
			callback.call(this, e);
			document = Object.assign(this, {
				'move': false,
				'move_target': null,
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
			x = event.clientX - this.offsetLeft - container.offsetLeft, //pageX和clientX值相同，但是存在ie兼容性问题
			y = event.clientY - this.offsetTop - container.offsetTop;
			this.posix = {x, y};
			document = Object.assign(document, {move: true, move_target: this})
	})

	coor.addEventListener('mousedown', function(event){
		var event = event || window.event,
			posix = {
				w: box.offsetWidth,
				h: box.offsetHeight,
				x: event.clientX,
				y: event.clientY
			};
		document = Object.assign(document, {
			move: true,
			call_size: function (event) {
				var event = event || window.event;
				if (posix.w <= container.offsetWidth) {
					box.style.width = event.pageX - box.offsetLeft - container.offsetLeft + 'px';
				}
				if (posix.h <= container.offsetHeight) {
					box.style.height = event.pageY - box.offsetTop - container.offsetTop + 'px';
				}
				console.log(box.style.width, box.style.height);
			}
		}) 
	})
}