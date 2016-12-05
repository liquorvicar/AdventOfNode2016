'use strict';

import {findNextPasswordChar} from "./src/day5/day5";

const prefix = 'uqwqemis';
let password = [];
let offset = 0;
let charsFound = 0;

while (charsFound < 8) {
    let result = findNextPasswordChar(prefix, offset);
    if (!password[result.position]) {
        password[result.position] = result.char;
        charsFound++;
    }
    offset = result.offset + 1;
    console.log(charsFound);
}

console.log(password.join(''));