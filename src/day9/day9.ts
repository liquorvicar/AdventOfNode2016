'use strict';

export const decompress = (input: string): number => {
    let decompressed = 0;
    let marker = "";
    let inMarker = false;
    let i = 0;
    while (i < input.length) {
        let letter = input[i];
        if (!inMarker) {
            if (letter == "(") {
                inMarker = true;
            } else {
                decompressed += 1;
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
                decompressed += (decompress(sequence) * repeat);
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
