var Grid;

(function() {
	Grid = function(size, pos) {
		this.pos = Object.assign({}, pos);
		this.width = size.width;
		this.height = size.height;
	};

	Grid.prototype.update = function() {
		this.draw();
	};

	Grid.prototype.draw = function() {
		var w = this.width;
		var h = this.height;
		var step = canvas.width / 50;
		ctx.beginPath(); 
		ctx.lineWidth = 1;
		for (var x = this.pos.x; x <= w; x += step) {
			ctx.moveTo(x, this.pos.x);
			ctx.lineTo(x, h);
		}
		ctx.strokeStyle = "#cccccc";
		ctx.stroke(); 
		ctx.beginPath(); 
		for (var y = this.pos.y; y <= h; y += step) {
			ctx.moveTo(this.pos.y, y);
			ctx.lineTo(w, y);
		}
		ctx.strokeStyle = "#cccccc";
		ctx.lineWidth = 2;
		ctx.stroke();
	};
}());