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

});