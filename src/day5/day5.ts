'use strict';

import * as crypto from "crypto";

interface Result {
    offset: number;
    position: number;
    char: string;
}

export const findNextPasswordChar = (prefix: string, offset: number): Result => {
    while (true) {
        let hashInput = prefix + offset;
        let hash = crypto.createHash('md5').update(hashInput).digest("hex");
        if (hash.substring(0, 5) == "00000" && "01234567".indexOf(hash[5]) > -1) {
            return {offset: offset, position: parseInt(hash[5],10), char: hash[6]};
        }
        offset++;
    }
};
