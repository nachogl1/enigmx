import { fireEvent, render, waitFor } from "@testing-library/react";
import ReadingPage from "../ReadingPage";

describe("Reading Page should", () => {

    it('renders READ button', () => {
        const { getByText } = render(<ReadingPage></ReadingPage>);
        expect(getByText("START READING")).toBeInTheDocument();
    });

    it('start read when clicking START READING', () => {
        const { getByText, getByTestId } = render(<ReadingPage></ReadingPage>);
        const readButton = getByText("START READING");
        

        waitFor(() => {
            fireEvent.click(readButton);
        });
        
        const loadingIcon = getByTestId("reading__loading-icon");
        expect(readButton).not.toBeInTheDocument();
        expect(loadingIcon).toBeInTheDocument();

    });

})