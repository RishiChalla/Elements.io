var Element;

(function() {
	Element = function(pos, element, lvl, points, boundries) {
		this.pos = Object.assign({}, pos);
		this.circleNode = new CircleNode(this.pos, Math.sqrt(this.points * 15 / Math.PI) + 50);
		this.lvl = lvl;
		this.points = points;
		this.username = "";
		if (lvl < 15) {
			this.element = "basic";
		}
		else {
			this.element = element;
		}
		this.boundries = boundries;
	};

	Element.prototype.draw = function() {
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

		if (this.username != "") {
			ctx.font = "50px Comic Sans MS";
			ctx.strokeStyle = "#333333";
			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			ctx.lineWidth = 3;
			ctx.fillText(this.username, this.pos.x, this.pos.y);
			ctx.strokeText(this.username, this.pos.x, this.pos.y);
		}
	};

	Element.prototype.update = function() {
		this.draw();
	};

	Element.prototype.moveTo = function(point) {
		var dx = point.x - canvas.width / 2;
		var dy = point.y - canvas.height / 2;
		var angle = Math.atan2(dy, dx);
		var vx = Math.cos(angle) * this.speed;
		var vy = Math.sin(angle) * this.speed;
		this.pos.x += vx;
		this.pos.y += vy;
	}
}());