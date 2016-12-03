'use strict';

import {expect} from "chai";
import {isTriangle} from "../../src/day3/day3";

describe('Triangle checker', () => {

    it('should return false given an invalid triangle', () => {
       const result = isTriangle([5, 10, 25]);
       expect(result).to.be.false;
    });

    it('should return true given a valid triangle', () => {
       const result = isTriangle([5, 10, 12]);
       expect(result).to.be.true;
    });

});
