'use strict';

interface Rule {
    min: number;
    max: number;
}

const parseRules = (rawRules: string[]): Rule[] => {
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
    return rules;
};

export const findLowestUnblocked = (rawRules: string[]): number => {
    let rules: Rule[] = parseRules(rawRules);
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

export const countAllUnblocked = (rawRules: string[], maxIP: number): number => {
    let rules: Rule[] = parseRules(rawRules);
    let count = 0;
    let ip = 0;
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].min > ip) {
            count += (rules[i].min - ip);
            ip = rules[i].max + 1;
            console.log(rules[i], count);
        } else if (rules[i].max >= ip) {
            ip = rules[i].max + 1;
        }
    }
    count += (maxIP - ip) + 1;
    console.log(maxIP, ip, count);
    return count;
};
