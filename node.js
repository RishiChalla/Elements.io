var Node;
var CircleNode;

(function() {
	Node = function(pos, size) {
		this.pos = new Point(pos.x, pos.y);
		this.size = size;
	};

	Node.prototype.containsNode = function(node) {
		
	};

	Node.prototype.containsCircleNode = function(circleNode) {

	};

	Node.prototype.containsPoint = function(point) {
		return this.pos.x <= point.x && point.x <= this.pos.x + this.size.width && this.pos.y <= point.y && point.y <= this.pos.y + this.size.height;
	};

	Node.prototype.clientNode = function(screenSize) {
		return new Node(this.pos.clientPoint(screenSize), this.size.clientSize());
	};
}());

(function() {
	CircleNode = function(pos, radius) {
		this.pos = new Point(pos.x, pos.y);
		this.radius = radius;
	};

	CircleNode.prototype.containsNode = function(node) {

	};

	CircleNode.prototype.containsCircleNode = function(node) {
		var p1 = this.pos;
		var p2 = node.pos;
		var r1 = this.radius;
		var r2 = node.radius;
		var p1x = p1.x;
		var p1y = p1.y;
		var p2x = p2.x;
		var p2y = p2.y;
		var a;
		var x;
		var y;

		a = r1 + r2;
		x = p1x - p2x;
		y = p1y - p2y;

		if (a > Math.sqrt((x * x) + (y * y))) {
			return true;
		}
		else {
			return false;
		}
	};

	CircleNode.prototype.containsPoint = function(point) {
		var x = point.x;
		var y = point.y;
		var cx = this.pos.x;
		var cy = this.pos.y;
		var radius = this.radius;
		var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  		return distancesquared <= radius * radius;
	};

	CircleNode.prototype.clientNode = function(screenSize) {
		return new CircleNode(this.pos.clientPoint(screenSize), (this.radius * screenSize * 5) / boundries.maxX);
	}
}());

module.exports = {
	"node": Node,
	"circleNode": CircleNode
};