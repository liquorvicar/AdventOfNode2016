'use strict';

export interface Cubicle {
    x: number;
    y: number;
}

export class Floorplan {
    private favourite: number;
    private cubicles: string[];

    constructor(favourite: number) {
        this.favourite = favourite;
    }

    public getNext(current: Cubicle): Cubicle[] {
        let possibles: Cubicle[] = [];
        if (current.x > 0) {
            possibles.push({x: current.x - 1, y: current.y});
        }
        if (current.y > 0) {
            possibles.push({x: current.x, y: current.y - 1});
        }
        possibles.push({x: current.x, y: current.y + 1});
        possibles.push({x: current.x + 1, y: current.y});
        return possibles.filter((cubicle => this.isSpace(cubicle)));
    }

    private isSpace(cubicle: Cubicle): boolean {
        // x*x + 3*x + 2*x*y + y + y*y
        let magicNumber = (cubicle.x * cubicle.x) + (3 * cubicle.x);
        magicNumber += (2 * cubicle.x * cubicle.y) + cubicle.y;
        magicNumber += (cubicle.y * cubicle.y) + this.favourite;
        let bits = countBits(magicNumber);
        return (bits % 2) === 0;
    }
}

export function countBits(magicNumber: number): number {
    if (magicNumber < 2) {
        return 0;
    }
    let factor = 2;
    while (factor <= (magicNumber / 2)) {
        factor = factor * 2;
    }
    return 1 + countBits(magicNumber - factor);
}

export function shortestRoute(start: Cubicle, destination: Cubicle, floorplan: Floorplan, moves: string[], minMoves: number): number {
    if (start.x === destination.x && start.y === destination.y) {
        if (minMoves === 0 || moves.length < minMoves) {
            return moves.length;
        } else {
            return minMoves;
        }
    }
    if (minMoves > 0 && moves.length > minMoves) {
        return minMoves;
    }
    let nextMoves = floorplan.getNext(start).filter((move) => {
        return (moves.indexOf(`${move.x}-${move.y}`) < 0);
    });
    nextMoves.forEach((nextMove) => {
        console.log(start, nextMove);
        let newMoves = JSON.parse(JSON.stringify(moves));
        newMoves.push(`${nextMove.x}-${nextMove.y}`);
        minMoves = shortestRoute(nextMove, destination, floorplan, newMoves, minMoves);
    });
    return minMoves;
};

export function distinctLocations(start: Cubicle, floorplan: Floorplan, moves: string[], totalMoves: string[]): string[] {
    if (moves.length === 50) {
        moves.forEach((move) => {
            if (totalMoves.indexOf(move) < 0) {
                totalMoves.push(move);
            }
        });
        return totalMoves;
    }
    let nextMoves = floorplan.getNext(start).filter((move) => {
        return (moves.indexOf(`${move.x}-${move.y}`) < 0);
    });
    if (nextMoves.length === 0) {
        moves.forEach((move) => {
            if (totalMoves.indexOf(move) < 0) {
                totalMoves.push(move);
            }
        });
        return totalMoves;
    }
    nextMoves.forEach((nextMove) => {
        let newMoves = JSON.parse(JSON.stringify(moves));
        newMoves.push(`${nextMove.x}-${nextMove.y}`);
        totalMoves = distinctLocations(nextMove, floorplan, newMoves, totalMoves);
    });
    return totalMoves;
};
