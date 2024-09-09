import { describe, vi } from 'vitest';
import { encryptMessage } from "../encryption";


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
        const result = encryptMessage("testMessage", "tets-private-key");
        expect(result).toBe("encryptMessage");
    });
});