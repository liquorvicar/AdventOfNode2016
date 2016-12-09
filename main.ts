'use strict';

import {decompress} from "./src/day9/day9";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day9/data.txt')
});
lineReader.on('line', function (inputLine) {
    let decompressed = decompress(inputLine);
    console.log(decompressed.length);
});
