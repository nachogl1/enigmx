import { Ndef, NFC } from "@awesome-cordova-plugins/nfc";
import { firstValueFrom, Subject, takeUntil, tap } from "rxjs";

const subjectCloseNFCConnection = new Subject<boolean>();
let isNDEFListenerOn = false;

export const flashNtag: (data: string) => Promise<any> = async (
  data: string
) => {
  return firstValueFrom(
    NFC.addNdefListener().pipe(
      takeUntil(subjectCloseNFCConnection),
      tap(() => {
        console.info("Stopping NDEF listener");
        isNDEFListenerOn = false;
      })
    )
  )
    .then(() => {
      isNDEFListenerOn = true;
      const ndefRecord = Ndef.textRecord(data);
      return NFC.write([ndefRecord]);
    })
    .finally(() => {
      isNDEFListenerOn = false;
    });
};

export const stopFlashing: () => void = async () => {
  subjectCloseNFCConnection.next(false);
};

export const getIsNDEFListenerOn = () => {
  return isNDEFListenerOn;
};
