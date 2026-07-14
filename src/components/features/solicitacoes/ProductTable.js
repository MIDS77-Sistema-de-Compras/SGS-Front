"use client";

import ProductTableRow from "./ProductTableRow";

export default function ProductTable({
    localProducts,
    isProfessor,
    statusCores,
    openModal,
    openEditModal,
    isServiceRequest = false,
}) {
    return (
        <div className="w-full flex-1 overflow-y-auto px-5">
            <table className="w-full border-collapse table-fixed">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-[#EEF2F6] dark:bg-[#303746]">
                        <th className="py-3 pl-6 text-left text-base font-bold text-[#103D85] dark:text-[#E2E2EA] rounded-xl w-1/3">
                            {isServiceRequest ? "Serviço" : "Produto"}
                        </th>

                        <th className="py-3 pl-10 text-left text-base font-bold text-[#103D85] dark:text-[#E2E2EA] w-1/4">
                            {isServiceRequest ? "Código" : "Variação"}
                        </th>

                        <th className="py-3 text-center text-base font-bold text-[#103D85] dark:text-[#E2E2EA] w-24">
                            {isServiceRequest ? "Informações" : "Quantidade"}
                        </th>

                        <th className="py-3 pl-5 text-center text-base font-bold text-[#103D85] dark:text-[#E2E2EA] w-32">
                            Informações adicionais
                        </th>

                        <th className="py-3 text-center text-base font-bold text-[#103D85] dark:text-[#E2E2EA] rounded-r-xl w-32">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {localProducts.length > 0 ? (
                        localProducts.map((item) => (
                            <ProductTableRow
                                key={item.id || item.code}
                                item={item}
                                isProfessor={isProfessor}
                                statusCores={statusCores}
                                openModal={openModal}
                                openEditModal={openEditModal}
                                isServiceRequest={isServiceRequest}
                            />
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="py-8 text-center text-sm text-gray-400 dark:text-[#C3C6D3]"
                            >
                                Nenhum {isServiceRequest ? "serviço" : "produto"} encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}