import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useNfc from "../useNfc";

const nfcEnabledMock = vi.fn();
vi.mock("@awesome-cordova-plugins/nfc", () => {
  return {
    NFC: {
      enabled: () => nfcEnabledMock(),
    },
  };
});

describe("useNfc should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("work if NFC is ON and stays ON", () => {
    nfcEnabledMock.mockResolvedValue(true);

    const { result } = renderHook(() => useNfc());

    expect(result.current.nfcEnabled).toBeTruthy();
  });
  it("not work if NFC is ON and it is turned OFF", async () => {
    nfcEnabledMock.mockResolvedValueOnce(true);

    const { result } = renderHook(() => useNfc());
    nfcEnabledMock.mockRejectedValueOnce(false);

    await waitFor(() => {
      expect(result.current.nfcEnabled).toBeFalsy();
    },{timeout:6000});
  }, 6000);
  it("not work if NFC is OFF", async () => {
    nfcEnabledMock.mockRejectedValue(false);

    const { result } = renderHook(() => useNfc());

    await waitFor(
      () => {
        expect(result.current.nfcEnabled).toBeFalsy();
      },
      { timeout: 6000 }
    );
  }, 6000);

  it("work if NFC is OFF and then is turned ON", async () => {
    nfcEnabledMock.mockRejectedValueOnce(false);

    const { result } = renderHook(() => useNfc());
    nfcEnabledMock.mockResolvedValueOnce(true);

    await waitFor(
      () => {
        expect(result.current.nfcEnabled).toBeTruthy();
      },
      { timeout: 6000 }
    );
  }, 6000);
});
