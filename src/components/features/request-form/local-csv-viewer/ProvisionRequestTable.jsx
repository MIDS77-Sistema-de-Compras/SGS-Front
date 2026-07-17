/**
 * Monta a tabela de pre visualização do CSV referente a planilha de requisição de serviços.
 * @param {*} csvData Os dados do csv.
 * @returns A tabela montada com os dados relevantes.
 */
export default function ProvisionRequestTable({csvData}){
    return (
        <>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Serviços Detectados:</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">Serviço</th>
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">CR/Projeto</th>
                                <th className="px-4 py-2 text-left text-sm font-medium border-b">Anexos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((provision, index) => (
                                <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border-b">{provision.name}</td>
                                    <td className="px-4 py-2 border-b">{provision.crBranchId}</td>
                                    <td className="px-4 py-2 border-b">{provision.attachments.join(", ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Total: {csvData.length} serviço(s) pronto(s) para importação
                    </p>
                </div>
            </div>
        </>
    )
}