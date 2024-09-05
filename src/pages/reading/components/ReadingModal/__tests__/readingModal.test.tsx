
import { NfcTag } from "@awesome-cordova-plugins/nfc";
import { render, waitFor } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import { describe, it, vi } from 'vitest';
import ReadingModal from "../ReadingModal";


const nfcTag: NfcTag = {
    type: "testTag",
};

const readerModeMock = vi.fn();

vi.mock('../../../../../services/readingV2/readingV2.service', () => ({
    readFromNtagV2: () => readerModeMock(),
}))

describe("Reading Modal should", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('start reading when renders', async () => {

        readerModeMock.mockResolvedValue(nfcTag);

        const { getByText, queryByTestId } = render(<ReadingModal isReading={true}
            setReading={{} as Dispatch<SetStateAction<boolean>>}></ReadingModal>);

        await waitFor(() => {
            const readingLoadingIcon = queryByTestId("reading__loading-icon");
            const readingMessage = queryByTestId("Reading, get close to your NTAG");
            const resultMessage = getByText(JSON.stringify(nfcTag));

            expect(readingLoadingIcon).not.toBeInTheDocument();
            expect(readingMessage).not.toBeInTheDocument();
            expect(resultMessage).toBeInTheDocument();

            const warning = queryByTestId("reading__warning");
            expect(warning).not.toBeInTheDocument();

        });

    });

    it('show warning if error occurs', async () => {

        readerModeMock.mockRejectedValue("oh no, error!");


        const { queryByTestId, getByTestId } = render(<ReadingModal isReading={true}
            setReading={{} as Dispatch<SetStateAction<boolean>>}></ReadingModal>);

        await waitFor(() => {
            const warning = getByTestId("reading__warning");
            expect(warning).toBeInTheDocument();
            expect(warning).toHaveTextContent("oh no, error!");

            const readingLoadingIcon = queryByTestId("reading__loading-icon");
            const readingMessage = queryByTestId("Reading, get close to your NTAG");

            expect(readingLoadingIcon).not.toBeInTheDocument();
            expect(readingMessage).not.toBeInTheDocument();


        });

    });



})

