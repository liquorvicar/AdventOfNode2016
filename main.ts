'use strict';

import {supportsSSL, parseIP} from "./src/day7/day7";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day7/data.txt')
});
let numSupportsSSL = 0;
lineReader.on('line', function (inputLine) {
    let ip = parseIP(inputLine);
    if (supportsSSL(ip)) {
        numSupportsSSL++;
    }
    console.log(numSupportsSSL);
}).on('close', function () {
    console.log(numSupportsSSL);
});
