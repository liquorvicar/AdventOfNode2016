'use strict';

import * as crypto from "crypto";

export function containsTriple(hash: string): string {
    for (let i = 0; i < hash.length - 2; i++) {
        if (hash[i] === hash[i+1] && hash[i+1] === hash[i+2]) {
            return hash[i];
        }
    }
    return '';
}

export function findHashWithFiveChars(start: number, hashes: string[], char: string): boolean {
    let re = new RegExp(`[${char}]{5}`);
    for (let i = 0; i < 1000; i++) {
        let found = re.exec(hashes[start + i]);
        if (found) {
            return true;
        }
    }
    return false;
}

export class KeyGenerator {
    private hashes: string[];
    private salt: string;

    constructor(salt: string) {
        this.hashes = [];
        let hashInput: string;
        this.salt = salt;
        for (let i = 0; i <= 1000; i++) {
            hashInput = salt + i;
            let hash = crypto.createHash('md5').update(hashInput).digest("hex");
            this.hashes.push(hash);
        }
    }
    public findNthKey(numKeys: number): number {
        let key: number;
        let startingPoint = 0;
        for (let i = 0; i < numKeys; i++) {
            key = this.findKey(startingPoint);
            console.log(i, key);
            startingPoint = key + 1;
        }
        return key;
    }

    public findKey(startingIndex: number): number {
        let keyFound = false;
        let i = startingIndex;
        let hashInput: string;
        let hash: string;
        while (!keyFound) {
            let char = containsTriple(this.hashes[i]);
            hashInput = this.salt + this.hashes.length;
            hash = crypto.createHash('md5').update(hashInput).digest("hex");
            this.hashes.push(hash);
            if (char !== '') {
                if (findHashWithFiveChars(i + 1, this.hashes, char)) {
                    return i;
                }
            }
            i++;
            if (i == 50000) {
                break;
            }
        }
        return -1;
    }
}
