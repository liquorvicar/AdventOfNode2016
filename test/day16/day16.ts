'use strict';

import {expect} from "chai";
import {generateData, calculateChecksum, getChecksum} from "../../src/day16/day16";

describe('Generate random data', function () {

    const examples = [
        { input: "1", output: "100" },
        { input: "0", output: "001" },
        { input: "11111", output: "11111000000" },
        { input: "111100001010", output: "1111000010100101011110000" },
    ];

    examples.forEach((example) => {
        it('should generate the pseudo-random data for ' + example.input, function () {
            expect(generateData(example.input)).to.equal(example.output);
        });
    });

});

describe('Calculate checksum', function () {

    it('should calculate the checksum of 110010110100', function () {
        expect(calculateChecksum('110010110100')).to.equal('100');
    });
});

describe('Get checksum for full disc', function () {

    it('should fill the disk with 20 chars and get the checksum', function () {
        expect(getChecksum('10000', 20)).to.equal('01100');
    });

});
