'use strict';

import {expect} from "chai";
import {elephantParty} from "../../src/day19/day19";

describe('Elephant presents', function () {

    it('should be #2 that gets all the presents with 10 Elves', function () {
        expect(elephantParty(81)).to.equal(81);
    });
});