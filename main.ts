'use strict';

import {validateRoom} from "./src/day4/day4";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day4/data.txt')
});

let sum = 0;
lineReader.on('line', function (inputLine) {
    sum += validateRoom(inputLine);
    console.log(sum);
});