'use strict';

export const generateData = (input: string): string => {
    let output = [];
    for (let i = input.length - 1; i >= 0; i--) {
        output.push(input[i]);
    }
    output = output.map((char) => char === '1' ? '0' : '1');
    return input + '0' + output.join('');
};

export const calculateChecksum = (input: string): string => {
    if (input.length % 2 === 1) {
        return input;
    }
    let checksum = '';
    for (let i = 0; i < input.length; i += 2) {
        if (input[i] === input[i+1]) {
            checksum += '1';
        } else {
            checksum += '0';
        }
    }
    return calculateChecksum(checksum);
};

export const getChecksum = (input: string, length: number): string => {
    while (input.length < length) {
        input = generateData(input);
    }
    input = input.substring(0, length);
    return calculateChecksum(input);
};
