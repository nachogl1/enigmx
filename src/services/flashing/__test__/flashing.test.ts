import { NdefRecord } from "@awesome-cordova-plugins/nfc";
import { of, throwError } from "rxjs";
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

    beforeAll(()=>{
        vi.clearAllMocks();
    });

    
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

    it('fail if add ndef listener fails', async () => {
        addNdefListenerMock.mockReturnValue(throwError(() => "testErrorObservable"));
        expect(flashNtag("testData")).rejects.toThrow('testErrorObservable');
    });

    it('fail if create ndef record fails', async () => {
        addNdefListenerMock.mockReturnValue(of("testObservable"));
        textRecordMock.mockImplementation(() => {
            throw new Error("testError");
        });

        expect(flashNtag("testData")).rejects.toThrow("testError");
    });

    it('fail write ndef record fails', async () => {
        addNdefListenerMock.mockReturnValue(of("testObservable"));
        textRecordMock.mockReturnValue(ndefRecordStub);
        writeMock.mockRejectedValue("testError");


        expect(flashNtag("testData")).rejects.toThrow("testError");
    });



});

