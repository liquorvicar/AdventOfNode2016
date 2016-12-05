'use strict';

import * as crypto from "crypto";

interface Result {
    offset: number;
    char: string;
}

export const findNextPasswordChar = (prefix: string, offset: number): Result => {
    while (true) {
        let hashInput = prefix + offset;
        let hash = crypto.createHash('md5').update(hashInput).digest("hex");
        if (hash.substring(0, 5) == "00000") {
            return {offset: offset, char: hash[5]};
        }
        offset++;
    }
};
