
import * as CryptoJS from 'crypto-js';

export const encryptMessage = (payload: string, privateKey: string) => {
    return CryptoJS.AES.encrypt(payload, privateKey);
}

export const decryptMessage = (encryptPayload: string, privateKey: string) => {
    return CryptoJS.AES.decrypt(encryptPayload, privateKey);
}