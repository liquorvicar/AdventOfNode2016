'use strict';

export const elephantParty = (numElves: number): number => {
    let nextElf = 0;
    let presents: number[] = [];
    for (let i = 0; i < numElves; i++) {
        presents.push(1);
    }
    let finished: boolean;
    let thisElf: number;
    while (true) {
        thisElf = nextElf;
        if (presents[thisElf] === numElves) {
            return thisElf + 1;
        }
        nextElf = (nextElf + 1) % numElves;
        if (presents[thisElf] === 0) {
            continue;
        }
        finished = false;
        while (!finished) {
            if (presents[nextElf] > 0) {
                presents[thisElf] += presents[nextElf];
                presents[nextElf] = 0;
                finished = true;
            } else {
                nextElf = (nextElf + 1) % numElves;
            }
        }
        console.log(thisElf);
    }
};
