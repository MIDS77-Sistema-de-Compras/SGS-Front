import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";

export default function TodasSolicitacoes() {
    const solicitacoes = [
        { id: 1, codigo: "CR-0013", data: "2026-03-10", produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" },
            { id: 3, nome: "Monitor", status: "Reprovado" }
        ]},
        { id: 2, codigo: "CR-1377", data: "2026-03-12", produtos: [
            { id: 1, nome: "Mouse", status: "Em análise" },
            { id: 2, nome: "Teclado", status: "Em análise" }
        ]},
        { id: 3, codigo: "CR-2606", data: "2026-04-12", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" }
        ]},
        { id: 4, codigo: "CR-0020", data: "2026-04-15", produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" },
            { id: 3, nome: "Monitor", status: "Reprovado" }
        ]},
        { id: 5, codigo: "CR-1567", data: "2026-04-30", produtos: [
            { id: 1, nome: "Mouse", status: "Em análise" },
            { id: 2, nome: "Teclado", status: "Em análise" }
        ]},
        { id: 6, codigo: "CR-2093", data: "2026-05-01", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" },
            { id: 3, nome: "Monitor", status: "Aprovado" }
        ]},
        { id: 7, codigo: "CR-3048", data: "2026-05-05", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]},
        { id: 8, codigo: "CR-4009", data: "2026-05-12", produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" },
            { id: 3, nome: "Monitor", status: "Aprovado" }
        ]},
        { id: 9, codigo: "CR-3048", data: "2026-05-05", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]},
        { id: 10, codigo: "CR-3048", data: "2026-05-05", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]},
        { id: 11, codigo: "CR-3048", data: "2026-05-05", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]},
        { id: 12, codigo: "CR-3048", data: "2026-05-05", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]},
    ];

 return (
        <div className="flex-1 bg-white overflow-y-auto font-sans flex flex-col gap-6">
            <RequestsContainer solicitacoesIniciais={solicitacoes} />
        </div>
    );
}