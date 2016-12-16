'use strict';

export class Disc {
    private position: number;
    private numPositions: number;

    constructor(position: number, numPositions: number) {
        this.position = position;
        this.numPositions = numPositions;
    }

    public isAligned(): boolean {
        return this.position === 0;
    }

    public move(): void {
        this.position = (this.position + 1) % this.numPositions;
    }
}

export const pressButton = (discs: Disc[], startTime: number): boolean => {
    let aligned = true;
    for (let i = 0; i < startTime; i++) {
        discs.forEach((disc) => disc.move());
    }
    for (let i = 0; i < discs.length; i++) {
        discs.forEach((disc) => disc.move());
        if (!discs[i].isAligned()) {
            aligned = false;
        }
    }
    return aligned;
};
