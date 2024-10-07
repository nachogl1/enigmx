import { Ndef, NFC } from "@awesome-cordova-plugins/nfc";
import { firstValueFrom } from 'rxjs';


export const flashNtag: (data: string) => Promise<any> = async (data: string) => {
    return firstValueFrom(NFC.addNdefListener()).then(
        () => {
            const ndefRecord = Ndef.textRecord(data);
            return NFC.write([ndefRecord]);
        }
    );
};

export const closeConnection: () => Promise<any> = async () => {
    return NFC.close();
};

