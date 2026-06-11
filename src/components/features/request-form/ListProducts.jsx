import FileDropzone from '@/components/ui/upload/FileDropzone';
import fileBox from '../../../../public/images/icons/fileBox.svg';

export default function ListProducts({ products = [] }) {
    if (products.length === 0) {
        return (
            <FileDropzone
                variant="muted"
                iconVariant="white"
                icon={fileBox}
                iconAlt="File Box Icon"
                title="Nenhum produto adicionado ainda"
                description="Utilize o campo abaixo para buscar e inserir itens."
            />
        );
    }

    return (
        <FileDropzone variant="muted">
            {products.map((product) => (
                <div key={product.id} className="flex w-full bg-white rounded-lg my-1">
                    <p className="font-bold p-3 text-[14px]">
                        {product.id}{' '}
                        <span className="font-normal text-[12px] text-neutral-500">
                            - {product.name}
                        </span>
                    </p>
                </div>
            ))}
        </FileDropzone>
    );
}
