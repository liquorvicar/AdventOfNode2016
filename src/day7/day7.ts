'use strict';

export interface IPParts {
    supernets: string;
    hypernets: string;
}

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

export const parseIP = (ip: string): IPParts => {
    let supernets: string[] = [];
    let hypernets: string[] = [];
    let currentNet: string = "";
    for (let letter of ip) {
        if (letter == '[') {
            supernets.push(currentNet);
            currentNet = "";
        } else if (letter == ']') {
            hypernets.push(currentNet);
            currentNet = "";
        } else {
            currentNet += letter;
        }
    }
    if (currentNet.length > 0) {
        supernets.push(currentNet);
    }
    return <IPParts>{ supernets: supernets.join('.'), hypernets: hypernets.join('.') };
};

export const findABAs = (input: string): string[] => {
    let ABAs: string[] = [];
    for (let i = 0; i <= input.length - 3; i++) {
        if (input[i] === input[i+2] && input[i] !== input[i+1]) {
            ABAs.push(input[i] + input[i+1] + input[i+2]);
        }
    }
    return ABAs;
};

export const supportsSSL = (ip: IPParts): boolean => {
    let ABAs: string[] = findABAs(ip.supernets);
    return ABAs.some((ABA) => {
        let BAB = ABA[1] + ABA[0] + ABA[1];
        return (ip.hypernets.indexOf(BAB) >= 0);
    });
};
