'use strict';

import {expect} from "chai";
import {decompress} from "../../src/day9/day9";

describe('Decompress data', function () {

    const examples = [
        { compressed: "ADVENT", length: 6 },
        { compressed: "A(1x5)BC", length: 7 },
        { compressed: "(3x3)XYZ", length: 9 },
        { compressed: "A(2x2)BCD(2x2)EFG", length: 11 },
        { compressed: "(27x12)(20x12)(13x14)(7x10)(1x12)A", length: 241920 },
        { compressed: "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", length: 445 },
    ];

    examples.forEach((example) => {
        it(`should decompress ${example.compressed}`, function () {
            expect(decompress(example.compressed)).to.equal(example.length);
        });
    });
});
