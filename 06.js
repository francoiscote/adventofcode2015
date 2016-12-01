const input = require('./inputs/06').split('\n');

class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		
		const row = Array(width).fill(false);
		this.grid = Array(width).fill(row);		
	}

	applyOnGrid(xFrom, yFrom, xTo, yTo, operation) {
		if ( typeof	operation !== "function") {
			throw "Operation must be a function";
		}
		
		for (var h = yFrom; h <= yTo; h++) {
			for (var w = xFrom; w <= xTo; w++) {
				operation.call(this, h, w);
			}
		}
	}
		
	setLight(h, w, lightValue) {	
		this.grid[h][w] = lightValue;
	}
	
	getLight(h, w) {
		return this.grid[h][w];
	}
	
	getLightsOnCount() {
		// Two-dimensional count
		return this.grid.reduce((memo, row) => {
			const rowCount = row.reduce((memo, light) => {
				return memo += (light) ? 1 : 0;
			}, 0);
			return memo += rowCount;
		}, 0);		
	}

	toggle(xFrom, yFrom, xTo, yTo) {
		this.applyOnGrid(xFrom, yFrom, xTo, yTo, (h, w) => {
			this.setLight(h, w, !this.grid[h][w]);
		});
	}
	
	turnon(xFrom, yFrom, xTo, yTo) {
		this.applyOnGrid(xFrom, yFrom, xTo, yTo, (h, w) => {
			this.setLight(h, w, true);
		});
	}
	
	turnoff(xFrom, yFrom, xTo, yTo) {
		this.applyOnGrid(xFrom, yFrom, xTo, yTo, (h, w) => {
			this.setLight(h, w, false);
		});
	}
	
	do(command, xFrom, yFrom, xTo, yTo) {
		if (!typeof this[command] === 'function ') {
			throw "command must be one of throw, turnon or turnoff";
		}		
		this[command].call(this, xFrom, yFrom, xTo, yTo);
	}
}

class InstructionsParser {
	constructor(inst, grid) {
		this.inst = inst;
		this.grid = grid;
	}
	
	parse() {
		this.inst.map((i, d) => {
			const match = i.match(/(toggle|turn (on|off))\s(\d{1,3})\,(\d{1,3})\sthrough\s(\d{1,3})\,(\d{1,3})/i);
			
			// Format Values
			const command = match[1].split(' ').join('');
			const xFrom = parseInt(match[3], 10);
			const yFrom = parseInt(match[4], 10);
			const xTo = parseInt(match[5], 10);
			const yTo = parseInt(match[6], 10);

			this.grid.do(command, xFrom, yFrom, xTo, yTo);
		});
	}
}

const part1 = new Grid(1000, 1000);

const parser1 = new InstructionsParser(input, part1);
parser1.parse();
console.log(part1.getLightsOnCount());
