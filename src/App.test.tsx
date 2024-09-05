import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';


const nfcEnabledMock = vi.fn();
vi.mock('@awesome-cordova-plugins/nfc', () => {
    return {
        NFC: {
            enabled: () => nfcEnabledMock(),
        },
    }
});

describe("App should", () => {

    describe("when NFC available", () => {

        beforeEach(() => {
            nfcEnabledMock.mockResolvedValue(true);
        });

        it('not render nfc warning', async () => {
            const { queryByTestId } = render(<App></App>);
            expect(queryByTestId("nfc__warning")).not.toBeInTheDocument();
        });

        it('render without crashing', () => {
            const { baseElement } = render(<App />);
            expect(baseElement).toBeDefined();
        });

        it('render app title correctly', () => {
            const { getByText } = render(<App></App>);
            expect(getByText("ENIGMX")).toBeInTheDocument();
        });

        it('render side menu button', () => {
            const { getByTestId } = render(<App></App>);
            expect(getByTestId("sideMenu__button")).toBeInTheDocument();
        });
    });

    describe("when NFC not available", () => {

        it('not render anything but a warning if NFC is not available', async () => {
            nfcEnabledMock.mockRejectedValue(false);
            const { getByTestId } = render(<App></App>);
            await waitFor(() => {
                expect(getByTestId("nfc__warning")).toBeInTheDocument();
            });
        });
    });
}
)
