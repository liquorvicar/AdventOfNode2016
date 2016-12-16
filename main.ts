'use strict';
import {Disc, pressButton} from "./src/day15/day15";

let discs = [
    new Disc(5, 17),
    new Disc(8, 19),
    new Disc(1, 7),
    new Disc(7, 13),
    new Disc(1, 5),
    new Disc(0, 3),
];
let newDisc = new Disc(0, 11);
let biggestDisc = new Disc(8, 19);
let aligned = false;
let time = 0;
while (!aligned) {
    time = biggestDisc.nextAlignment(time) - 2;
    aligned = pressButton(discs, time);
    if (aligned) {
        console.log(time, aligned);
        aligned = newDisc.isAligned(time + 7);
        console.log(aligned);
    }
    time += 3;
}
console.log(time - 3);
