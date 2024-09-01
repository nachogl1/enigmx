import { NfcTag } from "@awesome-cordova-plugins/nfc";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Observable, of, } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import ReadingPage from "../ReadingPage";


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

describe("Reading Page should", () => {
    it('renders READ button', () => {
        const { getByText } = render(<ReadingPage></ReadingPage>);
        expect(getByText("START READING")).toBeInTheDocument();
    });

    it('show  read loading when clicking START READING', () => {
        const { getByText, getByTestId } = render(<ReadingPage></ReadingPage>);
        const readButton = getByText("START READING");


        waitFor(() => {
            fireEvent.click(readButton);
        });

        const readingModal = getByTestId("reading__loading-modal");
        expect(readButton).not.toBeInTheDocument();
        expect(readingModal).toBeInTheDocument();

    });

    it('not show  read loading after clicking close', async () => {
        const { getByText, getByTestId } = render(<ReadingPage></ReadingPage>);
        const readButton = getByText("START READING");

        await waitFor(() => {
            fireEvent.click(readButton);
            fireEvent.click(getByText("Close"));

        });

        waitFor(() => {
            const readingModal = getByTestId("reading__loading-modal");
            expect(readButton).toBeInTheDocument();
            expect(readingModal).not.toBeInTheDocument();
        });


    });

})

