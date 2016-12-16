'use strict';

import {expect} from "chai";
import {Disc, pressButton} from "../../src/day15/day15";

describe('Disc', function () {

    it('should know it is in position for the capsule to fall', function () {
       let disc = new Disc(0, 4);
       expect(disc.isAligned(0)).to.equal(true);
    });

    it('should know it is not in position for the capsule to fall', function () {
       let disc = new Disc(1, 4);
       expect(disc.isAligned(0)).to.equal(false);
    });

    it('should move position every second', function () {
        let disc = new Disc(0, 4);
        expect(disc.isAligned(0)).to.equal(true);
        expect(disc.isAligned(1)).to.equal(false);
    });

    it('should rotate back to original position', function () {
        let disc = new Disc(3, 4);
        expect(disc.isAligned(0)).to.equal(false);
        expect(disc.isAligned(1)).to.equal(true);
    });
});

describe('Calculating next alignment', function () {

    it('should calculate the next alignment', function () {
        let disc = new Disc(4, 5);
        expect(disc.nextAlignment(0)).to.deep.equal(1);
        expect(disc.nextAlignment(1)).to.deep.equal(1);
        expect(disc.nextAlignment(2)).to.deep.equal(6);
    });

});

describe('Find time to drop through all discs', function () {

    it('not drop through at time 0', function () {
        let discs = [
            new Disc(4, 5),
            new Disc(1, 2),
        ];
        expect(pressButton(discs, 0)).to.equal(false);
    });

    it(' drop through at time 5', function () {
        let discs = [
            new Disc(4, 5),
            new Disc(1, 2),
        ];
        expect(pressButton(discs, 5)).to.equal(true);
    });
});
