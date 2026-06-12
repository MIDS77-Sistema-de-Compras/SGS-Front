import { API_BASE_URL } from "../api";

interface UserData {userName: string; password: string};

export async function loginUser(email: string, password: string): Promise<any>{
    const userData: UserData = {userName: email, password: password};

    try{
        const res: Response = await fetch(`${API_BASE_URL}/auth/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
        );
        
        return await res.json();
    }catch(e: any){
        console.error("Erro tentando logar: ", e);
        return null;
    }
}