
import { render, waitFor } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import ReadingModal from "../ReadingModal";

describe("Reading Modal should", () => {
    it('start read when renders', async () => {
        const { getByText, getByTestId } = render(<ReadingModal isReading={true}
            setReading={{} as Dispatch<SetStateAction<boolean>>}></ReadingModal>);

        await waitFor(() => {
            const readingIcon = getByTestId("reading__loading-icon");
            const readingMessage = getByText("Reading, get closer to your NTAG");

            expect(readingIcon).toBeInTheDocument();
            expect(readingMessage).toBeInTheDocument();

        });

    });



})