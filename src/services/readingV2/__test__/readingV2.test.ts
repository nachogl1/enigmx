import { NfcTag } from "@awesome-cordova-plugins/nfc";
import { Observable, of, throwError } from "rxjs";
import { describe, expect, it, vi } from "vitest";
import { readFromNtagV2 } from "../readingV2.service";

const payloadAsText = "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es=";

let nfcTag: NfcTag = {
  id: [4, 53, -82, 42, 90, 102, -127],
  techTypes: [
    "android.nfc.tech.NfcA",
    "android.nfc.tech.MifareUltralight",
    "android.nfc.tech.Ndef",
  ],
  type: "NFC Forum Type 2",
  maxSize: 868,
  isWritable: true,
  ndefMessage: [
    {
      tnf: 1,
      type: [84],
      id: [],
      payload: [
        2, 101, 110, 85, 50, 70, 115, 100, 71, 86, 107, 88, 49, 56, 57, 49, 43,
        79, 99, 82, 104, 54, 84, 76, 55, 71, 69, 101, 116, 83, 52, 102, 50, 68,
        71, 65, 117, 54, 85, 120, 69, 89, 88, 54, 101, 115, 61,
      ],
    },
  ],
  canMakeReadOnly: true,
};

let readerModeMock: Observable<NfcTag | Error> = of(nfcTag);

vi.mock("@awesome-cordova-plugins/nfc", () => {
  return {
    NFC: {
      readerMode: (flag: number) => readerModeMock,
      FLAG_READER_NFC_A: 1,
    },
  };
});

describe("Reading service should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("return the read value", async () => {
    const result = await readFromNtagV2();
    expect(result).toBe(payloadAsText);
  });

  it("fail if read from ntag fails", async () => {
    readerModeMock = throwError(() => "NFC Reading failed");

    await expect(async () => await readFromNtagV2()).rejects.toThrowError(
      /^NFC Reading failed$/
    );
  });

  it.each([[], undefined])(
    "fail if ndefMessage is not valid",
    async (ndeMessageValue) => {
      nfcTag = {
        ...nfcTag,
        ndefMessage: ndeMessageValue,
      };

      readerModeMock = of(nfcTag);

      await expect(async () => await readFromNtagV2()).rejects.toThrowError(
        /^Encrypted payload was not valid or empty$/
      );
    }
  );

  it("fail if first payload is not valid", async () => {
    nfcTag = {
      ...nfcTag,
      ndefMessage: [
        {
          payload: [],
          id:[1],
          tnf:1,
          type:[1]
        },
      ],
    };

    readerModeMock = of(nfcTag);

    await expect(async () => await readFromNtagV2()).rejects.toThrowError(
      /^Encrypted payload was not valid or empty$/
    );
  });
});
