
import * as CryptoJS from 'crypto-js';

export const encryptMessage = (payload: string, privateKey: string) => {
    return CryptoJS.AES.encrypt(payload, privateKey);
}
