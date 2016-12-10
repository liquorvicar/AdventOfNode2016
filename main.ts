'use strict';

import {parseInstructions, processInstructions} from "./src/day10/day10";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day10/data.txt')
});
let rawInstructions: string[] = [];
lineReader.on('line', function (inputLine) {
    rawInstructions.push(inputLine)
}).on('close', function () {
    let instructions = parseInstructions(rawInstructions);
    let result = processInstructions(instructions, [17, 61]);
    console.log(result.bins[0][0] * result.bins[1][0] * result.bins[2][0]);
});
