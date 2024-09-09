import { describe, vi } from 'vitest';
import { decryptMessage, encryptMessage } from "../encryption";


const byteToTextMock = vi.fn();
const encryptMock = vi.fn();
const decryptMock = vi.fn();
vi.mock('crypto-js', () => {
    return {
        AES: {
            encrypt: () => encryptMock(),
            decrypt: () => decryptMock(),
            byteToText: () => byteToTextMock(),
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
        decryptMock.mockReturnValue("decryptedMessage");
        const result = decryptMessage("encryptedPayload", "test-private-key");
        expect(result).toBe("decryptedMessage");
    });
});