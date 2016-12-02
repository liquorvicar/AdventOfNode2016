'use strict';

const keyPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

export function locateButton(instructions: string, startAt?: number): number {
    let row;
    let col;
    startAt = startAt || 5;
    keyPad.some((thisRow, rowNum) => {
        col = thisRow.indexOf(startAt);
        if (col > -1) {
            row = rowNum;
            return true;
        }
    });
    for (let instruction of instructions) {
        switch (instruction) {
            case 'U':
                row = row == 0 ? 0 : row - 1;
                break;
            case  'L':
                col = col == 0 ? 0 : col - 1;
                break;
            case  'R':
                col = col == 2 ? 2 : col + 1;
                break;
            case 'D':
                row = row == 2 ? 2 : row + 1;
                break;
        }
    }
    return keyPad[row][col];
}