'use strict';

import {expect} from "chai";
import {parseInput, Disk} from "../../src/day22/day22";

describe('Parsing raw input', function () {

    it('should parse the raw input', function () {
        const rawInput = [
            '/dev/grid/node-x0-y0     85T   69T    16T   81%',
            '/dev/grid/node-x10-y14   93T   65T    28T   69%',
            '/dev/grid/node-x25-y6   502T  499T     3T   99%',
        ];
        const disks: Disk[] = [
            { x:10, y:14, capacity: 93, used: 65, avail: 28 },
            { x:0, y:0, capacity: 85, used: 69, avail: 16 },
            { x:25, y:6, capacity: 502, used: 499, avail: 3 },
        ];
        expect(parseInput(rawInput)).to.deep.equal(disks);
    });

});
