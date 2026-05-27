import { Modal } from "./Modal";

export function ModalPoliticas({ isOpen, onClose }) {
    return (
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
    )
}