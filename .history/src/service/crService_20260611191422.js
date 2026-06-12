import { api } from "./api";

export async function getAllCRs() {
    return api.get('/cr-branches')
}

export function 