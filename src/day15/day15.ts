'use strict';

export class Disc {
    private position: number;
    private numPositions: number;

    constructor(position: number, numPositions: number) {
        this.position = position;
        this.numPositions = numPositions;
    }

    public isAligned(time: number): boolean {
        let firstAlignment = this.position === 0 ? this.position : this.numPositions - this.position;
        if (firstAlignment > time) {
            return false;
        }
        let isAligned = ((time - firstAlignment) % this.numPositions === 0);
        return isAligned;
    }

    public nextAlignment(count: number): number {
        let firstAlignment = this.position === 0 ? this.position : this.numPositions - this.position;
        while (firstAlignment < count) {
            firstAlignment += this.numPositions;
        }
        return firstAlignment;
    }
}

export const pressButton = (discs: Disc[], startTime: number): boolean => {
    let aligned = true;
    for (let i = 0; i < discs.length; i++) {
        if (!discs[i].isAligned(startTime + i + 1)) {
            aligned = false;
        }
    }
    return aligned;
};
