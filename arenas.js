var Arena;

(function() {
	Arena = function() {
		this.players = [];
		this.food = [];
		for (var i = 0; i < 1000; i++) {
			this.food.push(new Food());	
		}
	};

	Arena.prototype.clientFood = function(playerIndex) {
		var arr = [];
		for (var i = this.food.length - 1; i >= 0; i--) {
			arr.push(this.food[i].clientFood(this.players[playerIndex].screenSize));
		};
		return arr;
	};

	Arena.prototype.clientPlayers = function(playerIndex) {
		var arr = [];
		for (var i = this.players.length - 1; i >= 0; i--) {
			if (i != playerIndex) {
				arr.push(this.players[i].clientPlayer(this.players[playerIndex].screenSize));
			}
		};
		return arr;
	};
}());

module.exports = {
	"arena": Arena
};