'use strict';

export interface Registers {
    next: number;
    a: number;
    b: number;
    c: number;
    d: number;
}

let cpyRE = new RegExp(/cpy ([0-9]+) ([a-z]+)/);
let cpyFromRegisterRE = new RegExp(/cpy ([a-z]+) ([a-z]+)/);
let incRE = new RegExp(/inc ([a-z]+)/);
let decRE = new RegExp(/dec ([a-z]+)/);
let jmpRE = new RegExp(/jnz ([a-z]+) ([-0-9]+)/);
let jmpStaticRE = new RegExp(/jnz ([0-9]+) ([-0-9]+)/);

function processInstructions(instructions: string[], registers: Registers): Registers {
    while (registers.next < instructions.length) {
        let instruction = instructions[registers.next];
        let amount: number;
        let register: string;
        let offset: number;
        offset = 1;
        console.log(registers.a);
        if (instruction.indexOf('cpy') === 0) {
            let parts = cpyRE.exec(instruction);
            if (parts) {
                amount = parseInt(parts[1], 10);
                register = parts[2];
            } else {
                parts = cpyFromRegisterRE.exec(instruction);
                amount = registers[parts[1]];
                register = parts[2];
            }
        } else if (instruction.indexOf('inc') === 0) {
            let parts = incRE.exec(instruction);
            register = parts[1];
            amount = 1;
        } else if (instruction.indexOf('dec') === 0) {
            let parts = decRE.exec(instruction);
            register = parts[1];
            amount = -1;
        } else if (instruction.indexOf('jnz') === 0) {
            let parts = jmpRE.exec(instruction);
            if (parts) {
                register = parts[1];
                offset = (registers[register] > 0) ? parseInt(parts[2], 10) : 1;``
                amount = 0;
            } else {
                parts = jmpStaticRE.exec(instruction);
                register = 'a';
                let value = parseInt(parts[1], 10);
                offset = (value > 0) ? parseInt(parts[2], 10) : 1;
                amount = 0;
            }
        }
        registers[register] += amount;
        registers.next += offset;
    }
    return registers;
}

const instructions = [
    'cpy 1 a',
    'cpy 1 b',
    'cpy 26 d',
    'jnz c 2',
    'jnz 1 5',
    'cpy 7 c',
    'inc d',
    'dec c',
    'jnz c -2',
    'cpy a c',
    'inc a',
    'dec b',
    'jnz b -2',
    'cpy c b',
    'dec d',
    'jnz d -6',
    'cpy 16 c',
    'cpy 12 d',
    'inc a',
    'dec d',
    'jnz d -2',
    'dec c',
    'jnz c -5',
];
let registers = processInstructions(instructions, { next: 0, a: 0, b: 0, c: 0, d: 0 });

console.log(registers.a);