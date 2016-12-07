'use strict';

export const containsABBA = (input: string): boolean => {
    for (let i = 0; i <= input.length - 4; i++) {
        if (input[i] === input[i+3] && input[i+1] === input[i+2] && input[i] !== input[i+1]) {
            return true;
        }
    }
    return false;
};

export const findHypernets = (input: string): string[] => {
    const hypernets = input.match(/(\[[a-z]+\])+/g);
    return hypernets || [];
};

export const supportsTLS = (ip: string): boolean => {
    return (containsABBA(ip) && findHypernets(ip).every((hypernet) => !containsABBA(hypernet)));
};
