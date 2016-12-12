'use strict';

import {expect} from "chai";
import {processInstruction, processInstructions} from "../../src/day12/day12";

describe('Process single instructions', function () {

    it('should process a copy instruction', function () {
        let registers = { next: 0, a: 0, b: 0, c: 0, d: 0 };
        processInstruction('cpy 41 a', registers);
        expect(registers.a).to.equal(41);
        expect(registers.next).to.equal(1);
    });

    it('should copy one register to another', function () {
        let registers = { next: 0, a: 3, b: 0, c: 0, d: 0 };
        processInstruction('cpy a b', registers);
        expect(registers.b).to.equal(3);
        expect(registers.next).to.equal(1);
    });

    it('should process an increment instruction', function () {
        let registers = { next: 0, a: 7, b: 0, c: 0, d: 0 };
        processInstruction('inc a', registers);
        expect(registers.a).to.equal(8);
        expect(registers.next).to.equal(1);
    });

    it('should process a decrement instruction', function () {
        let registers = { next: 0, a: 7, b: 0, c: 0, d: 0 };
        processInstruction('dec a', registers);
        expect(registers.a).to.equal(6);
        expect(registers.next).to.equal(1);
    });

    it('should process a jump instruction if not zero', function () {
        let registers = { next: 0, a: 7, b: 0, c: 0, d: 0 };
        processInstruction('jnz a 2', registers);
        expect(registers.a).to.equal(7);
        expect(registers.next).to.equal(2);
    });

    it('should process a hard jump instruction if not zero', function () {
        let registers = { next: 0, a: 7, b: 0, c: 0, d: 0 };
        processInstruction('jnz 1 3', registers);
        expect(registers.a).to.equal(7);
        expect(registers.next).to.equal(3);
    });

    it('should process a negative jump instruction if not zero', function () {
        let registers = { next: 5, a: 7, b: 0, c: 0, d: 0 };
        processInstruction('jnz a -2', registers);
        expect(registers.a).to.equal(7);
        expect(registers.next).to.equal(3);
    });

    it('should not process a jump instruction if zero', function () {
        let registers = { next: 0, a: 0, b: 0, c: 0, d: 0 };
        processInstruction('jnz a 2', registers);
        expect(registers.a).to.equal(0);
        expect(registers.next).to.equal(1);
    });

});

describe('Process a series of instructions', function () {

    it('should process the example instructions', function () {
        const instructions = [
            'cpy 41 a',
            'inc a',
            'inc a',
            'dec a',
            'jnz a 2',
            'dec a',
        ];
        let registers = processInstructions(instructions, { next: 0, a: 0, b: 0, c: 0, d: 0 });
        expect(registers.a).to.equal(42);
    });

});