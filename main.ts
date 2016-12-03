'use strict';

import {isTriangle} from "./src/day3/day3";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day3/data.txt')
});

let count = 0;
lineReader.on('line', function (inputLine) {
    let strings = inputLine.match(/([0-9]+)/g);
    let triangle = strings.filter((side) => {
        return (side != " ");
    }).map((side) => {
        return parseInt(side, 10);
    });
    if (isTriangle(triangle)) {
        count++;
        console.log(count);
    }
});