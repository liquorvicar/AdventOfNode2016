'use strict';

export const makeGrid = (width: number, height: number): string[][] => {
    let grid = [];
    for (let row = 0; row < height; row++) {
        grid.push([]);
        for (let col = 0; col < width; col++) {
            grid[row][col] = ".";
        }
    }
    return grid;
};

export const rect = (grid: string[][], width: number, height: number): string[][] => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            newGrid[row][col] = "#";
        }
    }
    return newGrid;
};

export const column = (grid: string[][], col: number, offset: number): string[][] => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let row = 0; row < grid.length; row++) {
        let newRow = (row + offset) % grid.length;
        newGrid[newRow][col] = grid[row][col];
    }
    return newGrid;
};

export const row = (grid: string[][], row: number, offset: number): string[][] => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let col = 0; col < grid[0].length; col++) {
        let newCol = (col + offset) % grid[0].length;
        newGrid[row][newCol] = grid[row][col];
    }
    return newGrid;
};
