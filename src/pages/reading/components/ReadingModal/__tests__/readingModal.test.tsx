
import { render, waitFor } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import { NdefRecord, TagEvent } from "react-native-nfc-manager";
import { describe, expect, it, vi } from 'vitest';
import ReadingModal from "../ReadingModal";


const tagEvent: TagEvent = {
    ndefMessage: [{
        type: "mockType"
    } as NdefRecord]
};

vi.mock('../../../../../services/reading/reading.service', () => {
    return {
        readFromNtag: () => Promise.resolve(tagEvent)
    }
});

describe("Reading Modal should", () => {
    it.only('start read when renders', async () => {

        const { getByText, getByTestId } = render(<ReadingModal isReading={true}
            setReading={{} as Dispatch<SetStateAction<boolean>>}></ReadingModal>);

        await waitFor(() => {
            const readingIcon = getByTestId("reading__loading-icon");
            const readingMessage = getByText("Reading, get close to your NTAG");
            const resultMessage = getByText(JSON.stringify(tagEvent));

            expect(readingIcon).toBeInTheDocument();
            expect(readingMessage).toBeInTheDocument();
            expect(resultMessage).toBeInTheDocument();

        });

    });



})