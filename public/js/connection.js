var Connection;

(function() {
	Connection = function(server) {
		this.socket = io.connect(server);
	};

	Connection.prototype.recieve = function(callback) {
		this.socket.on("data", function(data) {
			callback(data);
		});
	};

	Connection.prototype.recieveOnce = function(callback) {
		this.socket.on("first", function(data) {
			callback(data);
		});
	};

	Connection.prototype.send = function(data) {
		this.socket.emit("data" ,data);
	};

	Connection.prototype.sendFirst = function(data) {
		this.socket.emit("first" ,data);
	};
}());