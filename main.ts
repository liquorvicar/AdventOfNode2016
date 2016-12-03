'use strict';

import {isTriangle} from "./src/day3/day3";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day3/data.txt')
});

let count = 0;
let triangles: number[][] = [];
lineReader.on('line', function (inputLine) {
    let strings = inputLine.match(/([0-9]+)/g);
    let triangle = strings.filter((side) => {
        return (side != " ");
    }).map((side) => {
        return parseInt(side, 10);
    });
    triangles.push(triangle);
    if (triangles.length == 3) {
        for (let i = 0; i < 3; i++) {
            if (isTriangle([triangles[0][i], triangles[1][i], triangles[2][i]])) {
                count++;
            }
        }
        triangles = [];
    }
    console.log(count);
});