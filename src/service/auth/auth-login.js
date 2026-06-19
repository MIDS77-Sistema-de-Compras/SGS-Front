import { api } from "../api";

export async function loginUser(email, password) {
    const userData = {userName: email, password: password};

    try{
        const res = await api.post('/auth/login', userData);
        return res;

    } catch(e){
        console.error("Erro tentando logar: ", e);
        throw e;
    }
}