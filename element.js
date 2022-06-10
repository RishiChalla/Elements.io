// steel > lightning
// lightning > water
// water > fire
// fire > ice
// ice > steel

var Element;

(function() {
	Element = function(screenSize, arenaIndex, username) {
		this.pos = new Point(randomNumber(boundries.minX, boundries.maxX), randomNumber(boundries.minY, boundries.maxY));
		this.lvl = 1;
		this.points = 0;
		
		this.circleNode = new CircleNode(new Point(this.pos.x, this.pos.y), Math.sqrt(this.points * 15 / Math.PI) + 50);
		this.arenaIndex = arenaIndex;
		this.screenSize = screenSize;
		this.element = randomNumber(1, 6);
		this.username = username;
		this.dead = false;
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
		this.checkLvl();
	};

	Element.prototype.update = function() {
		this.circleNode.pos.x = this.pos.x;
		this.circleNode.pos.y = this.pos.y;
		var count = 0;
		for (var i = arenas[this.arenaIndex].food.length - 1; i >= 0; i--) {
			if (arenas[this.arenaIndex].food[i].circleNode.containsCircleNode(this.circleNode) == true) {
				if (arenas[this.arenaIndex].food[i].element == "basic") {
					this.points += 10;
				}
				else if (arenas[this.arenaIndex].food[i].element == "steel" && this.element == "ice") {
					this.points += 20;
				}
				else if (arenas[this.arenaIndex].food[i].element == "ice" && this.element == "steel") {
					this.points += 5;
				}
				else if (arenas[this.arenaIndex].food[i].element == "ice" && this.element == "fire") {
					this.points += 20;
				}
				else if (arenas[this.arenaIndex].food[i].element == "fire" && this.element == "ice") {
					this.points += 5;
				}
				else if (arenas[this.arenaIndex].food[i].element == "fire" && this.element == "water") {
					this.points += 20;
				}
				else if (arenas[this.arenaIndex].food[i].element == "water" && this.element == "fire") {
					this.points += 5;
				}
				else if (arenas[this.arenaIndex].food[i].element == "water" && this.element == "lightning") {
					this.points += 20;
				}
				else if (arenas[this.arenaIndex].food[i].element == "lightning" && this.element == "water") {
					this.points += 5;
				}
				else if (arenas[this.arenaIndex].food[i].element == "lightning" && this.element == "steel") {
					this.points += 20;
				}
				else if (arenas[this.arenaIndex].food[i].element == "steel" && this.element == "lightning") {
					this.points += 5;
				}
				else {
					this.points += 10;
				}
				arenas[this.arenaIndex].food.splice(i, 1);
				count++;
			}
		};
		while (count > 0) {
			arenas[this.arenaIndex].food.push(new Food());
			count--;
		};
		for (var i = arenas[this.arenaIndex].players.length - 1; i >= 0; i--) {
			var element = arenas[this.arenaIndex].players[i];
			var distance = Math.sqrt(Math.pow(element.pos.x - this.pos.x, 2) + Math.pow(element.pos.y - this.pos.y, 2));
			if (this.circleNode.radius > (distance + element.circleNode.radius)) {
				if (element.element == "basic") {
					this.points += element.points;
					element.dead = true;
				}
				else if (arenas[this.arenaIndex].food[i].element == "steel" && this.element == "ice") {
					this.points += element.points;
					element.dead = true;
				}
				else if (arenas[this.arenaIndex].food[i].element == "ice" && this.element == "steel") {
					if (this.radius >= element.radius * 2) {
						this.points += element.points;
						element.dead = true;
					}
					else {
						element.points += this.points;
						this.dead = true;
					}
				}
				else if (arenas[this.arenaIndex].food[i].element == "ice" && this.element == "fire") {
					this.points += element.points;
					element.dead = true;
				}
				else if (arenas[this.arenaIndex].food[i].element == "fire" && this.element == "ice") {
					if (this.radius >= element.radius * 2) {
						this.points += element.points;
						element.dead = true;
					}
					else {
						element.points += this.points;
						this.dead = true;
					}
				}
				else if (arenas[this.arenaIndex].food[i].element == "fire" && this.element == "water") {
					this.points += element.points;
					element.dead = true;
				}
				else if (arenas[this.arenaIndex].food[i].element == "water" && this.element == "fire") {
					if (this.radius >= element.radius * 2) {
						this.points += element.points;
						element.dead = true;
					}
					else {
						element.points += this.points;
						this.dead = true;
					}
				}
				else if (arenas[this.arenaIndex].food[i].element == "water" && this.element == "lightning") {
					this.points += element.points;
					element.dead = true;
				}
				else if (arenas[this.arenaIndex].food[i].element == "lightning" && this.element == "water") {
					if (this.radius >= element.radius * 2) {
						this.points += element.points;
						element.dead = true;
					}
					else {
						element.points += this.points;
						this.dead = true;
					}
				}
				else if (arenas[this.arenaIndex].food[i].element == "lightning" && this.element == "steel") {
					this.points += element.points;
					element.dead = true;
				}
				else if (arenas[this.arenaIndex].food[i].element == "steel" && this.element == "lightning") {
					if (this.radius >= element.radius * 2) {
						this.points += element.points;
						element.dead = true;
					}
					else {
						element.points += this.points;
						this.dead = true;
					}
				}
				else {
					this.points += element.points;
					element.dead = true;
				}
			}
		};
		this.checkLvl();
		this.circleNode.radius = Math.sqrt(this.points * 15 / Math.PI) + 50;
		if (this.pos.x < boundries.minX) {
			this.pos.x = boundries.minX;
		}
		if (this.pos.x > boundries.maxX) {
			this.pos.x = boundries.maxX;
		}
		if (this.pos.y < boundries.minY) {
			this.pos.y = boundries.minY;
		}
		if (this.pos.y > boundries.maxY) {
			this.pos.y = boundries.maxY;
		}
	};

	Element.prototype.checkLvl = function() {
		if (this.points <= 10) {
			this.lvl = 1;
			this.speed = 20;
		}
		else if (this.points <= 30) {
			this.lvl = 2;
			this.speed = 20;
		}
		else if (this.points <= 70) {
			this.lvl = 3;
			this.speed = 19;
		}
		else if (this.points <= 150) {
			this.lvl = 4;
			this.speed = 19;
		}
		else if (this.points <= 500) {
			this.lvl = 5;
			this.speed = 18;
		}
		else if (this.points <= 800) {
			this.lvl = 6;
			this.speed = 18;
		}
		else if (this.points <= 1200) {
			this.lvl = 7;
			this.speed = 17;
		}
		else if (this.points <= 1700) {
			this.lvl = 8;
			this.speed = 17;
		}
		else if (this.points <= 2300) {
			this.lvl = 9;
			this.speed = 16;
		}
		else if (this.points <= 3000) {
			this.lvl = 10;
			this.speed = 16;
		}
		else if (this.points <= 3800) {
			this.lvl = 11;
			this.speed = 15;
		}
		else if (this.points <= 4700) {
			this.lvl = 12;
			this.speed = 15;
		}
		else if (this.points <= 5800) {
			this.lvl = 13;
			this.speed = 14;
		}
		else if (this.points <= 6000) {
			this.lvl = 14;
			this.speed = 14;
		}
		else if (this.points <= 7300) {
			this.lvl = 15;
			this.speed = 13;
		}
		else if (this.points <= 8700) {
			this.lvl = 16;
			this.speed = 13;
		}
		else if (this.points <= 10000) {
			this.lvl = 17;
			this.speed = 12;
		}
		else if (this.points <= 13000) {
		    this.lvl = 19;
		    this.speed = 12;
		}
		else if (this.points <= 14500) {
		    this.lvl = 20;
		    this.speed = 11;
		}
		else if (this.points <= 16000) {
		    this.lvl = 21;
		    this.speed = 11;
		}
		else if (this.points <= 17500) {
		    this.lvl = 22;
		    this.speed = 10;
		}
		else if (this.points <= 19000) {
		    this.lvl = 23;
		    this.speed = 10;
		}
		else if (this.points <= 20500) {
		    this.lvl = 24;
		    this.speed = 9;
		}
		else if (this.points <= 22000) {
		    this.lvl = 25;
		    this.speed = 9;
		}
		else if (this.points <= 23500) {
		    this.lvl = 26;
		    this.speed = 8;
		}
		else if (this.points <= 25000) {
		    this.lvl = 27;
		    this.speed = 8;
		}
		else if (this.points <= 26500) {
		    this.lvl = 28;
		    this.speed = 7;
		}
		else if (this.points <= 28000) {
		    this.lvl = 29;
		    this.speed = 7;
		}
		else if (this.points <= 29500) {
		    this.lvl = 30;
		    this.speed = 6;
		}
		else if (this.points <= 31000) {
		    this.lvl = 31;
		    this.speed = 6;
		}
		else if (this.points <= 32500) {
		    this.lvl = 32;
		    this.speed = 5;
		}
		else if (this.points <= 34000) {
		    this.lvl = 33;
		    this.speed = 5;
		}
		else if (this.points <= 35500) {
		    this.lvl = 34;
		    this.speed = 4;
		}
		else if (this.points <= 37000) {
		    this.lvl = 35;
		    this.speed = 4;
		}
		else if (this.points <= 38500) {
		    this.lvl = 36;
		    this.speed = 3;
		}
		else if (this.points <= 40000) {
		    this.lvl = 37;
		    this.speed = 3;
		}
		else if (this.points <= 41500) {
		    this.lvl = 38;
		    this.speed = 2;
		}
		else if (this.points <= 43000) {
		    this.lvl = 39;
		    this.speed = 2;
		}
		else if (this.points > 43000) {
		    this.lvl = 40;
		    this.speed = 1;
		}
		if (this.lvl < 15) {
			this.element = "basic";
		}
	};

	Element.prototype.clientPlayer = function(screenSize) {
		return {
			"pos": this.pos.clientPoint(screenSize),
			"circleNode": this.circleNode.clientNode(screenSize),
			"lvl": this.lvl,
			"points": this.points,
			"speed": this.speed,
			"element": this.element,
			"username": this.username
		};
	};
}());

module.exports = {
	"element": Element
};