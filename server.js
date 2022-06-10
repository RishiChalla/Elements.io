var express = require("express");
var app = express();
var server = app.listen(3000, "0.0.0.0");
app.use(express.static('public'));

global.boundries;
global.arenas = [];

var helpers = require("./helpers.js");
global.Point = helpers.point;
global.Box = helpers.box;
global.Boundries = helpers.boundries;
global.randomNumber = helpers.randomNumber;

var NodeClass = require("./node.js");
global.Node = NodeClass.node;
global.CircleNode = NodeClass.circleNode;

global.Element = require("./element.js").element;
global.Arena = require("./arenas.js").arena;
global.Food = require("./food.js").food;

boundries = new Boundries(0, 10000, 0, 10000);

var socket = require("socket.io");
var io = socket.listen(server);

io.sockets.on("connection", function(socket) {
	var player;
	var arenaIndex;
	var playerIndex;
	var done = true;
	socket.on("first", function(data) {
		done = false;
		arenaIndex = getArena();
		arenas[arenaIndex].players.push(new Element(data.screenSize.width, arenaIndex, data.username));
		playerIndex = arenas[arenaIndex].players.length - 1;
		player = arenas[arenaIndex].players[playerIndex];
		player.update();
		socket.emit("first", {
			"player": player.clientPlayer(player.screenSize),
			"boundries": boundries.clientBoundries(player.screenSize)
		});
	});

	socket.on("data", function(data) {
		if (done == false) {
			player.pos.x = (boundries.maxX * data.player.pos.x) / (player.screenSize * 5);
			player.pos.y = (boundries.maxX * data.player.pos.y) / (player.screenSize * 5);
			player.element = data.player.element;
			player.update();
			if (player.dead == true) {
				done = true;
				socket.emit("data", {
					"dead": true,
					"points": player.points
				});
				arenas[arenaIndex].players.splice(playerIndex, 1);
			}
			else {
				socket.emit("data", {
					"food": arenas[arenaIndex].clientFood(playerIndex),
					"elements": arenas[arenaIndex].clientPlayers(playerIndex),
					"player": player.clientPlayer(player.screenSize),
					"dead": false
				});
			}
		}
	});

	socket.on("disconnect", function() {
		if (done == false) {
			arenas[arenaIndex].players.splice(playerIndex, 1);
			done = true;
		}
	});
});

function getArena() {
	for (var i = arenas.length - 1; i >= 0; i--) {
		if (arenas[i].players.length < 20) {
			return i;
		}
	};
	arenas.push(new Arena());
	return arenas.length - 1;
}