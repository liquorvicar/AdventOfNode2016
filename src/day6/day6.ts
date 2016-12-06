'use strict';
import {countLettersInString} from "../day4/day4";

const groupLetters = (messages: string[]): string[] => {
    let letters: string[] = [];
    messages.forEach((message) => {
        for (let i = 0; i < message.length; i++) {
            if (!letters[i]) {
                letters[i] = '';
            }
            letters[i] += message[i];
        }
    });
    return letters;
};

export const recoverMessage = (messages: string[]): string => {
    let letters = groupLetters(messages);
    let string = letters.reduce((string, letter) => {
        return string + countLettersInString(letter)[0].letter;
    }, '');
    return string;
};

export const recoverMessageModified = (messages: string[]): string => {
    let letters = groupLetters(messages);
    let string = letters.reduce((string, letter) => {
        let leastCommon = countLettersInString(letter).pop();
        return string + leastCommon.letter;
    }, '');
    return string;
};
