"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Input } from "@/components/login/Input";
import { Button } from "@/components/login/Button";
import { Modal } from "@/components/login/Modal";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    const router = useRouter();

    function handleLogin(e) {
        e.preventDefault();

        const tokenBackend = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...exampletoken";
        Cookies.set("token", tokenBackend, {
            expires: 1,
            secure: true,
            sameSite: "strict"
        });
        router.push("/");
    }

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#002663] via-[#003C97] to-[#4B84F4] flex items-center justify-between px-16 lg:px-28 relative py-12">

            <div className="flex flex-col justify-between h-[580px] max-w-[800px]">
                <div className="text-white mt-10">
                    <p className="text-4xl font-light tracking-wide">Olá,</p>
                    <p className="text-4xl font-light tracking-wide mt-1">Bem-vindo(a) ao</p>
                    <h1 className="text-5xl font-bold leading-tight mt-4">
                        Sistema de Gestão <br /> de Solicitações
                    </h1>
                </div>

                <div className="flex items-center gap-6 mt-10">
                    <Image
                        src="/images/logos/senai-white.png"
                        alt="Logo SENAI"
                        width={140}
                        height={35}
                        className="object-contain w-auto h-auto"
                    />
                    <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                        <Image 
                            src="/images/logos/facebook.png" 
                            alt="Facebook" 
                            width={18} 
                            height={18} 
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer" 
                        />
                        <Image 
                            src="/images/logos/youtube.png" 
                            alt="YouTube" 
                            width={18} 
                            height={18} 
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer" 
                        />
                        <Image 
                            src="/images/logos/x.png" 
                            alt="X" 
                            width={16} 
                            height={16} 
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer" 
                        />
                        <Image 
                            src="/images/logos/linkedin.png" 
                            alt="LinkedIn" 
                            width={18} 
                            height={18} 
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer" 
                        />
                        <Image 
                            src="/images/logos/instagram.png" 
                            alt="Instagram" 
                            width={18} 
                            height={18} 
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer" 
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleLogin} className="w-[580px] h-[580px] bg-[#0A2E6B] rounded-[24px] px-10 pt-12 pb-8 flex flex-col shadow-2xl border border-white/5">

                <div className="mb-10">
                    <Image 
                        src="/images/logos/sgc.png" 
                        alt="Sgc" 
                        width={110} 
                        height={110} 
                        className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer" 
                    />
                </div>

                <p className="text-white text-[13px] font-medium opacity-90 text-left mb-6 ">
                    Insira suas credenciais para acessar o sistema
                </p>

                <div className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="E-mail ou número de CPF"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        iconSrc="/images/icons/user.png"
                        iconAlt="Icone de usuario"
                    />

                    <Input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone da senha"
                    />
                </div>

                <div className="mt-20">
                    <Button type="submit" className="w-full py-3 bg-[#4B84F4] hover:bg-[#3b71f3] text-white font-semibold rounded-lg transition-colors">
                        Entrar
                    </Button>
                </div>

                <div className="flex justify-between items-center text-xs text-white mt-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none opacity-80 hover:opacity-100">
                        <input
                            type="checkbox"
                            name="time"
                            className="accent-[#4B84F4] rounded bg-transparent border-white/40"
                        />
                        <span>Mantenha-me conectado</span>
                    </label>
                    <a href="#" className="hover:underline opacity-90 hover:opacity-100">
                        Esqueceu sua senha?
                    </a>
                </div>

                <div className="flex justify-between text-[11px] text-white/60 underline mt-auto">
                    <button 
                        type="button" 
                        onClick={() => setModalTermosOpen(true)}
                        className="hover:text-white transition-colors underline cursor-pointer"
                    >
                        Termos de Uso
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setModalPoliticasOpen(true)}
                        className="hover:text-white transition-colors underline cursor-pointer"
                    >
                        Políticas de privacidade
                    </button>
                </div>
            </form>

            <Modal 
                isOpen={modalTermosOpen} 
                onClose={() => setModalTermosOpen(false)} 
                title="Termos de Uso"
            >
                <p className="font-semibold">Aceitação dos Termos</p>
                <p>Ao acessar o Sistema de Gestão de Solicitações (SGS) do Sistema FIESC/SENAI, você concorda em cumprir e se submeter aos presentes Termos de Uso e a todas as leis e regulamentações aplicáveis...</p>
                <p>O uso deste sistema é estritamente profissional e destinado a colaboradores autorizados para o gerenciamento de demandas institucionais.</p>
                <p>É proibido o compartilhamento de credenciais de acesso, sendo o usuário inteiramente responsável por qualquer atividade realizada sob sua conta.</p>
            </Modal>

           <Modal 
    isOpen={modalPoliticasOpen} 
    onClose={() => setModalPoliticasOpen(false)} 
    title="Política de privacidade"
