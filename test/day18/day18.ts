'use strict';

import {expect} from "chai";
import {getNextRow, countSafe} from "../../src/day18/day18";

describe('Calculating new row of tiles', function () {

    const examples = [
        { previous: '..^^.', next: '.^^^^' },
        { previous: '.^^^^', next: '^^..^' },
        { previous: '.^^.^.^^^^', next: '^^^...^..^' },
    ];

    examples.forEach((example) => {
        it('should calculate the next row after ' + example.previous, function () {
            expect(getNextRow(example.previous)).to.equal(example.next);
        });
    })
});

describe('Count safe tiles', function () {

    it('should count the safe tiles for row .^^.^.^^^^', function () {
        expect(countSafe('.^^.^.^^^^', 10)).to.equal(38);
    });
});