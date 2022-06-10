var Food;

(function() {
	Food = function() {
		this.element = randomNumber(1, 6);
		if (this.element == 1) {
			this.element = "basic";
		}
		if (this.element == 2) {
			this.element = "fire";
		}
		if (this.element == 3) {
			this.element = "water";
		}
		if (this.element == 4) {
			this.element = "steel";
		}
		if (this.element == 5) {
			this.element = "ice";
		}
		if (this.element == 6) {
			this.element = "lightning";
		}
		this.pos = new Point(randomNumber(boundries.minX, boundries.maxX), randomNumber(boundries.minY, boundries.maxY));
		this.circleNode = new CircleNode(this.pos, 20);
	};

	Food.prototype.clientFood = function(screenSize) {
		return {
			"element": this.element,
			"pos": this.pos.clientPoint(screenSize),
			"circleNode": this.circleNode.clientNode(screenSize)
		};
	};
}());

module.exports = {
	"food": Food
};
