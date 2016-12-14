'use strict';

import * as crypto from "crypto";

export function containsTriple(salt: string, index: number): string {
    let hashInput = salt + index;
    let hash = crypto.createHash('md5').update(hashInput).digest("hex");
    for (let i = 0; i < hash.length - 2; i++) {
        if (hash[i] === hash[i+1] && hash[i+1] === hash[i+2]) {
            return hash[i];
        }
    }
    return '';
}

export function findKey(salt: string, startingIndex: number): number {
    const hashes = [];
}