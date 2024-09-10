import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, vi } from "vitest";
import DecryptDialog from "../decryptDialog";

const encryptedPayloadTub = "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es=";

const decryptMessageMock = vi.fn();
vi.mock("../../../../../services/encryption/encryption", async () => {
  return {
    decryptMessage: (encryptPayload: string, privateKey: string) =>
      decryptMessageMock(encryptPayload, privateKey),
  };
});

describe("Decrypt Dialog should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("decrypt message", async () => {
    decryptMessageMock.mockReturnValue("decryptedValue");

    const { getByTestId, getByText } = render(
      <DecryptDialog
        setError={() => {}}
        encryptedPayload={encryptedPayloadTub}
      ></DecryptDialog>
    );

    const input = getByTestId("pk__input");
    const button = getByTestId("decypt__button");

    act(() => {
      fireEvent.change(input, { target: { value: "1" } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(getByText("decryptedValue")).toBeInTheDocument();
      expect(decryptMessageMock).toHaveBeenCalledWith(encryptedPayloadTub, "1");
    });
  });

  it("warns the user when decrypting message", async () => {
    const setErrorMock = vi.fn();

    decryptMessageMock.mockImplementation(() => {
      throw new Error("Error decrypting");
    });

    const { getByTestId } = render(
      <DecryptDialog
        encryptedPayload={encryptedPayloadTub}
        setError={setErrorMock}
      ></DecryptDialog>
    );

    const input = getByTestId("pk__input");
    const button = getByTestId("decypt__button");

    act(() => {
      fireEvent.change(input, { target: { value: "3" } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(setErrorMock).toHaveBeenCalledWith("Error decrypting");
    });
  });
});
