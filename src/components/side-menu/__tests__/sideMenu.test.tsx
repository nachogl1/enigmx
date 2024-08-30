import { render } from "@testing-library/react";
import SideMenu from "../sideMenu";
import { describe, expect, it, vi } from 'vitest';
import { TagEvent } from "react-native-nfc-manager";


vi.mock('../../../services/reading/reading.service', () => {
    return {
        readFromNtag: () => Promise.resolve({} as TagEvent)
    }
});

describe("SideMenu should", () => {
    it('render correctly', () => {
        const { getByText } = render(<SideMenu></SideMenu>);
        expect(getByText("Menu")).toBeInTheDocument();
    });
    it('render app title correctly', () => {
        const { getByText } = render(<SideMenu></SideMenu>); 
        expect(getByText("ENIGMX")).toBeInTheDocument();
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