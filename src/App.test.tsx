import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe("App should", () => {
        it('render without crashing', () => {
            const {baseElement} = render(<App/>);
            expect(baseElement).toBeDefined();
        });
    }
)
