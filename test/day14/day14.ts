'use strict';

import {expect} from "chai";
import {containsTriple, findHashWithFiveChars, KeyGenerator} from "../../src/day14/day14";

describe('Hash contains triple', function () {

    it('should return empty for abcdef', function () {
        expect(containsTriple('abcdef')).to.equal('');
    });

    it('should return 8 for abc888feee', function () {
        expect(containsTriple('abc888feee')).to.equal('8');
    });

});

describe('Key with five chars', function () {

    it('should return false if no string found', function () {
        let strings: string[] = [];
        for (let i = 0; i < 1000; i++) {
            strings.push('abcde');
        }
        expect(findHashWithFiveChars(0, strings, 'a')).to.equal(false);
    });

    it('should return true if string is found', function () {
        let strings: string[] = [];
        for (let i = 0; i < 1000; i++) {
            strings.push('abcdeaaaaa');
        }
        expect(findHashWithFiveChars(0, strings, 'a')).to.equal(true);
    });
});

describe('Find key', function () {

    it('should find 10 as the first key', function () {
        let generator = new KeyGenerator('abc');
        expect(generator.findKey(0)).to.equal(10);
    });

    it('should find 22551 as the 64th key', function () {
        let generator = new KeyGenerator('abc');
        expect(generator.findNthKey(64)).to.equal(22551);
    });

});
