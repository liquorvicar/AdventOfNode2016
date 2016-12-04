'use strict';

import {validateRoom, decryptName} from "./src/day4/day4";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day4/data.txt')
});

let sum = 0;
lineReader.on('line', function (inputLine) {
    let sector = validateRoom(inputLine);
    if (sector > 0) {
        let name = decryptName(inputLine);
        if (name.indexOf('north') > -1) {
            console.log(name, sector);
        }
    }
});