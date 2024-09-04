import { render } from "@testing-library/react";
import FlashingPage from "../FlashingPage";

describe("Flashing Page should", () => {
    it('flash ntag', () => {
        const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

        expect(getByTestId("message-input")).toBeInTheDocument();
        expect(getByTestId("pk-input")).toBeInTheDocument();
        expect(getByText("FLASH")).toBeInTheDocument();

    });

})

