'use strict';

import {expect} from "chai";
import {makeGrid, rect, column, row} from "../../src/day8/day8";

describe('Grid comands', function () {

    it('should turn on a 3x2 rectangle', function () {
        let grid: string[][] = makeGrid(7, 3);

        grid = rect(grid, 3, 2);
        expect(grid[0][0]).to.equal("#");
        expect(grid[0][1]).to.equal("#");
        expect(grid[0][2]).to.equal("#");
        expect(grid[0][3]).to.equal(".");
        expect(grid[1][0]).to.equal("#");
        expect(grid[1][1]).to.equal("#");
        expect(grid[1][2]).to.equal("#");
        expect(grid[1][3]).to.equal(".");
        expect(grid[2][0]).to.equal(".");
        expect(grid[2][1]).to.equal(".");
        expect(grid[2][2]).to.equal(".");
        expect(grid[2][3]).to.equal(".");
    });

    it('should rotate a column', function () {
        let grid: string[][] = makeGrid(7, 3);

        grid = rect(grid, 3, 2);
        grid = column(grid, 1, 1);
        expect(grid[0][0]).to.equal("#");
        expect(grid[0][1]).to.equal(".");
        expect(grid[0][2]).to.equal("#");
        expect(grid[0][3]).to.equal(".");
        expect(grid[1][0]).to.equal("#");
        expect(grid[1][1]).to.equal("#");
        expect(grid[1][2]).to.equal("#");
        expect(grid[1][3]).to.equal(".");
        expect(grid[2][0]).to.equal(".");
        expect(grid[2][1]).to.equal("#");
        expect(grid[2][2]).to.equal(".");
        expect(grid[2][3]).to.equal(".");
    });

    it('should rotate a row', function () {
        let grid: string[][] = makeGrid(7, 3);

        grid = rect(grid, 3, 2);
        grid = column(grid, 1, 1);
        grid = row(grid, 0, 4);
        expect(grid[0][0]).to.equal(".");
        expect(grid[0][1]).to.equal(".");
        expect(grid[0][2]).to.equal(".");
        expect(grid[0][3]).to.equal(".");
        expect(grid[0][4]).to.equal("#");
        expect(grid[0][5]).to.equal(".");
        expect(grid[0][6]).to.equal("#");
        expect(grid[1][0]).to.equal("#");
        expect(grid[1][1]).to.equal("#");
        expect(grid[1][2]).to.equal("#");
        expect(grid[1][3]).to.equal(".");
        expect(grid[2][0]).to.equal(".");
        expect(grid[2][1]).to.equal("#");
        expect(grid[2][2]).to.equal(".");
        expect(grid[2][3]).to.equal(".");
    });

    it('should rotate a column again', function () {
        let grid: string[][] = makeGrid(7, 3);

        grid = rect(grid, 3, 2);
        grid = column(grid, 1, 1);
        grid = row(grid, 0, 4);
        grid = column(grid, 1, 1);
        expect(grid[0][0]).to.equal(".");
        expect(grid[0][1]).to.equal("#");
        expect(grid[0][2]).to.equal(".");
        expect(grid[0][3]).to.equal(".");
        expect(grid[0][4]).to.equal("#");
        expect(grid[0][5]).to.equal(".");
        expect(grid[0][6]).to.equal("#");
        expect(grid[1][0]).to.equal("#");
        expect(grid[1][1]).to.equal(".");
        expect(grid[1][2]).to.equal("#");
        expect(grid[1][3]).to.equal(".");
        expect(grid[2][0]).to.equal(".");
        expect(grid[2][1]).to.equal("#");
        expect(grid[2][2]).to.equal(".");
        expect(grid[2][3]).to.equal(".");
    });

});
