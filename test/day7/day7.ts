'use strict';

import {expect} from "chai";
import {containsABBA, findHypernets, supportsTLS} from "../../src/day7/day7";

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
