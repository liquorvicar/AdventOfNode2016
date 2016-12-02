'use strict';

import {expect} from "chai";
import {locateButton} from "../../src/day2/day2";

describe('Button finder', () => {

    const simpleTests = [
        {instructions: "U", button: 2},
        {instructions: "UU", button: 2},
        {instructions: "L", button: 4},
        {instructions: "LL", button: 4},
        {instructions: "D", button: 8},
        {instructions: "DD", button: 8},
        {instructions: "R", button: 6},
        {instructions: "RR", button: 6},
    ];

    simpleTests.forEach((test) => {
        it(`should locate button ${test.button} from instruction ${test.instructions}`, () => {
            const button = locateButton(test.instructions);
            expect(button).to.equal(test.button);
        });
    });

    const exampleTests = [
        {instructions: "ULL", button: 1, startAt: 5},
        {instructions: "RRDDD", button: 9, startAt: 1},
        {instructions: "LURDL", button: 8, startAt: 9},
        {instructions: "UUUUD", button: 5, startAt: 8},
    ];

    exampleTests.forEach((test) => {
        it(`should locate button ${test.button} from instruction ${test.instructions}`, () => {
            const button = locateButton(test.instructions, test.startAt);
            expect(button).to.equal(test.button);
        });
    });

});
