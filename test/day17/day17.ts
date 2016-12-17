'use strict';

import {expect} from "chai";
import {findOpenDoors, shortestPath} from "../../src/day17/day17";

describe('Find open doors', function () {

    it('should find the open doors from the starting room', function () {
        expect(findOpenDoors({ x:0, y:0 }, 'hijkl', '')).to.deep.equal(['D']);
    });

    it('should find the open doors from going down one room', function () {
        expect(findOpenDoors({ x:0, y:1 }, 'hijkl', 'D')).to.deep.equal(['U', 'R']);
    });

    it('should find the open doors from going down one room and right one room', function () {
        expect(findOpenDoors({ x:1, y:1 }, 'hijkl', 'DR')).to.deep.equal([]);
    });

    it('should find the open doors from going down one room and back up', function () {
        expect(findOpenDoors({ x:0, y:0 }, 'hijkl', 'DU')).to.deep.equal(['R']);
    });

    it('should find the open doors from going down one room and back up and right', function () {
        expect(findOpenDoors({ x:1, y:0 }, 'hijkl', 'DUR')).to.deep.equal([]);
    });

});

describe('Find shortest path', function () {

    it('should find the shortest path for ihgpwlah', function () {
        expect(shortestPath('ihgpwlah')).to.equal('DDRRRD');
    });

    it('should find the shortest path for kglvqrro', function () {
        expect(shortestPath('kglvqrro')).to.equal('DDUDRLRRUDRD');
    });

    it('should find the shortest path for ulqzkmiv', function () {
        expect(shortestPath('ulqzkmiv')).to.equal('DRURDRUDDLLDLUURRDULRLDUUDDDRR');
    });

});
