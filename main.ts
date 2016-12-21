'use strict';
import {createInterface} from "readline";
import {createReadStream} from "fs";
import {findLowestUnblocked} from "./src/day20/day20";

let lineReader = createInterface({
    input: createReadStream('./src/day20/data.txt')
});
let rawInstructions: string[] = [];
lineReader.on('line', function (inputLine) {
    rawInstructions.push(inputLine)
}).on('close', function () {
    console.log(findLowestUnblocked(rawInstructions));
});
