'use strict';

import {expect} from "chai";
import {decompress} from "../../src/day9/day9";

describe('Decompress data', function () {

    const examples = [
        { compressed: "ADVENT", decompressed: "ADVENT" },
        { compressed: "A(1x5)BC", decompressed: "ABBBBBC" },
        { compressed: "(3x3)XYZ", decompressed: "XYZXYZXYZ" },
        { compressed: "A(2x2)BCD(2x2)EFG", decompressed: "ABCBCDEFEFG" },
        { compressed: "(6x1)(1x3)A", decompressed: "(1x3)A" },
        { compressed: "X(8x2)(3x3)ABCY", decompressed: "X(3x3)ABC(3x3)ABCY" },
    ];

    examples.forEach((example) => {
        it(`should decompress ${example.compressed}`, function () {
            expect(decompress(example.compressed)).to.equal(example.decompressed);
        });
    });
});
