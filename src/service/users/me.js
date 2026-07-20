import { api } from "../api";

export async function getLoggedUser() {
    try {
        return await api.get("/users/me");
    } catch (e) {
        console.error("Não foi possível carregar os dados do usuário: ", e);
        throw e;
    }
}

export async function updateLoggedUserProfilePicture(file) {
    const formData = new FormData();
    formData.append("file", file);
    return api.patchFormData("/users/me/profile-picture", formData);
}
