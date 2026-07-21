import { api } from "@/service/api";

export function getAllStatuses() {
    return api.get("/status");
}

export function createStatus({ name, description, color }) {
    return api.post("/status", { name, description, color });
}
