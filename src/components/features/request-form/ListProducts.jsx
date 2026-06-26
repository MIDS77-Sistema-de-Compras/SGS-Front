import FileDropzone from '@/components/ui/upload/FileDropzone';
import fileBox from '../../../../public/images/icons/fileBox.svg';

export default function ListProducts({ products = [], onRemove, tipo }) {
    if (products.length === 0) {
        return (
            <FileDropzone
                variant="muted"
                iconVariant="white"
                icon={fileBox}
                iconAlt="File Box Icon"
                title={
                    tipo === "produto"
                        ? "Nenhum produto adicionado ainda"
                        : "Nenhum serviço adicionado ainda"
                }
                description="Utilize o campo abaixo para buscar e inserir itens."
            />
        );
    }

    return (
    <div className="border border-[#00000020] rounded-xl bg-gray-100 p-3">
        <div className="flex flex-col gap-2 w-full">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center justify-between bg-white rounded-lg px-4 py-3"
                >
                    <div className="flex flex-col min-w-0 flex-1 mr-16">
                        <p className="font-bold text-[14px] text-gray-800 break-words">
                            {product.name}
                        </p>
                        {product.additionalInformations && (
                            <p className="text-[12px] text-neutral-500 break-all">
                                {product.additionalInformations}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <span className="text-[13px] font-medium text-[#355C9C] whitespace-nowrap">
                            {product.quantity} {product.measurementUnit}
                        </span>
                        {onRemove && (
                            <button
                                type="button"
                                onClick={() => onRemove(product.id)}
                                className="text-gray-400 hover:text-[#BA1A1A] transition-colors"
                                aria-label="Remover produto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}