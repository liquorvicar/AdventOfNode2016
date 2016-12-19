'use strict';

import {expect} from "chai";
import {elephantParty} from "../../src/day19/day19";

describe('Elephant presents', function () {

    it('should be #3 that gets all the presents with 5 Elves', function () {
        expect(elephantParty(5)).to.equal(2);
    });
});