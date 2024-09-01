
import { NfcTag } from "@awesome-cordova-plugins/nfc";
import { render, waitFor } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import { Observable, of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import ReadingModal from "../ReadingModal";



const nfcTag: NfcTag = {
    type: "testTag",
};

let readerModeMock: Observable<NfcTag | Error> = of(nfcTag);

vi.mock('@awesome-cordova-plugins/nfc', () => {
    return {
        NFC: {
            readerMode: (flag: number) => readerModeMock,
            FLAG_READER_NFC_A: 1,
        }
    }
});

describe("Reading Modal should", () => {
    it.only('start reading when renders', async () => {

        const { getByText, queryByTestId } = render(<ReadingModal isReading={true}
            setReading={{} as Dispatch<SetStateAction<boolean>>}></ReadingModal>);

        await waitFor(() => {
            const readingLoadingIcon = queryByTestId("reading__loading-icon");
            const readingMessage = queryByTestId("Reading, get close to your NTAG");
            const resultMessage = getByText(JSON.stringify(nfcTag));

            expect(readingLoadingIcon).not.toBeInTheDocument();
            expect(readingMessage).not.toBeInTheDocument();
            expect(resultMessage).toBeInTheDocument();

        });

    });



})

