'use strict';

import {expect} from "chai";
import {recoverMessage, recoverMessageModified} from "../../src/day6/day6";

describe('Recover data', function () {
    const messages = [
        "eedadn",
        "drvtee",
        "eandsr",
        "raavrd",
        "atevrs",
        "tsrnev",
        "sdttsa",
        "rasrtv",
        "nssdts",
        "ntnada",
        "svetve",
        "tesnvt",
        "vntsnd",
        "vrdear",
        "dvrsen",
        "enarar",
    ];

    it('should recover easter from the example data', function () {
        expect(recoverMessage(messages)).to.equal("easter");
    });

    it('should receover advent when using modified repetition', function () {
        expect(recoverMessageModified(messages)).to.equal("advent");
    });

});
