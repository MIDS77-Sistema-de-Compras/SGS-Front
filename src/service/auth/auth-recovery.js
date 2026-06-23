import { api } from "../api";

export async function recoveryEmail(email){
    try{
        const res = await api.post("/auth/recovery", {email: email});
        return res;

    }catch(e){
        console.error("Erro ao enviar email: ", e);
        throw e;
    }
}

// I did not use the getToken() function because of lack of time, I'll implement it later on.
export async function newPassword(password, token){
    try{
        const res = await api.post(`/auth/recovery/new?token=${token}`, {password: password});
        return res;
        
    }catch(e){
        console.error("Erro ao enviar email: ", e);
        throw e;
    }
}