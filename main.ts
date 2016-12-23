'use strict';
import {createInterface} from "readline";
import {createReadStream} from "fs";
import {parseInput, findPairs} from "./src/day22/day22";

let lineReader = createInterface({
    input: createReadStream('./src/day22/data.txt')
});
let rawInstructions: string[] = [];
lineReader.on('line', function (inputLine) {
    rawInstructions.push(inputLine)
}).on('close', function () {
    const disks = parseInput(rawInstructions);
    const pairs = findPairs(disks);
    console.log(pairs.length);
});
