import { NFC, NfcTag } from "@awesome-cordova-plugins/nfc";
import { firstValueFrom, Subject, takeUntil } from "rxjs";

const START_OF_REAL_ENCRYPTED_MESSAGE = "U2Fsd";
const readingSubject = new Subject<boolean>();
let isReadingNDEFListenerOn = false;

export const readFromNtagV2: () => Promise<string> = async () => {
  const ntagObject = await readFromNtag();
  const payload = extractPayloadFrom(ntagObject);
  const payloadAsText = bytesToText(payload);
  const decodeMessageWithoutLanguagePrefix =
    removeLanguagePrefix(payloadAsText);
  return decodeMessageWithoutLanguagePrefix;
};

export const closeReadingSession = () => {
  readingSubject.next(false);
};

export const getIsReadingNDEFListenerOn: () => boolean = () => {
  return isReadingNDEFListenerOn;
};

const readFromNtag = async () => {
  isReadingNDEFListenerOn = true;
  return firstValueFrom(
    NFC.readerMode(getPredefinedNFCFlags()).pipe(takeUntil(readingSubject))
  ).finally(() => {
    isReadingNDEFListenerOn = false;
  });
};

const getPredefinedNFCFlags = () => {
  return (
    NFC.FLAG_READER_NFC_A |
    NFC.FLAG_READER_NFC_V |
    NFC.FLAG_READER_NFC_B |
    NFC.FLAG_READER_NFC_F
  );
};

const extractPayloadFrom = (ntag: NfcTag): number[] => {
  const payload = ntag.ndefMessage?.pop()?.payload;

  if (!payload || payload?.length < 1) {
    throw new Error("Encrypted payload was not valid or empty");
  }

  return payload;
};

const bytesToText = (payload: number[]): string => {
  const uint8bytes = new Uint8Array(payload);
  const decoded = new TextDecoder().decode(uint8bytes);
  return decoded;
};

const removeLanguagePrefix = (payloadAsText: string) => {
  const firstIndexOfRealMessage = payloadAsText.indexOf(
    START_OF_REAL_ENCRYPTED_MESSAGE
  );
  const result = payloadAsText.substring(firstIndexOfRealMessage);
  return result;
};
