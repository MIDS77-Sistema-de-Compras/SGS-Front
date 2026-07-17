import { api } from "../api";

export async function getAllUsers() {
    return await api.get("/users");
}

export async function getUserById(id) {
    return await api.get(`/users/userId/${id}`);
}

export async function createUser(user) {
    return await api.post("/users", user);
}

export async function updateUser(id, user) {
    return await api.put(`/users/userId/${id}`, user);
}

export async function changeUserActivationStatus(id, active) {
    return await api.patch(`/users/userId/${id}/active`, { active });
}

export async function deleteUser(id) {
    return await api.delete(`/users/userId/${id}`);
}

export async function getLoggedUser() {
    return await api.get('/users/me');
}