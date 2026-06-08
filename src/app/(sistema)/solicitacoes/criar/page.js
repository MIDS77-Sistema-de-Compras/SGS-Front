import { Search } from "@/components/search/Search";
import RequestForm from "@/components/request-form/RequestForm";

<<<<<<< HEAD
export default function NovaSolicitacao(){
    return (   
     <div className="flex gap-10 ">
=======
export default function NovaSolicitacao() {
    return (
        <div className="flex gap-10">
>>>>>>> 75a4f78461574fd90fa0a230587e883c9e6b0ba0

            <div className="flex-1">
                <RequestForm />
            </div>

            <div className="flex">
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