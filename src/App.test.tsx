import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import * as hooks from "./hooks/useNfc";

const isPlatformMock = vi.fn();

vi.mock("@ionic/react", async () => {
  const actual: Record<any, any> = await vi.importActual("@ionic/react");
  return {
    ...actual,
    isPlatform: () => isPlatformMock(),
  };
});

describe("App should", () => {
  describe("if env is", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
    it("test, show app, let me work", () => {
      process.env.NODE_ENV = "test";
      const { queryByTestId } = render(<App></App>);
      expect(queryByTestId("nfc__warning")).not.toBeInTheDocument();
    });

    it("development and browser (not hybrid), show app, let me work", async () => {
      const { queryByTestId } = render(<App></App>);
      process.env.NODE_ENV = "development";
      isPlatformMock.mockReturnValue(false);
      await waitFor(() => {
        expect(queryByTestId("nfc__warning")).not.toBeInTheDocument();
      });
    });

    it("development and phone (hybrid) and nfc available, treat like prod", async () => {
      process.env.NODE_ENV = "development";
      isPlatformMock.mockReturnValue(true);
      vi.spyOn(hooks, "default").mockReturnValue({ nfcEnabled: true });

      const { queryByTestId } = render(<App></App>);
      await waitFor(() => {
        expect(queryByTestId("nfc__warning")).not.toBeInTheDocument();
      });
    });

    it("development and phone (hybrid) and nfc not available, treat like prod", async () => {
      process.env.NODE_ENV = "development";
      isPlatformMock.mockReturnValue(true);
      vi.spyOn(hooks, "default").mockReturnValue({ nfcEnabled: false });
      const { getByTestId } = render(<App></App>);
      await waitFor(() => {
        expect(getByTestId("nfc__warning")).toBeInTheDocument();
      });
    });

    it("production and cordova is available, dont show warning, real scenario on going", async () => {
      vi.spyOn(hooks, "default").mockReturnValue({ nfcEnabled: true });
      process.env.NODE_ENV = "production";
      const { queryByTestId } = render(<App></App>);
      await waitFor(() => {
        expect(queryByTestId("nfc__warning")).not.toBeInTheDocument();
      });
    });

    it("production and cordova is not available, running on browser production, should show warning", async () => {
      process.env.NODE_ENV = "production";
      vi.spyOn(hooks, "default").mockReturnValue({ nfcEnabled: false });
      const { getByTestId } = render(<App></App>);
      await waitFor(() => {
        expect(getByTestId("nfc__warning")).toBeInTheDocument();
      });
    });
  });

  describe("If NFC is", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("available, it should render app", () => {
      vi.spyOn(hooks, "default").mockReturnValue({ nfcEnabled: true });
      const { queryByTestId } = render(<App></App>);
      expect(queryByTestId("nfc__warning")).not.toBeInTheDocument();
    });

    it("not available, it should render warning message", () => {
      vi.spyOn(hooks, "default").mockReturnValue({ nfcEnabled: false });
      const { queryByTestId } = render(<App></App>);
      expect(queryByTestId("nfc__warning")).toBeInTheDocument();
    });
  });
});
