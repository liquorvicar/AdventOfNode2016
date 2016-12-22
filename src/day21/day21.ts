'use strict';

export const swapPosition = (input: string, first: number, second: number): string => {
    let output = input.split('');
    output[second] = input[first];
    output[first] = input[second];
    return output.join('');
};

export const swapLetters = (input: string, first: string, second: string): string => {
    let output = input;
    output = output.replace(first, '+');
    output = output.replace(second, first);
    output = output.replace('+', second);
    return output;
};

export const rotate = (input: string, direction: string, offset: number): string => {
    offset = offset % input.length;
    if (offset === 0) {
        return input;
    }
    let output = '';
    let char: number;
    if (direction === 'left') {
        char = offset;
    } else {
        char = input.length - offset;
    }
    while (output.length < input.length) {
        output += input[char];
        char++;
        if (char === input.length) {
            char = 0;
        }
    }
    return output;
};

export const rotateOnIndex = (input: string, letter: string): string => {
    let index = input.indexOf(letter);
    let offset = (index >= 4) ? index + 1 : index;
    offset += 1;
    return rotate(input, 'right', offset);
};

export const reverseLetters = (input: string, start: number, end: number): string => {
    let toReverse = input.substr(start, end - start + 1);
    let output = input.substr(0, start);
    for (let i = toReverse.length - 1; i >=0; i--) {
        output += toReverse[i];
    }
    output += input.substr(end + 1);
    return output;
};

export const moveLetter = (input: string, source: number, target: number): string => {
    let sourceRemoved = input.split('');
    let movedLetter = sourceRemoved.splice(source, 1);
    let output = '';
    for (let i = 0; i < sourceRemoved.length; i++) {
        if (i === target) {
            output += movedLetter;
        }
        output += sourceRemoved[i];
    }
    if (target >= sourceRemoved.length) {
        output += movedLetter;
    }
    return output;
};

export const transform = (input: string, steps: any[]): string => {
    return steps.reduce((output, step) => {
        output = step(output);
        return output;
    }, input);
};

export const parseSteps = (rawSteps: string[]): any[] => {
    let steps = [];
    rawSteps.forEach((rawStep) => {
        let parts = [];
        if (rawStep.indexOf('swap position') === 0) {
            parts = rawStep.match(/swap position ([0-9]) with position ([0-9])/);
            steps.push(function (input: string): string {
                console.log('Swap position', input, parts[1], parts[2]);
                return swapPosition(input, parseInt(parts[1], 10), parseInt(parts[2], 10));
            })
        } else if (rawStep.indexOf('rotate based') === 0) {
            parts = rawStep.match(/^rotate based on position of letter ([a-z]+)$/);
            steps.push(function (input: string): string {
                console.log('Rotate on index', input, parts[1]);
                return rotateOnIndex(input, parts[1]);
            })
        } else if (rawStep.indexOf('swap letter') === 0) {
            parts = rawStep.match(/swap letter ([a-z]) with letter ([a-z])/);
            steps.push(function (input: string): string {
                console.log('Swap letter', input, parts[1], parts[2]);
                return swapLetters(input, parts[1], parts[2]);
            })
        } else if (rawStep.indexOf('move position') === 0) {
            parts = rawStep.match(/move position ([0-9]) to position ([0-9])/);
            steps.push(function (input: string): string {
                console.log('Move position', input, parts[1], parts[2]);
                return moveLetter(input, parseInt(parts[1], 10), parseInt(parts[2], 10));
            })
        } else if (rawStep.indexOf('reverse positions') === 0) {
            parts = rawStep.match(/reverse positions ([0-9]) through ([0-9])/);
            steps.push(function (input: string): string {
                console.log('Reverse positions', input, parts[1], parts[2]);
                return reverseLetters(input, parseInt(parts[1], 10), parseInt(parts[2], 10));
            })
        } else if (rawStep.indexOf('rotate') === 0) {
            parts = rawStep.match(/rotate (right|left) ([0-9]) step/);
            steps.push(function (input: string): string {
                console.log('Rotate', input, parts[1], parts[2]);
                return rotate(input, parts[1], parseInt(parts[2], 10));
            })
        }
    });
    return steps;
};
