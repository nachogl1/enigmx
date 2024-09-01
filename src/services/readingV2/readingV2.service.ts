
import { NfcTag, NFC } from '@awesome-cordova-plugins/nfc';
import { firstValueFrom } from 'rxjs';


export const readFromNtagV2: () => Promise<NfcTag> = async () => {
    return firstValueFrom(NFC.readerMode(getPredefinedFlags()));
};

const getPredefinedFlags = () => {
    return NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V |
        NFC.FLAG_READER_NFC_B | NFC.FLAG_READER_NFC_F;
}


