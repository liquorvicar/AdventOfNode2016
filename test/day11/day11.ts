'use strict';

import {expect} from "chai";
import {getNextMoves, validateMove, calcMinMoves} from "../../src/day11/day11";

describe('Possible moves', function () {

    it('should get valid moves with elevator on first floor', function () {
        const positions = [
            [],
            ['E', 'HM', 'LM'],
            ['HG'],
            ['LG'],
            [],
        ];
        const possibleMoves = getNextMoves(positions);
        expect(possibleMoves.length).to.equal(1);
        expect(possibleMoves[0]).to.deep.equal([
            [],
            ['LM'],
            ['E', 'HG', 'HM'],
            ['LG'],
            [],
        ]);
    });

    it('should get valid moves with elevator on second floor', function () {
        const positions = [
            [],
            ['LM'],
            ['E', 'HG', 'HM'],
            ['LG'],
            [],
        ];
        const possibleMoves = getNextMoves(positions);
        expect(possibleMoves.length).to.equal(3);
        expect(possibleMoves[0]).to.deep.equal([
            [],
            ['LM'],
            ['HM'],
            ['E', 'HG', 'LG'],
            [],
        ]);
        expect(possibleMoves[1]).to.deep.equal([
            [],
            ['LM'],
            [],
            ['E', 'HG', 'HM', 'LG'],
            [],
        ]);
        expect(possibleMoves[2]).to.deep.equal([
            [],
            ['E', 'HM', 'LM'],
            ['HG'],
            ['LG'],
            [],
        ]);
    });

});

describe('Valid moves', function () {
    const examples = [
        {
            positions: [
                [],
                ['HM'],
                ['E', 'HG', 'LM'],
                ['LG'],
                [],
            ], valid: false
        },
        {
            positions: [
                [],
                ['LM'],
                ['E', 'HG', 'HM'],
                ['LG'],
                [],
            ], valid: true
        },
        {
            positions: [
                [],
                [],
                ['E', 'HG', 'HM', 'LM'],
                ['LG'],
                [],
            ], valid: false
        },
    ];

    examples.forEach((example) => {

        it('should validate the possible moves', function () {
            const valid = validateMove(example.positions);
            expect(valid).to.equal(example.valid);
        });

    })

});

describe('Calc min moves', function () {

    it('should calc min moves for example', function () {
        const positions = [
            [],
            ['E', 'HM', 'LM'],
            ['HG'],
            ['LG'],
            [],
        ];
        const minMoves = calcMinMoves(positions, 0, undefined, []);
        expect(minMoves).to.equal(11);
    });

});
