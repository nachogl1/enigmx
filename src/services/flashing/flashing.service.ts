import { Ndef, NFC } from "@awesome-cordova-plugins/nfc";
import { firstValueFrom, Subject, takeUntil, tap } from "rxjs";

const subjectCloseNFCConnection = new Subject<boolean>();
let isFlashingNDEFListenerOn = false;

export const flashNtag: (data: string) => Promise<any> = async (
  data: string
) => {
  return firstValueFrom(
    NFC.addNdefListener().pipe(
      takeUntil(subjectCloseNFCConnection),
      tap(() => {
        console.info("Stopping NDEF listener");
        isFlashingNDEFListenerOn = false;
      })
    )
  )
    .then(() => {
      isFlashingNDEFListenerOn = true;
      const ndefRecord = Ndef.textRecord(data);
      return NFC.write([ndefRecord]);
    })
    .finally(() => {
      isFlashingNDEFListenerOn = false;
    });
};

export const stopFlashing: () => void = async () => {
  subjectCloseNFCConnection.next(false);
};

export const getIsNDEFListenerOn = () => {
  return isFlashingNDEFListenerOn;
};
