import { render } from '@testing-library/react';
import App from './App';

import { TagEvent } from 'react-native-nfc-manager';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./services/reading/reading.service', () => {
    return {
        readFromNtag: () => Promise.resolve({} as TagEvent)
    }
});

describe("App should", () => {
    it('render without crashing', () => {
        const { baseElement } = render(<App />);
        expect(baseElement).toBeDefined();
    });
}
)
