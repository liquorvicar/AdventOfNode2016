'use strict';

import {expect} from "chai";
import {locateButton} from "../../src/day2/day2";

describe('Button finder', () => {

    const simpleTests = [
        {instructions: "U", button: "5"},
        {instructions: "UU", button: "5"},
        {instructions: "L", button: "5"},
        {instructions: "LL", button: "5"},
        {instructions: "D", button: "5"},
        {instructions: "DD", button: "5"},
        {instructions: "R", button: "6"},
        {instructions: "RR", button: "7"},
    ];

    simpleTests.forEach((test) => {
        it(`should locate button ${test.button} from instruction ${test.instructions}`, () => {
            const button = locateButton(test.instructions);
            expect(button).to.equal(test.button);
        });
    });

    const exampleTests = [
        {instructions: "ULL", button: "5", startAt: "5"},
        {instructions: "RRDDD", button: "D", startAt: "5"},
        {instructions: "LURDL", button: "B", startAt: "D"},
        {instructions: "UUUUD", button: "3", startAt: "B"},
    ];

    exampleTests.forEach((test) => {
        it(`should locate button ${test.button} from instruction ${test.instructions}`, () => {
            const button = locateButton(test.instructions, test.startAt);
            expect(button).to.equal(test.button);
        });
    });

});
