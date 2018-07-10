## 预览
[预览]( https://wangrx-jerry.github.io/resize-img/index.html)
## 这是一个图片拖动和缩放demo
> 需求：
- 图片支持在指定范围内拖动（在一个容器中拖动）
- 图片可以适当的放大缩小（最宽=容器宽度，最高=容器高度）
> 实现思路：
- 页面布局：容器：container，拖动的对象：box，缩放的触发点：coor
- 拖动：在box上按下鼠标被拖动对象随着鼠标移动而移动，鼠标放开则停止移动
- 缩放：在coor上按下鼠标，box高宽随着鼠标位置变化，鼠标放开则停止变化
> 技术构思：
- container或者document上增加mousemove事件，记录鼠标位置
- box和coor上增加mousedown事件，用于鼠标按下触发对应事件
- document增加鼠标up事件，如果鼠标放开，则box和coor上的事件恢复初始状态，不再执行
- 一个参数（比如：move），用于控制状态
> 细节：
- 准备工作：获取对应元素,阻止img拖动
```js
document.getElementsByTagName('img')[0].onmousedown = function (e) {
	e.preventDefault()
}; 

var container = document.getElementById('container');
var box = document.getElementById('box');
var coor = document.getElementById('coor');
```
- box（被拖动对象）增加mousedown事件：
```js
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
```
- coor(控制缩放)增加mousedown
```js
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
```
- document，mousedown/mouseup事件
```js
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
```




