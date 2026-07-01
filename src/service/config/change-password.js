import { api } from "../api";

export async function changeUserPassword(oldPassword, newPassword){
    const data = {oldPassword: oldPassword, newPassword: newPassword};

    try{
        return await api.post("/users/me/change-password", data);
        
    }catch(e){
        console.error("Não foi possível alterar sua senha: ", e);
        throw e;
    }
}