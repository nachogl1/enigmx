
import { NFC } from '@awesome-cordova-plugins/nfc';
import { firstValueFrom } from 'rxjs';


export const readFromNtagV2: () => Promise<string> = async () => {
    const payload = (await firstValueFrom(NFC.readerMode(getPredefinedFlags()))).ndefMessage?.pop()?.payload;

    //validation payload
    const uint8bytes = new Uint8Array(payload!);
    const decoded = new TextDecoder().decode(uint8bytes);
    const firstIndex = decoded.indexOf("U2Fsd");
    const bar = decoded.substring(firstIndex);

    return bar;
};

const getPredefinedFlags = () => {
    return NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V |
        NFC.FLAG_READER_NFC_B | NFC.FLAG_READER_NFC_F;
}


