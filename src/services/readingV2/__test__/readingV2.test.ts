import { NdefRecord, TagEvent } from 'react-native-nfc-manager';
import { describe, expect, it, vi } from 'vitest';
import { readFromNtagV2 } from "../readingV2.service";

const tagEvent: TagEvent = {
    ndefMessage: [{
        type: "mockType"
    } as NdefRecord]
};

const requestTechnologyMock = vi.fn();
const cancelTechnologyRequestMock = vi.fn();
const getTagMock = vi.fn();
const startMock = vi.fn();

vi.mock('react-native-nfc-manager', () => {
    return {
        default: {
            start: () => startMock(),
            requestTechnology: () => requestTechnologyMock(),
            getTag: () => getTagMock(),
            cancelTechnologyRequest: () => cancelTechnologyRequestMock(),
        },
        NfcTech: {
            Ndef: 'Ndef',
            NfcA: 'NfcA',
            NfcB: 'NfcB',
            NfcF: 'NfcF',
            NfcV: 'NfcV',
            IsoDep: 'IsoDep',
            MifareClassic: 'MifareClassic',
            MifareUltralight: 'MifareUltralight',
            MifareIOS: 'mifare',
            Iso15693IOS: 'iso15693',
            FelicaIOS: 'felica',
            NdefFormatable: 'NdefFormatable',
        }
    }
});

describe('Reading service should', () => {

    it('return the read value', async () => {
        getTagMock.mockResolvedValue(tagEvent);
        const result = await readFromNtagV2();
        expect(result?.ndefMessage[0].type).toBe("mockType");
        expect(cancelTechnologyRequestMock).toHaveBeenCalled();
        expect(startMock).toHaveBeenCalled();
    });

    it('errors out gracefully', async () => {
        requestTechnologyMock.mockRejectedValue("Test Error Message");
        expect(startMock).toHaveBeenCalled();

        expect(cancelTechnologyRequestMock).toHaveBeenCalled();

        await expect(async () =>
            await readFromNtagV2()).
            rejects.toThrowError(/^ERROR when reading:Test Error Message$/);
    });

});