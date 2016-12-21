'use strict';

import {expect} from "chai";
import {findLowestUnblocked} from "../../src/day20/day20";

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
