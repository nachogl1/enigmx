import { Ndef, NFC } from "@awesome-cordova-plugins/nfc";
import { firstValueFrom, Subject, takeUntil } from "rxjs";

const subjectCloseNFCConnection = new Subject<boolean>();

export const flashNtag: (data: string) => Promise<any> = async (
  data: string
) => {
  return firstValueFrom(
    //todo: issue testing the stop condition
    NFC.addNdefListener().pipe(takeUntil(subjectCloseNFCConnection))
  )
    .then(() => {
      const ndefRecord = Ndef.textRecord(data);
      return NFC.write([ndefRecord]);
    })
    .finally(() => {});
};

export const stopFlashing: () => void = async () => {
  subjectCloseNFCConnection.next(false);
};
