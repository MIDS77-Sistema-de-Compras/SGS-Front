import Button from "@/components/ui/button/Button";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { useEffect, useState } from "react";
import FormCard from "./FormCard";
import { useSearchParams, useRouter } from "next/navigation";
import { newPassword } from "@/service/auth/auth-recovery";

export default function NewPasswordForm(){
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const token = useSearchParams().get('token');
    const router = useRouter();

    useEffect(() => {
        if(senha != confirmar){
            setError("As senhas não são iguais");
            setIsDisabled(true);
        }else{
            setError(null);
            setIsDisabled(false);
        }
    }, [senha, confirmar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: degeneralize the error "Dados Inválidos".
        try{
            const res = await newPassword(senha, token);

            if(res){
                router.push("/login");
            }

        }catch(error){
            setError(error.message || "Ocorreu um erro inesperado.");
        }
    }

    return (
        <>
        <FormCard
            onSubmit={handleSubmit}
            showBackLink backHref="/login"
            onTermosClick={() => setModalTermosOpen(true)}
            onPoliticasClick={() => setModalPoliticasOpen(true)}
        >
            <h2 className="text-white text-2xl font-bold mb-2">Alterar senha</h2>
            <p className="text-white/60 text-[13px] mb-8">
                Defina sua nova senha de acesso ao sistema.
            </p>

            <div className="flex flex-col gap-4">
                <PasswordInput
                    variant="auth"
                    placeholder="Nova senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    iconSrc="/images/icons/password.png"
                    iconAlt="Icone de senha"
                />
                <PasswordInput
                    variant="auth"
                    placeholder="Confirmar nova senha"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    iconSrc="/images/icons/password.png"
                    iconAlt="Icone de senha"
                />
            </div>

            <p className="text-red-500">{error}</p>

            <div className="mt-8">
                <Button
                    type="submit"
                    variant="auth"
                    size="lg"
                    fullWidth
                    disabled={isDisabled}
                >
                    Alterar senha
                </Button>
            </div>
        </FormCard>
        </>
    )
}