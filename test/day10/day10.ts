'use strict';

import {expect} from "chai";
import {parseInstructions, processInstructions} from "../../src/day10/day10";

describe('Parsing instructions', function () {

    it('should parse the initial instructions', function () {
        const input = [
           "value 5 goes to bot 2",
           "bot 2 gives low to bot 1 and high to bot 0",
           "value 3 goes to bot 1",
           "bot 1 gives low to output 1 and high to bot 0",
           "bot 0 gives low to output 2 and high to output 0",
           "value 2 goes to bot 2",
        ];
        const instructions = parseInstructions(input);
        expect(instructions.length).to.equal(input.length);
        expect(instructions[0]).to.deep.equal({ bot: 2, value: 5, processed: false});
        expect(instructions[1]).to.deep.equal({ bot: 2, low: { type: "bot", id: 1}, high: { type: "bot", id: 0}, processed: false});
        expect(instructions[2]).to.deep.equal({ bot: 1, value: 3, processed: false});
        expect(instructions[3]).to.deep.equal({ bot: 1, low: { type: "output", id: 1}, high: { type: "bot", id: 0}, processed: false});
        expect(instructions[4]).to.deep.equal({ bot: 0, low: { type: "output", id: 2}, high: { type: "output", id: 0}, processed: false});
        expect(instructions[5]).to.deep.equal({ bot: 2, value: 2, processed: false});
    });
});

describe('Processing instructions', function () {

    it('should process the initial instructions', function () {
        const instructions = [
            { bot: 2, value: 5, processed: false},
            { bot: 2, low: { type: "bot", id: 1}, high: { type: "bot", id: 0}, processed: false},
            { bot: 1, value: 3, processed: false},
            { bot: 1, low: { type: "output", id: 1}, high: { type: "bot", id: 0}, processed: false},
            { bot: 0, low: { type: "output", id: 2}, high: { type: "output", id: 0}, processed: false},
            { bot: 2, value: 2, processed: false},
        ];
        const bins = processInstructions(instructions, []).bins;
        expect(bins.length).to.equal(3);
        expect(bins[0][0]).to.equal(5);
        expect(bins[1][0]).to.equal(2);
        expect(bins[2][0]).to.equal(3);
    });
});

describe('Finding bot which makes comparison', function () {
    it('should find the bot that makes the comparison between 2 and 5', function () {
        const instructions = [
            { bot: 2, value: 5, processed: false},
            { bot: 2, low: { type: "bot", id: 1}, high: { type: "bot", id: 0}, processed: false},
            { bot: 1, value: 3, processed: false},
            { bot: 1, low: { type: "output", id: 1}, high: { type: "bot", id: 0}, processed: false},
            { bot: 0, low: { type: "output", id: 2}, high: { type: "output", id: 0}, processed: false},
            { bot: 2, value: 2, processed: false},
        ];
        const result = processInstructions(instructions, [2, 5]);
        expect(result.bot).to.equal(2);
    })
});
