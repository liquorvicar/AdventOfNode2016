'use strict';

import {findNextPasswordChar} from "../../src/day5/day5";
import {expect} from "chai";

describe('Find next password char', function() {
    this.timeout(10000);

    const examples = [
        {offset: 0, char: "5", position: 1},
        {offset: 3231930, char: "e", position: 4},
    ];
    examples.forEach((example) => {
        it('should find the next password char from offset ' + example.offset, () => {
            const result = findNextPasswordChar('abc', example.offset);
            expect(result.char).to.equal(example.char);
            expect(result.position).to.equal(example.position);
        });
    });

});
