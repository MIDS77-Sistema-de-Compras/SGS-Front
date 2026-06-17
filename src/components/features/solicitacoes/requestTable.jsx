import SolicitacaoRow from "./requestRow";

export default function SolicitacoesTable({ itens, onItemClick }) {
    return (
        <div className="flex flex-col">
            {itens.map((item) => (
                <SolicitacaoRow
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item.id)}
                />
            ))}
        </div>
    );
}