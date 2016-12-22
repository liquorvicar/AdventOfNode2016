'use strict';

import {expect} from "chai";
import {swapPosition, swapLetters, rotate, rotateOnIndex, reverseLetters, moveLetter, transform, parseSteps} from "../../src/day21/day21";

describe('Swap positions', function () {

    it('should swap position 0 with position 3', function () {
        expect(swapPosition('abcd', 0, 3)).to.equal('dbca');
    });

});

describe('Swap letters', function () {

    it('should swap letters A and Z', function () {
        expect(swapLetters('ABCDZ', 'A', 'Z')).to.equal('ZBCDA');
    });

});

describe('Rotate string', function () {

    it('should rotate the string left by 2 chars', function () {
        expect(rotate('abcde', 'left', 2)).to.equal('cdeab');
    });

    it('should rotate the string right by 2 chars', function () {
        expect(rotate('abcde', 'right', 2)).to.equal('deabc');
    });

});

describe('Rotate based on index', function () {

    it('should rotate abdec based on b', function () {
        expect(rotateOnIndex('abdec', 'b'))  ;
    });

});

describe('Reverse positions', function () {

    it('should reverse letters 2 through 4', function () {
        expect(reverseLetters('abcde', 2, 4)).to.equal('abedc');
    });

});

describe('Move letter', function () {

    it('should move letter at pos 4 to pos 2', function () {
        expect(moveLetter('abcde', 4, 2)).to.equal('abecd');
    });

    it('should move letter at pos 1 to pos 4', function () {
        expect(moveLetter('abcde', 1, 4)).to.equal('acdeb');
    });

});

describe('End to end test', function () {

    it('should transform abcde to decab', function () {
        const steps = [
            function (input: string): string {
                return swapPosition(input, 4, 0);
            },
            function (input: string): string {
                return swapLetters(input, 'd', 'b');
            },
            function (input: string): string {
                return reverseLetters(input, 0, 4);
            },
            function (input: string): string {
                return rotate(input, 'left', 1);
            },
            function (input: string): string {
                return moveLetter(input, 1, 4);
            },
            function (input: string): string {
                return moveLetter(input, 3, 0);
            },
            function (input: string): string {
                return rotateOnIndex(input, 'b');
            },
            function (input: string): string {
                return rotateOnIndex(input, 'd');
            },
        ];
        expect(transform('abcde', steps)).to.equal('decab');
    });

});

describe('Parse steps', function () {

    it('should parse a step', function () {
        const rawSteps = [
            'swap position 0, with position 1',
            'rotate based on position of letter a',
            'swap letter g with letter d',
            'move position 1 to position 5',
            'reverse positions 6 through 7',
            'rotate right 2 steps',
        ];
        expect(parseSteps(rawSteps).length).to.equal(6);
    });

});