import { NfcTag } from '@awesome-cordova-plugins/nfc';
import { Observable, of } from 'rxjs';
import { describe, vi } from 'vitest';

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

describe('Flashing service should', () => {

    it('flash payload', async () => {
        await flashNtag();
    });


});

