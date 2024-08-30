import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';



export const readFromNtag: () => Promise<TagEvent | null> = async () => {
    NfcManager.start();
    let result: TagEvent | null;
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        result = await NfcManager.getTag();
        console.info('Tag found:', result);
    } catch (ex) {
        console.warn('ERROR when reading:', ex);
        throw new Error('ERROR when reading:' + ex);
    } finally {
        NfcManager.cancelTechnologyRequest();
    }

    return result;
};
