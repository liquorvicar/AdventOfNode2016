'use strict';

export interface Registers {
    next: number;
    a: number;
    b: number;
    c: number;
    d: number;
}

export interface Instruction {
    command: string;
    offset: number;
    increment: number;
    register: string;
    source: string;
}

let cpyRE = new RegExp(/cpy ([0-9]+) ([a-z]+)/);
let cpyFromRegisterRE = new RegExp(/cpy ([a-z]+) ([a-z]+)/);
let incRE = new RegExp(/inc ([a-z]+)/);
let decRE = new RegExp(/dec ([a-z]+)/);
let jmpRE = new RegExp(/jnz ([a-z]+) ([-0-9]+)/);
let jmpStaticRE = new RegExp(/jnz ([0-9]+) ([-0-9]+)/);

function processInstructions(rawInstructions: string[], registers: Registers): Registers {
    let instructions: Instruction[] = rawInstructions.map((rawInstruction) => {
        let amount: number;
        let register: string;
        let offset: number = 1;
        let parts: any[];
        let command: string;
        let source: string = '';
        if (rawInstruction.indexOf('cpy') === 0) {
            command = 'cpy';
            parts = cpyRE.exec(rawInstruction);
            if (parts) {
                amount = parseInt(parts[1], 10);
                register = parts[2];
            } else {
                parts = cpyFromRegisterRE.exec(rawInstruction);
                amount = 0;
                source = parts[1];
                register = parts[2];
            }
        } else if (rawInstruction.indexOf('inc') === 0) {
            command = 'inc';
            parts = incRE.exec(rawInstruction);
            register = parts[1];
            amount = 1;
        } else if (rawInstruction.indexOf('dec') === 0) {
            command = 'dec';
            parts = decRE.exec(rawInstruction);
            register = parts[1];
            amount = -1;
        } else if (rawInstruction.indexOf('jnz') === 0) {
            command = 'jnz';
            parts = jmpRE.exec(rawInstruction);
            if (parts) {
                register = parts[1];
                offset = parseInt(parts[2], 10);
                amount = 0;
            } else {
                parts = jmpStaticRE.exec(rawInstruction);
                register = 'a';
                offset = parseInt(parts[2], 10);
                amount = parseInt(parts[1], 10);
            }
        }
        return <Instruction>{
            command: command,
            offset: offset,
            increment: amount,
            register: register,
            source: source
        };
    });
    console.log(instructions);

    let instruction: Instruction;
    while (registers.next < instructions.length) {
        instruction = instructions[registers.next];
        if (instruction.command === 'cpy') {
            let value = instruction.increment;
            if (instruction.source) {
                value = registers[instruction.source];
            }
            registers[instruction.register] = value;
            registers.next += instruction.offset;
        } else if (instruction.command !== 'jnz') {
            registers[instruction.register] += instruction.increment;
            registers.next += instruction.offset;
        } else {
            let value = 0;
            if (instruction.increment === 0) {
                value = registers[instruction.register];
            } else {
                value = instruction.increment;
            }
            if (value > 0) {
                registers.next += instruction.offset;
            } else {
                registers.next += 1;
            }
        }
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
let registers = processInstructions(instructions, { next: 0, a: 0, b: 0, c: 1, d: 0 });

console.log(registers.a);