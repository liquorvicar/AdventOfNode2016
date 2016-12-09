'use strict';

export const decompress = (input: string): string => {
    let decompressed = "";
    let marker = "";
    let inMarker = false;
    let i = 0;
    while (i < input.length) {
        let letter = input[i];
        if (!inMarker) {
            if (letter == "(") {
                inMarker = true;
            } else {
                decompressed += letter;
            }
        } else {
            if (letter == ")") {
                let rawNumbers = marker.split("x");
                let length = parseInt(rawNumbers[0], 10);
                let repeat = parseInt(rawNumbers[1], 10);
                let sequence = "";
                for (let s = 0; s < length; s++) {
                    sequence += input[i+1+s];
                }
                for (let r = 0; r < repeat; r++) {
                    decompressed += sequence;
                }
                marker = "";
                inMarker = false;
                i = i + length;
            } else {
                marker += letter;
            }
        }
        i++;
    }
    return decompressed;
};
