'use strict';

import {expect} from "chai";
import {processInstructions} from "../../src/day23/day23";

describe('Process a series of instructions', function () {

    it('should process the example instructions', function () {
        const instructions = [
            'cpy 2 a',
            'tgl a',
            'tgl a',
            'tgl a',
            'cpy 1 a',
            'dec a',
            'dec a',
        ];
        let registers = processInstructions(instructions, { next: 0, a: 0, b: 0, c: 0, d: 0 });
        expect(registers.a).to.equal(3);
    });

});
