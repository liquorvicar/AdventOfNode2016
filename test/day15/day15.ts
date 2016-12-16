'use strict';

import {expect} from "chai";
import {Disc, pressButton} from "../../src/day15/day15";

describe('Disc', function () {

    it('should know it is in position for the capsule to fall', function () {
       let disc = new Disc(0, 4);
       expect(disc.isAligned()).to.equal(true);
    });

    it('should know it is not in position for the capsule to fall', function () {
       let disc = new Disc(1, 4);
       expect(disc.isAligned()).to.equal(false);
    });

    it('should move position every second', function () {
        let disc = new Disc(0, 4);
        expect(disc.isAligned()).to.equal(true);
        disc.move();
        expect(disc.isAligned()).to.equal(false);
    });

    it('should rotate back to original position', function () {
        let disc = new Disc(3, 4);
        expect(disc.isAligned()).to.equal(false);
        disc.move();
        expect(disc.isAligned()).to.equal(true);
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