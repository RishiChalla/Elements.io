function randomNumber(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Box(width, height) {
	this.width = width;
	this.height = height;
}

CanvasRenderingContext2D.prototype.lineToPoint = function(point) {
	this.lineTo(point.x, point.y);
};

CanvasRenderingContext2D.prototype.moveToPoint = function(point) {
	this.moveTl(point.x, point.y);
};

CanvasRenderingContext2D.prototype.createRect = function(point, size) {
	this.rect(point.x, point.y, size.width, size.height);
};

CanvasRenderingContext2D.prototype.drawRect = function(point, size) {
	this.fillRect(point.x, point.y, size.width, size.height);
};

CanvasRenderingContext2D.prototype.arcFromPoint = function(point, radius, start, radians) {
	this.arc(point.x, point.y, radius, start, radians);
};

CanvasRenderingContext2D.prototype.drawImageFromNode = function(img, node) {
	ctx.drawImage(img, node.pos.x, node.pos.y, node.size.width, node.size.height);
};

function Boundries(minX, maxX, minY, maxY) {
	this.minX = minX;
	this.maxX = maxX;
	this.minY = minY;
	this.maxY = maxY;
}