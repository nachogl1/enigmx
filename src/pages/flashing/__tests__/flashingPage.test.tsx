import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from 'vitest';
import FlashingPage from "../FlashingPage";


const flashNtagMock = vi.fn();
vi.mock('../../../services/flashing/flashing.service', () => ({
    flashNtag: (message: string) => flashNtagMock(message),
}))

describe("Flashing Page should", () => {

    beforeAll(() => {
        vi.clearAllMocks();
    });

    it('flash ntag', async () => {
        const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);
        expect(getByTestId("message-input")).toBeInTheDocument();
        expect(getByTestId("pk-input")).toBeInTheDocument();
        expect(getByText("FLASH")).toBeInTheDocument();

        act(() => {
            fireEvent.change(getByTestId("message-input"), { target: { value: 'testMessage' } });
            fireEvent.change(getByTestId("pk-input"), { target: { value: 'testPassword' } });
            fireEvent.click(getByText("FLASH"));
        });

        await waitFor(
            () => {
                expect(getByTestId("message-input")).toHaveValue('testMessage');
                expect(getByTestId("pk-input")).toHaveValue('testPassword');
                expect(flashNtagMock).toHaveBeenCalledWith("testMessage");
            }
        )

    });

    it.only('flash button disable if missing fields', async () => {
        const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

        act(() => {
            fireEvent.change(getByTestId("message-input"), { target: { value: '' } });
            fireEvent.change(getByTestId("pk-input"), { target: { value: 'testPassword' } });
            fireEvent.click(getByText("FLASH"));
            //programtic click triggers onClick even when button
        });

        expect(getByText("FLASH")).toBeDisabled();
        expect(flashNtagMock).not.toHaveBeenCalled();


    });

});

