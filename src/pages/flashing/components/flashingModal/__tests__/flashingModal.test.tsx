import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import FlashingModal from "../flashingModal";

const encryptedMessageObjectStub = {
  toString: () => "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es=",
};

const encryptMessageMock = vi.fn();
vi.mock("../../../../../services/encryption/encryption", () => ({
  encryptMessage: (encryptPayload: string, privateKey: string) =>
    encryptMessageMock(encryptPayload, privateKey),
}));

const flashNtagMock = vi.fn();
vi.mock("../../../../../services/flashing/flashing.service", () => ({
  flashNtag: (message: string) => flashNtagMock(message),
}));

describe("Flashing modal should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("decrypt on render time", async () => {
    encryptMessageMock.mockReturnValue(encryptedMessageObjectStub);
    flashNtagMock.mockResolvedValue("");

    const setErrorMock = vi.fn();
    const setLoadingFlashing = vi.fn();

    const { getByText, getByTestId } = render(
      <FlashingModal
        isLoadingFlashing={true}
        message="U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es="
        pk="pk-test"
        setError={setErrorMock}
        setLoadingFlashing={setLoadingFlashing}
      ></FlashingModal>
    );

    await waitFor(() => {
      expect(encryptMessageMock).toHaveBeenCalledWith(
        "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es=",
        "pk-test"
      );
      expect(flashNtagMock).toHaveBeenCalledWith(
        "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es="
      );
      expect(setErrorMock).not.toHaveBeenCalled();
      expect(setLoadingFlashing).toHaveBeenCalled();
      expect(getByText("Flashing, get close to your NTAG")).toBeInTheDocument();
      expect(getByTestId("flashing__loading-icon")).toBeInTheDocument();
    });
  });

  it("warns the user if decrypt fails", async () => {
    encryptMessageMock.mockImplementation(() => {
      throw new Error("error decrypting");
    });
    flashNtagMock.mockResolvedValue("");

    const setErrorMock = vi.fn();
    const setLoadingFlashing = vi.fn();

    render(
      <FlashingModal
        isLoadingFlashing={true}
        message="U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es="
        pk="pk-test"
        setError={setErrorMock}
        setLoadingFlashing={setLoadingFlashing}
      ></FlashingModal>
    );

    await waitFor(() => {
      expect(flashNtagMock).not.toHaveBeenCalled();
      expect(setErrorMock).toHaveBeenCalledWith("error decrypting");
      expect(setLoadingFlashing).toHaveBeenCalledWith(false);
    });
  });

  it("warns the user if flashing process fails", async () => {
    encryptMessageMock.mockReturnValue(encryptedMessageObjectStub);
    flashNtagMock.mockRejectedValue(new Error("Error nfc flashing"));

    const setErrorMock = vi.fn();
    const setLoadingFlashing = vi.fn();

    render(
      <FlashingModal
        isLoadingFlashing={true}
        message="U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es="
        pk="pk-test"
        setError={setErrorMock}
        setLoadingFlashing={setLoadingFlashing}
      ></FlashingModal>
    );

    await waitFor(() => {
      expect(flashNtagMock).toHaveBeenCalledWith(
        "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es="
      );
      expect(setErrorMock).toHaveBeenCalledWith("Error nfc flashing");
      expect(setLoadingFlashing).toHaveBeenCalledWith(false);
    });
  });
});
