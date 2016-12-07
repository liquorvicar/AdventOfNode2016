'use strict';

import {expect} from "chai";
import {containsABBA, findHypernets, supportsTLS, parseIP, findABAs, supportsSSL} from "../../src/day7/day7";

describe('String contains ABBA', () => {

    const examples = [
        {string: "abba", result: true},
        {string: "abbax", result: true},
        {string: "axyyx", result: true},
        {string: "abbcddddeffexyz", result: true},
        {string: "abbcddddefexyz", result: false},
        {string: "ioxxoj[asdfgh]zxcvbn", result: true},
    ];

    examples.forEach((example) => {
        it(`should detect whether the string ${example.string} contains an ABBA`, function () {
            expect(containsABBA(example.string)).to.equal(example.result);
        });
    });

});

describe('Find hypernets', () => {

    it('should find no hypernet in a simple string', function () {
        const hypernets = findHypernets('qrst');
        expect(hypernets.length).to.equal(0);
    });

    it('should find a single hypernet', function () {
        const hypernets = findHypernets('abba[mnop]qrst');
        expect(hypernets.length).to.equal(1);
        expect(hypernets[0]).to.equal('[mnop]');
    });

    it('should find multiple hypernets', function () {
        const hypernets = findHypernets('abba[mnop]q[rst]xyz');
        expect(hypernets.length).to.equal(2);
        expect(hypernets[0]).to.equal('[mnop]');
        expect(hypernets[1]).to.equal('[rst]');
    });

});

describe('IP supports TLS', () => {
    const examples = [
        { ip: "abba[mnop]qrst", tls: true },
        { ip: "abcd[bddb]xyyx", tls: false },
        { ip: "aaaa[qwer]tyui", tls: false },
        { ip: "ioxxoj[asdfgh]zxcvbn", tls: true },
    ];

    examples.forEach((example) => {
        it(`should say if ${example.ip} supports TLS`, function () {
            expect(supportsTLS(example.ip)).to.equal(example.tls);
        })
    })
});

describe('Parse IPs', () => {
    const examples = [
        { ip: "abba[mnop]qrst", supernets: "abba.qrst", hypernets: "mnop" },
        { ip: "abba[mnop]q[rst]xyz", supernets: "abba.q.xyz", hypernets: "mnop.rst"  },
        { ip: "aaaa[qwer]", supernets: "aaaa", hypernets: "qwer"  },
    ];

    examples.forEach((example) => {
        it(`should be able to parse ${example.ip}`, function () {
        const parts = parseIP(example.ip);
        expect(parts.supernets).to.equal(example.supernets);
        expect(parts.hypernets).to.equal(example.hypernets);
        });
    })

});

describe('Find ABAs in string', () => {
    const examples = [
        { string: "abba", aba: []},
        { string: "aba", aba: ["bab"]},
        { string: "abcde", aba: []},
        { string: "abada", aba: ["aba", "ada"]},
    ];

    examples.forEach((example) => {
        it(`should find the ABAs in string ${example.string}`, function () {
            expect(findABAs(example.string).length).to.deep.equal(example.aba.length);
        })
    })
});

describe('IP supports ssl', () => {
    const examples = [
        { ip: "aba[bab]xyz", supports: true },
        { ip: "xyx[xyx]xyx", supports: false },
        { ip: "aaa[kek]eke", supports: true },
        { ip: "zazbz[bzb]cdb", supports: true },
    ];

    examples.forEach((example) => {
        it(`should check if the ip ${example.ip} supports SSL`, function () {
            const ip = parseIP(example.ip);
            expect(supportsSSL(ip)).to.equal(example.supports);
        });
    })
});
