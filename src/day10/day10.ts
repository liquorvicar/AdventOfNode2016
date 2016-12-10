'use strict';

interface Instruction {
    bot: number;
    processed: boolean;
    value?: number;
    low?: Destination;
    high?: Destination;
}

interface Destination {
    type: string;
    id: number;
}

interface ProcessResult {
    bins: number[][];
    bot: number;
}

export const parseInstructions = (input: string[]): Instruction[] => {
    return input.map((rawInstruction) => {
        let parts = rawInstruction.split(' ');
        let instruction: Instruction;
        if (parts[0] == 'value') {
            instruction = {
                bot: parseInt(parts[5], 10),
                value: parseInt(parts[1], 10),
                processed: false
            }
        } else if (parts[0] == 'bot') {
            instruction = {
                bot: parseInt(parts[1], 10),
                low: <Destination>{
                    type: parts[5],
                    id: parseInt(parts[6], 10)
                },
                high: <Destination>{
                    type: parts[10],
                    id: parseInt(parts[11], 10)
                },
                processed: false
            }
        }
        return instruction;
    });
};

const assignToBot = (bots: number[][], bot: number, value: number): number[][] => {
    if (!bots[bot]) {
        bots[bot] = [];
    }
    bots[bot].push(value);
    return bots;
};

const assignToBin = (bins: number[][], bin: number, value: number): number[][] => {
    if (!bins[bin]) {
        bins[bin] = [];
    }
    bins[bin].push(value);
    return bins;
};

export const processInstructions = (instructions: Instruction[], valuesToCompare: number[]): ProcessResult => {
    let bots: number[][] = [];
    let bins: number[][] = [];
    let result = <ProcessResult>{ bins: [], bot: -1};
    instructions.forEach((instruction) => {
        if (instruction.value) {
            bots = assignToBot(bots, instruction.bot, instruction.value);
        }
    });
    let isProcessing = true;
    while (isProcessing) {
        isProcessing = instructions.some((instruction) => {
            if (instruction.low && bots[instruction.bot] && bots[instruction.bot].length == 2 && !instruction.processed) {
                let values = bots[instruction.bot].sort(function (a, b) {
                    return a - b;
                });
                if (values[0] === valuesToCompare[0] && values[1] === valuesToCompare[1]) {
                    result.bot = instruction.bot;
                }
                if (instruction.low.type == "bot") {
                    bots = assignToBot(bots, instruction.low.id, values[0]);
                } else {
                    bins = assignToBin(bins, instruction.low.id, values[0]);
                }
                if (instruction.high.type == "bot") {
                    bots = assignToBot(bots, instruction.high.id, values[1]);
                } else {
                    bins = assignToBin(bins, instruction.high.id, values[1]);
                }
                instruction.processed = true;
                return true;
            }
        });
    }
    result.bins = bins;
    return result;
};
