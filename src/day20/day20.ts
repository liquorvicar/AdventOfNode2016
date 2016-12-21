'use strict';

interface Rule {
    min: number;
    max: number;
}

export const findLowestUnblocked = (rawRules: string[]): number => {
    let rules: Rule[] = [];
    rawRules.forEach((rawRule) => {
        let parts = rawRule.match(/([0-9]+)-([0-9]+)/);
        rules.push({ min: parseInt(parts[1], 10), max: parseInt(parts[2], 10)});
    });
    rules = rules.sort((ruleA, ruleB) => {
        if (ruleA.min < ruleB.min) {
            return -1;
        } else {
            return 1;
        }
    });
    let ip = 0;
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].min > ip) {
            return ip;
        } else if (rules[i].max > ip) {
            ip = rules[i].max + 1;
        }
    }
    return -1;
};
