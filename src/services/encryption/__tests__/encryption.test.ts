import { describe, vi } from 'vitest';
import { decryptMessage, encryptMessage } from "../encryption";

const encryptedObjectFake = {
    toString: (encode: any) => "decryptedMessage"
};

const encryptMock = vi.fn();
const decryptMock = vi.fn();
vi.mock('crypto-js', async () => {
    return {
        AES: {
            encrypt: (payload: string, pk: string) => encryptMock(),
            decrypt: (payload: string, pk: string) => decryptMock(),
        },
        enc: {
            Utf8: () => { }
        }
    }
});

describe("Encryption service should", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });
    it("encrypt message", () => {
        encryptMock.mockReturnValue("encryptMessage");
        const result = encryptMessage("testMessage", "test-private-key");
        expect(result).toBe("encryptMessage");
    });

    it("decrypt message", () => {
        decryptMock.mockReturnValue(encryptedObjectFake);
        const result = decryptMessage("encryptedPayload", "test-private-key");
        expect(result).toBe("decryptedMessage");
    });

    it("warns user if encryption process errors our ", () => {
        const errorStub = new Error("testError");
        encryptMock.mockReturnValue(errorStub);
        const result = encryptMessage("encryptedPayload", "test-private-key");
        expect(result).toEqual(errorStub);
    });

    it("warns user if decryption process errors our ", () => {
        const errorStub = new Error("Decryption error");
        decryptMock.mockImplementation(() => { throw new Error("whatever"); });
        expect(() => decryptMessage("encryptedPayload", "test-private-key")).toThrow(/^Decryption error$/);
    });

    it("warns user if converting from bytes to string fails ", () => {

        const encryptedObjectFakeError = {
            toString: (encode: any) => { throw new Error("Parsing from bytes to text error") }
        };

        decryptMock.mockReturnValue(encryptedObjectFakeError);
        expect(() => decryptMessage("encryptedPayload", "test-private-key")).toThrow(/^Parsing from bytes to text error$/);
    });


});
