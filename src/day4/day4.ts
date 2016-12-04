'use strict';

interface LetterCount {
    letter: string;
    count: number;
}

export const validateRoom = (room: string): number => {
    let regex = /^(([a-z]+-)+)([0-9]+)\[([a-z]+)\]$/g;
    let parts = regex.exec(room);
    let stringsToCount = parts[1];
    const sector = parseInt(parts[3], 10);
    let checksum = parts[4];
    let count: LetterCount[] = [];
    for (let letter of stringsToCount) {
        if (letter == "-") {
            continue;
        }
        let letterCount = count.find((itemCount) => {
            return itemCount.letter == letter;
        });
        if (letterCount == undefined) {
            count.push({letter: letter, count: 0});
        }
        count = count.map((countItem) => {
            if (countItem.letter == letter) {
                countItem.count++;
            }
            return countItem;
        });
    }
    count.sort((item1, item2) => {
        if (item1.count > item2.count) {
            return -1;
        }
        if (item1.count < item2.count) {
            return 1;
        }
        if (item1.letter < item2.letter) {
            return -1;
        }
        return 1;
    });
    let frequentLetters = count.reduce((checksum, countItem, i) => {
        if (i <= 4) {
            checksum += countItem.letter;
        }
        return checksum;
    }, "");
    return frequentLetters == checksum ? sector : 0;
};
