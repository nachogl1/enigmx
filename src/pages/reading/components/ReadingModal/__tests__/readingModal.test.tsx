
import { NfcTag } from "@awesome-cordova-plugins/nfc";
import { render, waitFor } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import { describe, it, vi } from 'vitest';
import ReadingModal from "../ReadingModal";



const nfcTag: NfcTag = {
    type: "testTag",
};

const readerModeMock: Promise<NfcTag> = new Promise<NfcTag>((resolve) => {
    resolve(nfcTag);
});

vi.mock('../../../../../services/readingV2/readingV2.service', () => ({
    readFromNtagV2: () => readerModeMock,
}))

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

