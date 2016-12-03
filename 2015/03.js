input = require('./inputs/03');

let history = {};

class Santa {

    constructor(path, skip) {
        this.path = path;
        this.skip = skip;
        this.position = {
            x: 0,
            y: 0
        };
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
        let houseKey = `${house.x}-${house.y}`;
        if (history.hasOwnProperty(houseKey)) {
            history[houseKey] += 1;
        } else {
            history[houseKey] = 1;
        }
    }

    startDelivery() {
        // Starting Point
        this.deliver(this.position);

        // Move and deliver
        this.path.split('').forEach((dest, i) => {
            if (this.skip) {
                if (this.skip === 1 && i % 2 > 0) {
                    return
                }
                if (this.skip === 2 && i % 2 === 0) {
                    return
                }
            }
            this.move(dest);
            this.deliver(this.position);
        });

    }

}

// Part 1
let s = new Santa(input);
s.startDelivery();
console.log(`Answer Part 1: ${Object.keys(history).length}`);

// Clear
history = {};

let s1 = new Santa(input, 1);
s1.startDelivery();

let s2 = new Santa(input, 2);
s2.startDelivery();

console.log(`Answer Part 2: ${Object.keys(history).length}`);