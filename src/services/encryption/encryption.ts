
import * as CryptoJS from 'crypto-js';

export const encryptMessage = (payload: string, privateKey: string) => {
    return CryptoJS.AES.encrypt(payload, privateKey);
}

export const decryptMessage = (encryptPayload: string, privateKey: string) => {
    let decryptedBytes;
    try {
        decryptedBytes = CryptoJS.AES.decrypt(encryptPayload, privateKey)

    } catch (error) {
        throw new Error("Decryption error");
    }
    return bytesToString(decryptedBytes);
}

const bytesToString = (bytes: any) => {
    return bytes.toString(CryptoJS.enc.Utf8);
};