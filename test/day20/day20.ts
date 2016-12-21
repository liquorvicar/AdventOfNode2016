'use strict';

import {expect} from "chai";
import {findLowestUnblocked, countAllUnblocked} from "../../src/day20/day20";

describe('Find lowest unblocked ip', function () {

    it('should find the lowest ip as 3', function () {
        const input = [
            '5-8',
            '0-2',
            '4-7',
        ];
        expect(findLowestUnblocked(input)).to.equal(3);
    });

});

describe('Count all unblocked IPs', function () {

    it('should count all unblocked IPs as 2', function () {
        const input = [
            '5-8',
            '0-2',
            '4-7',
        ];
        expect(countAllUnblocked(input, 9)).to.equal(2);
    });
});
