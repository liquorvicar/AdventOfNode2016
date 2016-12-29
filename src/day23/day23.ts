'use strict';

export interface Registers {
    next: number;
    a: number;
    b: number;
    c: number;
    d: number;
}

let cpyRE = new RegExp(/cpy ([-0-9]+) ([a-z]+)/);
let cpyFromRegisterRE = new RegExp(/cpy ([a-z]+) ([a-z]+)/);
let incRE = new RegExp(/inc ([a-z]+)/);
let decRE = new RegExp(/dec ([a-z]+)/);
let toggleRE = new RegExp(/tgl ([a-z]+)/);
let jmpRE = new RegExp(/jnz ([a-z]+) ([-0-9]+)/);
let jmpNewRE = new RegExp(/jnz ([0-9]+) ([a-z]+)/);
let jmpStaticRE = new RegExp(/jnz ([0-9]+) ([-0-9]+)/);

export function processInstructions(instructions: string[], registers: Registers): Registers {
    while (registers.next < instructions.length) {
        let instruction = instructions[registers.next];
        let amount: number = 0;
        let register: string = 'a';
        let offset: number;
        offset = 1;
        // console.log(instruction, registers);
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
            registers[register] = 0;
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
                if (parts) {
                    register = 'a';
                    let value = parseInt(parts[1], 10);
                    offset = (value > 0) ? parseInt(parts[2], 10) : 1;
                    amount = 0;
                } else {
                    parts = jmpNewRE.exec(instruction);
                    register = 'a';
                    let value = parseInt(parts[1], 10);
                    offset = (value > 0) ? registers[parts[2]] : 1;
                    amount = 0;
                }
            }
            if (!instructions[registers.next + offset]) {
                offset = 1;
            }
        } else if (instruction.indexOf('tgl') === 0) {
            let parts = toggleRE.exec(instruction);
            if (parts) {
                register = parts[1];
                let instructionIndex = registers.next + registers[register];
                if (instructions[instructionIndex]) {
                    let oldInstruction = instructions[instructionIndex];
                    let newInstruction: string;
                    if (oldInstruction.indexOf('inc') === 0) {
                        newInstruction = oldInstruction.replace('inc', 'dec');
                    } else {
                        newInstruction = oldInstruction.replace('dec', 'inc');
                        newInstruction = newInstruction.replace('tgl', 'inc');
                    }
                    if (oldInstruction.indexOf('cpy') === 0) {
                        newInstruction = oldInstruction.replace('cpy', 'jnz');
                    } else {
                        newInstruction = newInstruction.replace('jnz', 'cpy');
                    }
                    instructions[instructionIndex] = newInstruction;
                }
            }

        }
        registers[register] += amount;
        registers.next += offset;
    }
    return registers;
}
