'use strict';
import {createInterface} from "readline";
import {createReadStream} from "fs";
import {parseSteps, transform} from "./src/day21/day21";

let lineReader = createInterface({
    input: createReadStream('./src/day21/data.txt')
});
let rawInstructions: string[] = [];
lineReader.on('line', function (inputLine) {
    rawInstructions.push(inputLine)
}).on('close', function () {
    const steps = parseSteps(rawInstructions);
    console.log(transform('abcdefgh', steps));
});
