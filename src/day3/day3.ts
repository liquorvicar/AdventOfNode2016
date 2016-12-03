'use strict';


export const isTriangle = (sides: number[]): boolean => {
    let result: boolean = true;
    sides.forEach((firstSide, firstSideIndex) => {
        let sum = 0;
        sides.forEach((otherSide, otherSideIndex) => {
            if (otherSideIndex != firstSideIndex) {
                sum += otherSide;
            }
        });
        if (sum <= firstSide) {
            result = false;
        }
    });
    return result;
};
