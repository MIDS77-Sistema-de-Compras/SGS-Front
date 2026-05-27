import { Modal } from "./Modal";

export function ModalTermos({ isOpen, onClose }) {
    return (
        <Modal
            isOpen={modalTermosOpen}
            onClose={() => setModalTermosOpen(false)}
            title="Termos de Uso"
        >
            <p className="font-semibold">
                Aceitação dos Termos
            </p>
            <p>Ao acessar o Sistema de Gestão de Solicitações (SGS) do Sistema FIESC/SENAI, você concorda em cumprir e se submeter aos presentes Termos de Uso e a todas as leis e regulamentações aplicáveis...</p>
            <p>O uso deste sistema é estritamente profissional e destinado a colaboradores autorizados para o gerenciamento de demandas institucionais.</p>
            <p>É proibido o compartilhamento de credenciais de acesso, sendo o usuário inteiramente responsável por qualquer atividade realizada sob sua conta.</p>
        </Modal>
    )
}