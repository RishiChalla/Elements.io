var Food;

(function() {
	Food = function(pos, element) {
		this.pos = pos;
		this.element = element;
		this.circleNode = new CircleNode(this.pos, 20);
	};

	Food.prototype.draw = function() {
		var self = this;
		if (this.element == "basic") {
			this.circleNode.draw(function() {
				ctx.fillStyle = "white";
				ctx.fill();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 10;
				ctx.stroke();
			});
		}
		if (this.element == "steel") {
			this.circleNode.draw(function() {
				ctx.fillStyle = "#cccccc";
				ctx.fill();
				ctx.strokeStyle = "gray";
				ctx.lineWidth = 10;
				ctx.stroke();
			});
		}
		if (this.element == "fire") {
			this.circleNode.draw(function() {
				ctx.fillStyle = "orange";
				ctx.fill();
				ctx.strokeStyle = "red";
				ctx.lineWidth = 10;
				ctx.stroke();
			});
		}
		if (this.element == "water") {
			this.circleNode.draw(function() {
				ctx.fillStyle = "#9999ff";
				ctx.fill();
				ctx.strokeStyle = "blue";
				ctx.lineWidth = 10;
				ctx.stroke();
			});
		}
		if (this.element == "ice") {
			this.circleNode.draw(function() {
				ctx.fillStyle = "lightblue";
				ctx.fill();
				ctx.strokeStyle = "#4fabc9";
				ctx.lineWidth = 10;
				ctx.stroke();
			});
		}
		if (this.element == "lightning") {
			this.circleNode.draw(function() {
				ctx.fillStyle = "#ffffcc";
				ctx.fill();
				ctx.strokeStyle = "yellow";
				ctx.lineWidth = 10;
				ctx.stroke();
			});
		}
	};

	Food.prototype.update = function() {
		this.draw();
	};
}());