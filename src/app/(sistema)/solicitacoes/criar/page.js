import { Search } from "@/components/features/search/Search";
import RequestForm from "@/components/features/request-form/RequestForm";

export default function NovaSolicitacao() {
    return (
        <div className="flex gap-10 flex-1 min-h-0">

            <div className="flex flex-1 flex-col min-h-0">
                <RequestForm />
            </div>

            <div className="flex flex-col min-h-0">
                <Search
                    data={[
                        {
                            id: "7571",
                            tipo: "INICIAÇÃO PRESENCIAL",
                            weg: "Não se aplica",
                            senai: "Kelvin Heron Campestrini",
                        },
                        {
                            id: "8071",
                            tipo: "APRENDIZAGEM - GERAL",
                            weg: "Viviane Ciez",
                            senai: "Viviane Ciez",
                        },
                        {
                            id: "13498",
                            tipo: "APRENDIZAGEM TÉCNICA",
                            weg: "Emerson Tissi ou Andrei Jorge",
                            senai: "Não se aplica",
                        },
                    ]}
                />
            </div>
        </div>
    );
}