
import * as CryptoJS from 'crypto-js';

export const encryptMessage = (payload: string, privateKey: string) => {
    return CryptoJS.AES.encrypt(payload, privateKey);
}

export const decryptMessage = (encryptPayload: string, privateKey: string) => {
    return bytesToString(CryptoJS.AES.decrypt(encryptPayload, privateKey));
}

const bytesToString = (bytes: any) => {
    return bytes.toString(CryptoJS.enc.Utf8);
};