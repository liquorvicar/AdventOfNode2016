'use strict';

import {expect} from "chai";
import {validateRoom, decryptName} from "../../src/day4/day4";

describe('Room validator', () => {

    const examples = [
        {room: "aaaaa-bbb-z-y-x-123[abxyz]", sector: 123},
        {room: "a-b-c-d-e-f-g-h-987[abcde]", sector: 987},
        {room: "not-a-real-room-404[oarel]", sector: 404},
        {room: "totally-real-room-200[decoy]", sector: 0},
    ];

    examples.forEach((example) => {
        it(`should validate ${example.room} as ` + (example.sector ? "" : "not ") + 'true', () => {
            expect(validateRoom(example.room)).to.equal(example.sector);
        });
    });

});

describe('Decrypt name', () => {

    it('should decrypt a name', () => {
        const decryptedName = decryptName('qzmt-zixmtkozy-ivhz-343[abcde]');
        expect(decryptedName).to.equal('very encrypted name');
    });

});

