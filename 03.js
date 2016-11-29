$input = require('./inputs/03');

class Santa {
	
	constructor (path) {
		this.path = path;
		this.position = {
			x: 0,
			y: 0
		};
		this.history = {};
	}
		
	move(i) {
		switch (i) {
			case "<":
				this.position.x -= 1;
				break;
			case ">":
				this.position.x += 1;
				break;
			case "^":
				this.position.y -= 1;
				break;
			case "v":
				this.position.y += 1;
				break;
			default:
				
		}
	}
		
	deliver(house) {
		let $houseKey = `${house.x}-${house.y}`;
		if (this.history.hasOwnProperty($houseKey)) {
			this.history[$houseKey] += 1;
		} else {
			this.history[$houseKey] = 1;
		}
	}
	
	startDelivery() {
		// Starting Point			
		this.deliver(this.position);
		
		// Move and deliver
		this.path.split('').forEach((dest) => {
			this.move(dest);
			this.deliver(this.position);
		});
		
	}
		
	answer() {
		console.log(Object.keys(this.history).length);
	}		
	
}

let s = new Santa($input);
s.startDelivery();
s.answer();

