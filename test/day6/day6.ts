'use strict';

import {expect} from "chai";
import {recoverMessage} from "../../src/day6/day6";

describe('Recover data', function () {

    it('should recover easter from the example data', function () {
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
        expect(recoverMessage(messages)).to.equal("easter");
    });

});
