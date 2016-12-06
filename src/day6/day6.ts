'use strict';
import {countLettersInString} from "../day4/day4";

export const recoverMessage = (messages: string[]): string => {
    let letters: string[] = [];
    messages.forEach((message) => {
        for (let i = 0; i < message.length; i++) {
            if (!letters[i]) {
                letters[i] = '';
            }
            letters[i] += message[i];
        }
    });
    let string = letters.reduce((string, letter) => {
        return string + countLettersInString(letter)[0].letter;
    }, '');
    return string;
};
