import { Search } from "./Search";
import { mockCRs } from "./mockData";

export default {
    title: "Search/Search",
    component: Search,
    tags: ["autodocs"],
};

export const Default = {
    args: {
        data: mockCRs,
    },
};