"use client";

import ProductTableRow from "./ProductTableRow";

export default function ProductTable({ localProducts, isProfessor, statusCores, openModal, openEditModal }) {
    return (
        <div className="w-full flex-1 overflow-y-auto px-5">
            <table className="w-full border-collapse table-fixed">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-[#EEF2F6]">
                        <th className="py-3 pl-6 text-left text-base font-bold text-[#103D85] rounded-l-xl w-1/3">Produto</th>
                        <th className="py-3 pl-10 text-left text-base font-bold text-[#103D85] w-1/4">Variação</th>
                        <th className="py-3 text-center text-base font-bold text-[#103D85] w-24">Quantidade</th>
                        <th className="py-3 pl-5 text-center text-base font-bold text-[#103D85] w-32">Informações adicionais</th>
                        <th className="py-3 text-center text-base font-bold text-[#103D85] rounded-r-xl w-32">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {localProducts.length > 0 ? (
                        localProducts.map((item) => (
                            <ProductTableRow 
                                key={item.code}
                                item={item}
                                isProfessor={isProfessor}
                                statusCores={statusCores}
                                openModal={openModal}
                                openEditModal={openEditModal}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                                Nenhum produto encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}