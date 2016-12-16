'use strict';
import {Disc, pressButton} from "./src/day15/day15";

let aligned = false;
let time = 0;
while (!aligned) {
    let discs = [
        new Disc(5, 17),
        new Disc(8, 19),
        new Disc(1, 7),
        new Disc(7, 13),
        new Disc(1, 5),
        new Disc(0, 3),
    ];
    aligned = pressButton(discs, time);
    time++;
}
console.log(time-1);