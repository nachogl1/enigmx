import { NfcTag } from '@awesome-cordova-plugins/nfc';
import { Observable, of, throwError } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { readFromNtagV2 } from "../readingV2.service";

const nfcTag: NfcTag = {
    type: "testTag",
};

let readerModeMock: Observable<NfcTag | Error> = of(nfcTag);

vi.mock('@awesome-cordova-plugins/nfc', () => {
    return {
        NFC: {
            readerMode: (flag: number) => readerModeMock,
            FLAG_READER_NFC_A: 1,
        }
    }
});

describe('Reading service should', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('return the read value', async () => {
        const result = await readFromNtagV2();
        expect(result?.type).toBe("testTag");
    });

    it('errors out gracefully', async () => {
        readerModeMock = throwError(() => "Test Error Message")

        await expect(async () =>
            await readFromNtagV2()).
            rejects.toThrowError(/^Test Error Message$/);
    });

});

