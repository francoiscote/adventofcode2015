let crypto = require('crypto');


class Hasher {
	constructor(key) {
		this.key = key
		this.current = 0;
		this.match = false;
	}
	
	findMatch() {	
		while (!this.match) {
			const md5sum = crypto.createHash('md5');
			md5sum.update(this.key + '' + this.current);
			const hexHash = md5sum.digest('hex');
			
			if (hexHash.slice(0, 6) === '000000') {
				this.match = this.current;
			} else {
				this.current++;
			}
		}
		
		return this.match;
	}
		
}

let h = new Hasher('ckczppom');
const v = h.findMatch();
console.log(v);
