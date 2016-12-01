'use strict';

import {expect} from "chai";
import {Person, movePerson} from "../../src/day1/day1";

describe('Day 1', () => {

    it('should count 5 blocks for R2, L3', () => {
        let person = new Person(0, 0);
        person = person.turn('R').move(2);
        person = person.turn('L').move(3);
        expect(person.hasTravelled()).to.equal(5);
    });

    it('should count 2 blocks for R2, R2, R2', () => {
        let person = new Person(0, 0);
        person = person.turn('R').move(2);
        person = person.turn('R').move(2);
        person = person.turn('R').move(2);
        expect(person.hasTravelled()).to.equal(2);
    });

    it('should count 12 blocks for R10', () => {
        const distance = movePerson('R10');
        expect(distance).to.equal(10);
    });

    it('should count 12 blocks for R5, L5, R5, R3', () => {
        const distance = movePerson('R5, L5, R5, R3');
        expect(distance).to.equal(12);
    });
});
