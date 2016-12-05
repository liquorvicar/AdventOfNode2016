'use strict';

import {findNextPasswordChar} from "./src/day5/day5";

const prefix = 'uqwqemis';
let password = '';
let offset = 0;

for (let i = 0; i < 8; i++) {
    let result = findNextPasswordChar(prefix, offset);
    password += result.char;
    offset = result.offset + 1;
    console.log(i);
}

console.log(password);