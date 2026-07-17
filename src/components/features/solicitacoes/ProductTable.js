"use client";

import ProductTableRow from "./ProductTableRow";
import ProductCard from "./ProductCard";

export default function ProductTable({
    localProducts,
    openModal,
    isServiceRequest = false,
    showItemDecisions = false,
    itemDecisions = {},
    decidingItemId = null,
    onAcceptItem,
    onRejectItem,
}) {
    const colSpan = showItemDecisions ? 6 : 5;
    const emptyLabel = `Nenhum ${isServiceRequest ? "serviço" : "produto"} encontrado.`;

    return (
        <div className="w-full flex-1 overflow-y-auto px-4 sm:px-5">
            <div className="flex flex-col gap-3 pb-4 lg:hidden">
                {localProducts.length > 0 ? (
                    localProducts.map((item) => (
                        <ProductCard
                            key={item.id || item.code}
                            item={item}
                            openModal={openModal}
                            isServiceRequest={isServiceRequest}
                            showItemDecisions={showItemDecisions}
                            decision={itemDecisions[item.id]}
                            isDeciding={decidingItemId === item.id}
                            onAcceptItem={onAcceptItem}
                            onRejectItem={onRejectItem}
                        />
                    ))
                ) : (
                    <p className="py-8 text-center text-sm text-gray-400 dark:text-[#C3C6D3]">
                        {emptyLabel}
                    </p>
                )}
            </div>

            <table className="hidden lg:table w-full border-separate border-spacing-y-3 table-fixed">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-[#EEF2F6] dark:bg-[#303746] text-[13px] min-[1350px]:text-base">
                        <th className="py-3 pl-4 min-[1350px]:pl-6 pr-3 text-left font-bold text-[#103D85] dark:text-[#E2E2EA] rounded-l-xl w-[28%] whitespace-nowrap">
                            {isServiceRequest ? "Serviço" : "Produto"}
                        </th>

                        <th className="py-3 pr-3 text-left font-bold text-[#103D85] dark:text-[#E2E2EA] w-[20%] whitespace-nowrap">
                            {isServiceRequest ? "Código" : "Variação"}
                        </th>

                        <th className="py-3 px-3 text-center font-bold text-[#103D85] dark:text-[#E2E2EA] w-[110px] whitespace-nowrap">
                            {isServiceRequest ? "Informações" : "Quantidade"}
                        </th>

                        <th className="py-3 px-3 text-center font-bold text-[#103D85] dark:text-[#E2E2EA] w-[110px] min-[1350px]:w-32">
                            <span className="block leading-tight">Informações<br />adicionais</span>
                        </th>

                        <th className={`py-3 px-3 text-center font-bold text-[#103D85] dark:text-[#E2E2EA] w-[170px] min-[1350px]:w-[190px] ${showItemDecisions ? "" : "rounded-r-xl"}`}>
                            Status
                        </th>

                        {showItemDecisions && (
                            <th className="py-3 px-3 text-center font-bold text-[#103D85] dark:text-[#E2E2EA] w-40 rounded-r-xl">
                                Ação
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody className="w-full">
                    {localProducts.length > 0 ? (
                        localProducts.map((item) => (
                            <ProductTableRow
                                key={item.id || item.code}
                                item={item}
                                openModal={openModal}
                                isServiceRequest={isServiceRequest}
                                showItemDecisions={showItemDecisions}
                                decision={itemDecisions[item.id]}
                                onAcceptItem={onAcceptItem}
                                onRejectItem={onRejectItem}
                            />
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={colSpan}
                                className="py-8 text-center text-sm text-gray-400 dark:text-[#C3C6D3]"
                            >
                                {emptyLabel}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}