var canvas;
var ctx;
var player;
var camera;
var grid;
var elements = [];
var food = [];
var mousePos;
var boundries;
var classes = {};
var server;

window.onload = function() {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
	ctx = canvas.getContext("2d");
	mousePos = new Point(canvas.width / 2, canvas.height / 2);
	window.addEventListener("mousemove", function(evt) {
		var rect = canvas.getBoundingClientRect();
		mousePos.x = evt.clientX - rect.left;
		mousePos.y = evt.clientY - rect.top;
		if (player.lvl >= 15 && player.element == "basic") {
			var done = false;
			for (key in classes) {
				if (done == false) {
					if (classes[key].node.containsPoint(mousePos) == true) {
						done = true;
						canvas.classList.add("point");
					}
					else {
						canvas.classList.remove("point");
					}
				}
			}
		}
	});
	document.getElementById("restart").addEventListener("click", function() {
		window.location.reload(true);
	});
	canvas.addEventListener("click", function(evt) {
		if (player.lvl >= 15 && player.element == "basic") {
			for (key in classes) {
				if (classes[key].node.containsPoint(mousePos) == true) {
					player.element = key;
					canvas.classList.remove("point");
				}
			}
		}
	});
	setup();
};

function setup() {
	server = new Connection("http://192.168.1.70:3000/");
	var isValid = false;
	var errorMsg = "";
	var username;
	while (isValid == false) {
		username = prompt("Please type a display name(This can be left blank)."+errorMsg);
		if (username.length >= 50) {
			errorMsg = "\nError: your username was too long.";
		}
		else {
			isValid = true;
		}
	}
	server.sendFirst({
		"username": username,
		"screenSize": new Box(canvas.width, canvas.height)
	});
	server.recieveOnce(function(data) {
		camera = new Camera();
		boundries = data.boundries;
		grid = new Grid(new Box(boundries.maxX - boundries.minX, boundries.maxY - boundries.minY), new Point(boundries.minX, boundries.minY));
		player = new Element(data.player.pos, data.player.element, data.player.lvl, data.player.points, data.boundries);
		player.username = username;
		player.pos.x = data.player.pos.x;
		player.pos.y = data.player.pos.y;
		player.circleNode.pos.x = player.pos.x;
		player.circleNode.pos.y = player.pos.y;

		classes.fire = {
			"node": new Node(new Point(30, 30), new Box(150, 150)),
			"circleNode": new CircleNode(new Point(105, 105), 60)
		};
		classes.water = {
			"node": new Node(new Point(210, 30), new Box(150, 150)),
			"circleNode": new CircleNode(new Point(285, 105), 60)
		};
		classes.lightning = {
			"node": new Node(new Point(390, 30), new Box(150, 150)),
			"circleNode": new CircleNode(new Point(465, 105), 60)
		};
		classes.steel = {
			"node": new Node(new Point(570, 30), new Box(150, 150)),
			"circleNode": new CircleNode(new Point(645, 105), 60)
		};
		classes.ice = {
			"node": new Node(new Point(750, 30), new Box(150, 150)),
			"circleNode": new CircleNode(new Point(825, 105), 60)
		};
		update();
	});
	server.recieve(function(data) {
		if (data.dead == false) {
			food = [];
			for (var i = data.food.length - 1; i >= 0; i--) {
				food.push(new Food(new Point(data.food[i].pos.x, data.food[i].pos.y), data.food[i].element, new CircleNode(data.food[i].circleNode.pos, data.food[i].radius)));
			};

			elements = [];
			for (var i = data.elements.length - 1; i >= 0; i--) {
				elements.push(new Element(data.elements[i].pos, data.elements[i].element, data.elements[i].lvl, data.elements[i].points, boundries));
				elements[elements.length - 1].circleNode.radius = data.elements[i].circleNode.radius;
				elements[elements.length - 1].username = data.elements[i].username;
			};

			player.pos.x = data.player.pos.x;
			player.pos.y = data.player.pos.y;
			player.circleNode.pos.x = player.pos.x;
			player.circleNode.pos.y = player.pos.y;
			player.circleNode.radius = data.player.circleNode.radius;
			player.lvl = data.player.lvl;
			player.points = data.player.points;
			player.speed = data.player.speed;
			player.element = data.player.element;
		}
		else {
			canvas.style.display = "none";
			document.getElementById("dead").style.display = "block";
			document.getElementById("dead").style.width = canvas.width+"px";
			document.getElementById("score").innerHTML = "Your final score was: "+data.points+" points!";
		}
	})
}

function draw() {
	player.moveTo(mousePos);
	camera.update();
	camera.follow(player);
	grid.update();
	for (var i = food.length - 1; i >= 0; i--) {
		food[i].update();
	};
	for (var i = elements.length - 1; i >= 0; i--) {
		elements[i].update();
	};
	player.update();
	if (player.lvl >= 15 && player.element == "basic") {
		showClasses();
	}
}

function update() {
	window.requestAnimationFrame(update);
	draw();
	server.send({
		"player": player
	});
}

function showClasses() {
	for (key in classes) {
		camera.fixed(function() {
			classes[key].node.draw(function() {
				ctx.strokeStyle = "#cccccc";
				ctx.fillStyle = "#ffffff";
				ctx.lineWidth = 10;
				ctx.fill();
				ctx.stroke();
			});
		});
	}
	camera.fixed(function() {
		classes.fire.circleNode.draw(function() {
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.strokeStyle = "red";
			ctx.lineWidth = 10;
			ctx.stroke();
		});
		classes.water.circleNode.draw(function() {
			ctx.fillStyle = "#9999ff";
			ctx.fill();
			ctx.strokeStyle = "blue";
			ctx.lineWidth = 10;
			ctx.stroke();
		});
		classes.ice.circleNode.draw(function() {
			ctx.fillStyle = "lightblue";
			ctx.fill();
			ctx.strokeStyle = "#4fabc9";
			ctx.lineWidth = 10;
			ctx.stroke();
		});
		classes.lightning.circleNode.draw(function() {
			ctx.fillStyle = "#ffffcc";
			ctx.fill();
			ctx.strokeStyle = "yellow";
			ctx.lineWidth = 10;
			ctx.stroke();
		});
		classes.steel.circleNode.draw(function() {
			ctx.fillStyle = "#cccccc";
			ctx.fill();
			ctx.strokeStyle = "gray";
			ctx.lineWidth = 10;
			ctx.stroke();
		});
	});
}