'use strict';

import {findNextPasswordChar} from "../../src/day5/day5";
import {expect} from "chai";

describe('Find next password char', function() {
    this.timeout(10000);

    const examples = [
        {offset: 0, char: "1"},
        {offset: 3231930, char: "8"},
    ];
    examples.forEach((example) => {
        it('should find the next password char from offset ' + example.offset, () => {
            const result = findNextPasswordChar('abc', example.offset);
            expect(result.char).to.equal(example.char);
        });
    });

});
