import { Search } from "@/components/search/Search";


export default function NovaSolicitacao(){
    return (
            <div className="w-full flex justify-end pt-20 pr-20">
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
    );
}