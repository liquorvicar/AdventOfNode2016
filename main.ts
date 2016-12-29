'use strict';
import {processInstructions} from "./src/day23/day23";

let instructions = [
    'cpy a b',
    'dec b',
    'cpy a d',
    'cpy 0 a',
    'cpy b c',
    'inc a',
    'dec c',
    'jnz c -2',
    'dec d',
    'jnz d -5',
    'dec b',
    'cpy b c',
    'cpy c d',
    'dec d',
    'inc c',
    'jnz d -2',
    'tgl c',
    'cpy -16 c',
    'jnz 1 c',
    'cpy 87 c',
    'jnz 97 d',
    'inc a',
    'inc d',
    'jnz d -2',
    'inc c',
    'jnz c -5',
];

let registers = { next: 0, a: 7, b: 0, c: 0, d: 0 };
registers = processInstructions(instructions, registers);
console.log(registers.a);
