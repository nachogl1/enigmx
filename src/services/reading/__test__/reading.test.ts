import { readFromNtag } from "../reading.service";

describe('Reading service should', () => {

    it('return dummy value', () => {
        const result = readFromNtag();
        expect(result).toBeTruthy();
    });

});