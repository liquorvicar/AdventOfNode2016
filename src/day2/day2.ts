'use strict';

const keyPad = [
    [".", ".", "1", ".", "."],
    [".", "2", "3", "4", "."],
    ["5", "6", "7", "8", "9"],
    [".", "A", "B", "C", "."],
    [".", ".", "D", ".", "."],
];

export function locateButton(instructions: string, startAt?: string): string {
    let row = 2;
    let col = 0;
    startAt = startAt || "5";
    keyPad.some((thisRow, rowNum) => {
        col = thisRow.indexOf(startAt);
        if (col > -1) {
            row = rowNum;
            return true;
        }
    });
    let oldRow: number;
    let oldCol: number;
    let button: string;
    for (let instruction of instructions) {
        oldRow = row;
        oldCol = col;
        // console.log(instruction, row, col);
        switch (instruction) {
            case 'U':
                row = row == 0 ? 0 : row - 1;
                break;
            case  'L':
                col = col == 0 ? 0 : col - 1;
                break;
            case  'R':
                col = col == 4 ? 4 : col + 1;
                break;
            case 'D':
                row = row == 4 ? 4 : row + 1;
                break;
        }
        button = keyPad[row][col];
        if (button === ".") {
            row = oldRow;
            col = oldCol;
        }
    }
    return keyPad[row][col];
}