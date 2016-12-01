'use strict';

import {expect} from "chai";
import {Person, movePerson} from "../../src/day1/day1";

describe('Day 1', () => {

    describe('Person', () => {

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

        it('not visit same location twice during R8, R4, R4', () => {
            let person = new Person(0, 0);
            person = person.turn('R').move(8);
            person = person.turn('R').move(4);
            person = person.turn('R').move(4);
            expect(person.hasVisitedSameLocation()).to.be.false;
        });

        it('visit same location twice during R8, R4, R4, R8', () => {
            let person = new Person(0, 0);
            person = person.turn('R').move(8);
            person = person.turn('R').move(4);
            person = person.turn('R').move(4);
            person = person.turn('R').move(8);
            expect(person.hasVisitedSameLocation()).to.be.true;
        });

    });

    describe('movePerson', () => {

        it('should count 12 blocks for R10', () => {
            const distance = movePerson('R10');
            expect(distance).to.equal(10);
        });

        it('should count 12 blocks for R5, L5, R5, R3', () => {
            const distance = movePerson('R5, L5, R5, R3');
            expect(distance).to.equal(12);
        });

        it('should stop when we first visit a location twice', () => {
            const distance = movePerson('R8, R4, R4, R8, R5');
            expect(distance).to.equal(4);
        });

    });

});
