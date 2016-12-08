'use strict';

import {makeGrid, rect, row, column} from "./src/day8/day8";
import {createInterface} from "readline";
import {createReadStream} from "fs";

let lineReader = createInterface({
    input: createReadStream('./src/day8/data.txt')
});
let grid = makeGrid(50, 6);
lineReader.on('line', function (inputLine) {
    let numbers = inputLine.match(/([0-9]+)[^0-9]+([0-9]+)$/);
    numbers = [parseInt(numbers[1], 10), parseInt(numbers[2], 10)];
    if (inputLine.indexOf('rect') == 0) {
        grid = rect(grid, numbers[0], numbers[1]);
        console.log('Rect', numbers);
    } else if (inputLine.indexOf('row') == 7) {
        grid = row(grid, numbers[0], numbers[1]);
        console.log('Row', numbers);
    } else if (inputLine.indexOf('column') == 7) {
        grid = column(grid, numbers[0], numbers[1]);
        console.log('Col', numbers);
    }
}).on('close', function () {
    let count = grid.reduce((count, row) => {
        return count + row.reduce((rowCount, cell) => {
                return rowCount + (cell == '#' ? 1 : 0);
            }, 0);
    }, 0);
    console.log(count);
    grid.forEach((row) => console.log(row.join('')));
});
