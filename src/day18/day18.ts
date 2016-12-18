'use strict';

export const getNextRow = (previous: string): string => {
    let next = '';
    for (let i = 0; i < previous.length; i++) {
        let left = i === 0 ? '.' : previous[i-1];
        let centre = previous[i];
        let right = i === (previous.length - 1) ? '.' : previous[i+1];
        if (left === centre && centre !== right) {
            next += '^';
        } else if (left !== centre && centre === right) {
            next += '^';
        } else {
            next += '.';
        }
    }
    return next;
};

export const countSafe = (first: string, numRows: number): number => {
    let rows = [];
    rows.push(first);
    let previous = first;
    for (let i = 1; i < numRows; i++) {
        let next = getNextRow(previous);
        rows.push(next);
        previous = next;
    }
    return rows.reduce((count, row) => {
        let rowCount = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] == '.') {
                rowCount += 1;
            }
        }
        return count + rowCount;
    }, 0);
};