>
    <p>
        O Sistema FIESC, composto pelas entidades FIESC, SESI, SENAI, IEL e CIESC, através desta Política de Privacidade ("Política"), reconhece a importância de garantir a segurança e a confidencialidade dos dados pessoais que são compartilhados pelos usuários ao acessarem os portais, sites e sistemas corporativos.
    </p>
    <p>
        Esta política esclarece, de forma transparente e em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), quais informações são coletadas, como são utilizadas, armazenadas e os direitos dos titulares de dados durante a navegação no **Sistema de Gestão de Solicitações (SGS)**.
    </p>

    <hr className="border-gray-100 my-2" />

    <p className="font-semibold text-gray-700">1. DA COLETA E USO DOS DADOS</p>
    <p>
        O sistema coleta dados estritamente necessários para a autenticação e prestação dos serviços regulamentares. São coletados dados cadastrais institucionais, tais como e-mail corporativo, número de CPF, nome completo e cargo, exclusivamente para fins de controle de acesso, auditoria de segurança e tramitação de solicitações internas.
    </p>

    <p className="font-semibold text-gray-700">2. DA UTILIZAÇÃO DE COOKIES</p>
    <p>
        Utilizamos cookies essenciais para o funcionamento correto dos serviços e para garantir a segurança da sessão do usuário. Estes cookies são temporários, ativados no momento do login e destruídos após o encerramento da sessão ou fechamento do navegador. Por serem vitais para a integridade da plataforma, não podem ser desativados em nossos sistemas.
    </p>
    <p>
        De maneira adicional, dados analíticos anônimos poderão ser processados para fins estatísticos de desempenho, visando a melhoria contínua da usabilidade da ferramenta, sem que haja a identificação individualizada do colaborador.
    </p>

    <p className="font-semibold text-gray-700">3. COMPARTILHAMENTO DE INFORMAÇÕES</p>
    <p>
        O Sistema FIESC não comercializa, aluga ou compartilha os dados coletados neste sistema com terceiros para fins publicitários ou mercadológicos. O compartilhamento de dados ocorre unicamente entre as entidades integradas do ecossistema FIESC (SESI, SENAI, IEL) para o cumprimento de obrigações legais, execução de contratos internos ou por determinação judicial e de autoridades fiscalizadoras competentes.
    </p>

    <p className="font-semibold text-gray-700">4. SEGURANÇA E ARMAZENAMENTO</p>
    <p>
        Todos os dados coletados são armazenados em ambiente de nuvem seguro e em servidores internos protegidos por rígidos controles de acesso físico e digital. Adotamos medidas técnicas e administrativas compatíveis com os padrões de mercado, como criptografia, firewalls e monitoramento contínuo, para mitigar riscos de acessos não autorizados, perda, alteração ou vazamento de dados.
    </p>

    <p className="font-semibold text-gray-700">5. DIREITOS DO TITULAR</p>
    <p>
        Em respeito à legislação vigente, o usuário possui o direito de confirmar a existência do tratamento de seus dados, acessar as informações armazenadas, solicitar a correção de dados incompletos ou inexatos, e obter esclarecimentos sobre o fluxo de uso de suas informações dentro da instituição, mediante os canais oficiais de atendimento do encarregado de dados (DPO) da FIESC.
    </p>

    <p className="font-semibold text-gray-700">6. ALTERAÇÕES NESTA POLÍTICA</p>
    <p>
        O Sistema FIESC reserva-se o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento, para refletir alterações legislativas ou melhorias nas diretrizes de governança interna. Toda nova versão será publicada nesta mesma plataforma com a respectiva data de atualização.
    </p>

    <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100 text-center">
        Última atualização: Maio de 2026.
    </p>
</Modal>

        </main>
    );
}