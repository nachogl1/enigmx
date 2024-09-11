import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import FlashingPage from "../FlashingPage";

const cipherParamsObjectStub = {
  message: "testMessageCyphered",
  toString: () => JSON.stringify({ message: "testMessageCyphered" }),
};

const flashNtagMock = vi.fn();
vi.mock("../../../services/flashing/flashing.service", () => ({
  flashNtag: (message: string) => flashNtagMock(message),
}));

const encryptMessageMock = vi.fn();
vi.mock("../../../services/encryption/encryption", () => ({
  encryptMessage: (encryptPayload: string, privateKey: string) =>
    encryptMessageMock(encryptPayload, privateKey),
}));

describe("Flashing Page should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("flash ntag", async () => {
    flashNtagMock.mockResolvedValue("");
    encryptMessageMock.mockReturnValue(cipherParamsObjectStub);

    const { getByText, getByTestId, queryByTestId } = render(
      <FlashingPage></FlashingPage>
    );
    expect(getByTestId("message-input")).toBeInTheDocument();
    expect(getByTestId("pk-input")).toBeInTheDocument();
    expect(getByText("FLASH")).toBeInTheDocument();

    act(() => {
      fireEvent.change(getByTestId("message-input"), {
        target: { value: "testMessage" },
      });
      fireEvent.change(getByTestId("pk-input"), {
        target: { value: "testPassword" },
      });
    });

    await waitFor(() => {
      expect(getByTestId("message-input")).toHaveValue("testMessage");
      expect(getByTestId("pk-input")).toHaveValue("testPassword");
    });

    act(() => {
      fireEvent.click(getByText("FLASH"));
    });

    await waitFor(() => {
      expect(queryByTestId("error__message")).not.toBeInTheDocument();
      expect(queryByTestId("flashing__loading-modal")).toBeInTheDocument();
    });
  });

  it("show warning when errors out during flashing", async () => {
    encryptMessageMock.mockReturnValue(cipherParamsObjectStub);
    flashNtagMock.mockRejectedValue(new Error("oh no error"));

    const { getByText, getByTestId, queryByText } = render(
      <FlashingPage></FlashingPage>
    );

    act(() => {
      fireEvent.change(getByTestId("message-input"), {
        target: { value: "testMessage" },
      });
      fireEvent.change(getByTestId("pk-input"), {
        target: { value: "testPassword" },
      });
      fireEvent.click(getByText("FLASH"));
    });

    await waitFor(() => {
      expect(getByTestId("error__message")).toHaveTextContent("oh no error");
      expect(
        queryByText("Flashing, get close to your NTAG")
      ).not.toBeInTheDocument();
    });
  });

  it("show warning when errors out during encryption before flashing", async () => {
    encryptMessageMock.mockImplementation((a: string, b: string) => {
      throw new Error("Error when encrypting");
    });

    const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

    act(() => {
      fireEvent.change(getByTestId("message-input"), {
        target: { value: "testMessage" },
      });
      fireEvent.change(getByTestId("pk-input"), {
        target: { value: "testPassword" },
      });
      fireEvent.click(getByText("FLASH"));
    });

    await waitFor(() => {
      expect(getByTestId("error__message")).toBeInTheDocument();
      expect(getByTestId("error__message")).toHaveTextContent(
        "Error when encrypting"
      );
    });
  });

  it("flash button disabled if missing fields", async () => {
    const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

    act(() => {
      fireEvent.change(getByTestId("message-input"), { target: { value: "" } });
      fireEvent.change(getByTestId("pk-input"), {
        target: { value: "testPassword" },
      });
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
    encryptMessageMock.mockReturnValue(cipherParamsObjectStub);
    flashNtagMock.mockImplementation(() => {
      return new Promise(() => setTimeout(() => {}, 500));
    });

    const { getByText, getByTestId } = render(<FlashingPage></FlashingPage>);

    act(() => {
      fireEvent.change(getByTestId("message-input"), {
        target: { value: "testMessage" },
      });
      fireEvent.change(getByTestId("pk-input"), {
        target: { value: "testPassword" },
      });
      fireEvent.click(getByText("FLASH"));
    });

    await waitFor(() => {
      expect(getByTestId("flashing__loading-icon")).toBeInTheDocument();
    });
  });
});
