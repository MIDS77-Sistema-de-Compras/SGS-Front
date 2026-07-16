/**
 * Monta a tabela de pre visualização do CSV referente a planilha de requisição de produto.
 * @param {*} csvData Os dados do csv.
 * @returns A tabela montada com os dados relevantes.
 */
export default function ProductRequestTable({csvData}){
    return (
        <>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Produtos Detectados:</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">Produto</th>
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">Unidade</th>
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">Quantidade</th>
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">CR/Projeto</th>
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">Informações Adicionais</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((product, index) => (
                                <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border-b">{product.productName}</td>
                                    <td className="px-4 py-2 border-b">{product.measurementUnit}</td>
                                    <td className="px-4 py-2 border-b">{product.quantity}</td>
                                    <td className="px-4 py-2 border-b">{product.crBranchId}</td>
                                    <td className="px-4 py-2 border-b">{product.additionalInformations}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Total: {csvData.length} produto(s) pronto(s) para importação
                    </p>
                </div>
            </div>
        </>
    )
}