import { NdefRecord } from "@awesome-cordova-plugins/nfc";
import { of } from "rxjs";
import { describe, vi } from 'vitest';
import { flashNtag } from '../flashing.service';


const ndefRecordStub: NdefRecord = {
    id: [1],
    payload: [1],
    tnf: 1,
    type: [1],
};

const addNdefListenerMock = vi.fn();
const writeMock = vi.fn();
const textRecordMock = vi.fn();
vi.mock('@awesome-cordova-plugins/nfc', () => {
    return {
        NFC: {
            addNdefListener: () => addNdefListenerMock(),
            write: (ndefRecord: string[]) => writeMock(ndefRecord),
        },
        Ndef: {
            textRecord: (data: string) => textRecordMock(data),
        }
    }
});

describe('Flashing service should', () => {

    it('flash payload', async () => {
        addNdefListenerMock.mockReturnValue(of("testObservable"));
        writeMock.mockResolvedValue("testResultWrite");
        textRecordMock.mockReturnValue(ndefRecordStub);

        const result = await flashNtag("testData");

        expect(addNdefListenerMock).toHaveBeenCalledTimes(1);
        expect(textRecordMock).toHaveBeenCalledWith("testData")
        expect(textRecordMock).toHaveBeenCalledTimes(1);
        expect(writeMock).toHaveBeenCalledTimes(1);
        expect(writeMock).toHaveBeenCalledWith([ndefRecordStub]);
        expect(result).toBe("testResultWrite");
    });


});

