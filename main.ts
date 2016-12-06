'use strict';

import {recoverMessage} from "./src/day6/day6";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day6/data.txt')
});
let messages: string[] = [];
lineReader.on('line', function (inputLine) {
    messages.push(inputLine);
}).on('close', function () {
    console.log(recoverMessage(messages));
});
