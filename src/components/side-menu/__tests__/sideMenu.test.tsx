import { render } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import SideMenu from "../sideMenu";

describe("SideMenu should", () => {
    it('render correctly', () => {
        const { getByText } = render(<SideMenu></SideMenu>);
        expect(getByText("Menu")).toBeInTheDocument();
    });

    it('have flash as option', () => {
        const { getByText } = render(<SideMenu></SideMenu>);
        expect(getByText("Flash")).toBeInTheDocument();
    });

    it('have read as option', () => {
        const { getByText } = render(<SideMenu></SideMenu>);
        expect(getByText("Read")).toBeInTheDocument();
    });

})