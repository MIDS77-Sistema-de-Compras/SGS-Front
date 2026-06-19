import { api } from "../api";

export async function recoveryEmail(email){
    try{
        const res = api.post("/auth/recovery", {email: email});
        return res;
    }catch(e){
        console.error("Erro ao enviar email: ", e);
        throw e;
    }
}