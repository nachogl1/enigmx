import { fireEvent, render, waitFor } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import { describe, it, vi } from "vitest";
import ReadingModal from "../ReadingModal";

const encryptedText = "U2FsdGVkX1891+OcRh6TL7GEetS4f2DGAu6UxEYX6es=";

const readerModeMock = vi.fn();
const closeReadingMock = vi.fn();

vi.mock("../../../../../services/readingV2/readingV2.service", () => ({
  readFromNtagV2: () => readerModeMock(),
  closeReadingSession: () => closeReadingMock(),
}));

describe("Reading Modal should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("start reading when renders", async () => {
    readerModeMock.mockResolvedValue(encryptedText);

    const { getByTestId, queryByTestId } = render(
      <ReadingModal
        isReading={true}
        setReading={{} as Dispatch<SetStateAction<boolean>>}
      ></ReadingModal>
    );

    await waitFor(async () => {
      const readingLoadingIcon = queryByTestId("reading__loading-icon");
      const readingMessage = queryByTestId("Reading, get close to your NTAG");
      const warning = queryByTestId("reading__warning");
      const dialog = getByTestId("readingModal__decryptDialog");

      expect(readingLoadingIcon).not.toBeInTheDocument();
      expect(readingMessage).not.toBeInTheDocument();
      expect(warning).not.toBeInTheDocument();
      expect(dialog).toBeInTheDocument();
    });
  });

  it("show warning if error occurs", async () => {
    readerModeMock.mockRejectedValue(new Error("oh no, error!"));

    const { queryByTestId, getByTestId } = render(
      <ReadingModal
        isReading={true}
        setReading={{} as Dispatch<SetStateAction<boolean>>}
      ></ReadingModal>
    );

    await waitFor(() => {
      const warning = getByTestId("reading__warning");
      const readingLoadingIcon = queryByTestId("reading__loading-icon");
      const readingMessage = queryByTestId("Reading, get close to your NTAG");
      const dialog = queryByTestId("readingModal__decryptDialog");

      expect(warning).toBeInTheDocument();
      expect(warning).toHaveTextContent("oh no, error!");
      expect(readingLoadingIcon).not.toBeInTheDocument();
      expect(readingMessage).not.toBeInTheDocument();
      expect(dialog).not.toBeInTheDocument();
    });
  });

  it("close reading when closing modal", async () => {
    readerModeMock.mockImplementation(() => {
      return new Promise(() => setTimeout(() => {}, 5000));
    });

    const { findByText } = render(
      <ReadingModal
        isReading={true}
        setReading={vi.fn()}
      ></ReadingModal>
    );

    await waitFor(async () => {
      const buttonClose = await findByText("Close");
      fireEvent.click(buttonClose);
      expect(closeReadingMock).toHaveBeenCalled();
    });
  });
});
