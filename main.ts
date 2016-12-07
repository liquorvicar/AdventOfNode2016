'use strict';

import {supportsTLS} from "./src/day7/day7";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day7/data.txt')
});
let numSupportsTLS = 0;
lineReader.on('line', function (inputLine) {
    if (supportsTLS(inputLine)) {
        numSupportsTLS++;
    }
    console.log(numSupportsTLS);
}).on('close', function () {
    console.log(numSupportsTLS);
});
