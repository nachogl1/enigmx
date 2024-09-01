import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';


describe("App should", () => {
    it('render without crashing', () => {
        const { baseElement } = render(<App />);
        expect(baseElement).toBeDefined();
    });
}
)
