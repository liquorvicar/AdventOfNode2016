'use strict';

import {expect} from "chai";
import {containsTriple, findKey} from "../../src/day14/day14";

describe('Hash contains triple', function () {

    it('should return empty for index 17', function () {
        expect(containsTriple('abc', 17)).to.equal('');
    });

    it('should return 8 for index 18', function () {
        expect(containsTriple('abc', 18)).to.equal('8');
    });

});

describe('Find key', function () {

    it('should find 39 as the first key', function () {
        expect(findKey('abc', 0)).to.equal(39);
    });

});
