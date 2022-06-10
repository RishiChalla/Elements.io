var Point;
var Box;
var Boundries;

(function() {
	Point = function(x, y) {
		this.x = x;
		this.y = y;
	};

	Point.prototype.clientPoint = function(screenSize) {
		return new Point((this.x * screenSize * 5) / boundries.maxX, (this.y * screenSize * 5) / boundries.maxX);
	};
}());

(function() {
	Box = function(width, height) {
		this.width = width;
		this.height = height;
	};

	Box.prototype.clientSize = function(screenSize) {
		return new Box((this.width * screenSize * 5) / boundries.maxX, (this.height * screenSize * 5) / boundries.maxX);
	};
}());

(function() {
	Boundries = function(minX, maxX, minY, maxY) {
		this.minX = minX;
		this.maxX = maxX;
		this.minY = minY;
		this.maxY = maxY;
	};

	Boundries.prototype.clientBoundries = function(screenSize) {
		return new Boundries((this.minX * screenSize * 5) / boundries.maxX, (this.maxX * screenSize * 5) / boundries.maxX, (this.minY * screenSize * 5) / boundries.maxX, (this.maxY * screenSize * 5) / boundries.maxX);
	};
}());

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
	"point": Point,
	"box": Box,
	"boundries": Boundries,
	"randomNumber": randomNumber
};