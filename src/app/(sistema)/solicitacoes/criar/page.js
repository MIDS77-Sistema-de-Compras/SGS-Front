import { Search } from "@/components/search/Search";


export default function NovaSolicitacao(){
    return (
        <div>
            <section className="mt-10">
                <Search
                    data={[
                        {
                            cr: "7571",
                            tipo: "INICIAÇÃO PRESENCIAL",
                            wegSupervisor: "Não se aplica",
                            senaiSupervisor: "Kelvin Heron Campestrini",
                        },
                        {
                            cr: "8071",
                            tipo: "APRENDIZAGEM - GERAL",
                            wegSupervisor: "Viviane Ciez",
                            senaiSupervisor: "Viviane Ciez",
                        },
                        {
                            cr: "13498",
                            tipo: "APRENDIZAGEM TÉCNICA",
                            wegSupervisor: "Emerson Tissi ou Andrei Jorge",
                            senaiSupervisor: "Não se aplica",
                        },
                    ]}
                />
                        </section>
        </div>
    )
}