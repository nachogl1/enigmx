import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from 'vitest';
import FlashingPage from "../FlashingPage";

const cipherParamsObject = {
    message: "testMessageCyphered",
};
const flashNtagMock = vi.fn();
vi.mock('../../../services/flashing/flashing.service', () => ({
    flashNtag: (message: string) => flashNtagMock(message),
}))

const encryptmessage = vi.fn();
vi.mock('../../../services/encryption/encryption', () => ({
    encryptMessage: (encryptPayload: string, privateKey: string) => encryptmessage(),
}))

describe("Flashing Page should", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });


    it('flash ntag', async () => {
        flashNtagMock.mockResolvedValue("");

        encryptmessage.mockReturnValue(cipherParamsObject);

        const { getByText, getByTestId, queryByTestId } = render(<FlashingPage></FlashingPage>);
        expect(getByTestId("message-input")).toBeInTheDocument();
        expect(getByTestId("pk-input")).toBeInTheDocument();
        expect(getByText("FLASH")).toBeInTheDocument();

        act(() => {
            fireEvent.change(getByTestId("message-input"), { target: { value: 'testMessage' } });
            fireEvent.change(getByTestId("pk-input"), { target: { value: 'testPassword' } });
        });

        await waitFor(
            () => {
                expect(getByTestId("message-input")).toHaveValue('testMessage');
                expect(getByTestId("pk-input")).toHaveValue('testPassword');
            }
        )

        act(() => {
            fireEvent.click(getByText("FLASH"));
        });

        await waitFor(
            () => {
                expect(flashNtagMock).toHaveBeenCalledWith(JSON.stringify(cipherParamsObject));
                expect(queryByTestId("flashing__error")).not.toBeInTheDocument();

            }
        )

    });


    it('show warning when errors out during flashing', async () => {
        flashNtagMock.mockRejectedValue("oh no error");

        const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

        act(() => {
            fireEvent.change(getByTestId("message-input"), { target: { value: 'testMessage' } });
            fireEvent.change(getByTestId("pk-input"), { target: { value: 'testPassword' } });
            fireEvent.click(getByText("FLASH"));
        });


        await waitFor(
            () => {
                expect(getByTestId("flashing__error")).toBeInTheDocument();
                expect(getByTestId("flashing__error")).toHaveTextContent("oh no error");

            }
        )

    });

    it('flash button disabled if missing fields', async () => {
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

    it("not show loading on landing in the screen", () => {
        const { queryByTestId } = render(<FlashingPage></FlashingPage>);
        expect(queryByTestId("flashing__loading")).not.toBeInTheDocument();
    });

    it("show loading when flashing", async () => {
        flashNtagMock.mockResolvedValue("");

        const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

        act(() => {
            fireEvent.change(getByTestId("message-input"), { target: { value: 'testMessage' } });
            fireEvent.change(getByTestId("pk-input"), { target: { value: 'testPassword' } });
            fireEvent.click(getByText("FLASH"));
        });

        await waitFor(
            () => {
                expect(getByTestId("flashing__loading")).toBeInTheDocument();
            }
        )
    });

});

