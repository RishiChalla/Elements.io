var Camera;

(function() {
	Camera = function() {
		this.translate = new Point(0, 0);
		this.scale = 1;
	};

	Camera.prototype.follow = function(object) {
		this.translate.x = canvas.width / 2 - object.pos.x;
		this.translate.y = canvas.height / 2 - object.pos.y;
	};

	Camera.prototype.update = function() {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.reset();
	};

	Camera.prototype.fixed = function(callback) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		callback();
		this.reset();
	};

	Camera.prototype.reset = function() {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(this.translate.x, this.translate.y);
	};
}());