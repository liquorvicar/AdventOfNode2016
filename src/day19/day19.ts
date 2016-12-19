'use strict';

interface Elf {
    id: number;
    presents: number;
}

export const elephantParty = (numElves: number): number => {
    let thisElf = 0;
    let presents: Elf[] = [];
    for (let i = 1; i <= numElves; i++) {
        presents.push({ id: i, presents: 1 });
    }
    let offset: number;
    while (true) {
        if (presents[thisElf]) {
            if (presents[thisElf].presents === numElves) {
                return presents[thisElf].id;
            }
            offset = Math.floor(presents.length / 2);
            let targetElf = (thisElf + offset) % presents.length;
            presents[thisElf].presents += presents[targetElf].presents;
            presents = presents.slice(0, targetElf - 1).concat(presents.slice(targetElf + 1));
        }
        thisElf = (thisElf + 1);
        if (thisElf > presents.length) {
            thisElf = 0;
        }
        console.log(presents.length);
    }
};
