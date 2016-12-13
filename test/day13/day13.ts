'use strict';

import {expect} from "chai";
import {Floorplan, countBits, shortestRoute} from "../../src/day13/day13";

describe('Floor plan', function () {

    let floorplan = new Floorplan(10);
    const examples = [
        { current: {x: 0, y: 0}, expected: [{x: 0, y: 1}] },
        { current: {x: 0, y: 1}, expected: [{x: 0, y: 0}, {x: 1, y: 1}] },
        { current: {x: 3, y: 2}, expected: [{x: 2, y: 2}, {x: 3, y: 1}, {x: 3, y: 3}, {x: 4, y: 2}] },
    ];
    examples.forEach((example) => {
        it('should give you the next possible cubicles', function () {
            expect(floorplan.getNext(example.current)).to.deep.equal(example.expected);
        });
    });

});

describe('Count bits', function () {

    const examples = [
        { number: 0, bits: 0 },
        { number: 1, bits: 0 },
        { number: 2, bits: 1 },
        { number: 3, bits: 1 },
        { number: 4, bits: 1 },
        { number: 5, bits: 1 },
        { number: 6, bits: 2 },
        { number: 8, bits: 1 },
        { number: 12, bits: 2 },
        { number: 15, bits: 3 },
    ];
    examples.forEach((example) => {
        it('should the number of bits set for ' + example.number, function () {
            expect(countBits(example.number)).to.equal(example.bits);
        });
    });

});

describe('Find shortest route', function () {

    it('should find the shortest route to 7,4', function () {
        const minMoves = shortestRoute({x:1, y:1}, {x:7, y:4}, new Floorplan(10), [], 0);
        expect(minMoves).to.equal(11);
    });
});
