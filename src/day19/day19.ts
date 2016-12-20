'use strict';


export const elephantParty = (numElves: number): number => {
    let thisElf = 0;
    let presents: number[] = [];
    for (let i = 1; i <= numElves; i++) {
        presents.push(i);
    }
    let offset: number;
    while (true) {
        if (presents[thisElf]) {
            if (presents.length === 1) {
                return presents[0];
            }
            offset = Math.floor(presents.length / 2);
            let targetElf = (thisElf + offset) % presents.length;
            console.log(presents[thisElf], presents[targetElf]);
            presents.splice(targetElf, 1);
        }
        thisElf = (thisElf + 1);
        if (thisElf > presents.length) {
            thisElf = 0;
        }
    }
};
