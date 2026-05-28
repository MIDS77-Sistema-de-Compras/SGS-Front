import Image from "next/image"
import fileBox from "../../../public/images/icons/fileBox.svg";

export default function ListProducts({products}){
    // logic for adding products that the user chose

    // PLEASE someone improve this logic, it was the only way I found and it might be unstable.
    return (
        <div className="flex flex-col items-center border border-[#00000020] border-dashed rounded-xl pt-1 pb-5 px-2 bg-gray-100">
            {products.length < 1 ? (
                <div className="flex flex-col items-center pt-5">
                    <div className="bg-white p-4 mb-4 rounded-full">
                        <Image src={fileBox} alt="File Box Icon" />
                    </div>
                    <p className="font-semibold text-[#103D85]">Nenhum produto adicionado ainda</p>
                    <p className="text-sm text-[#747782]">Utilize o campo abaixo para buscar e inserir itens.</p>
                </div>
            ) : products.map((product, index) => (
                <div key={index} className="flex w-full bg-white rounded-lg my-1">
                    <p className="font-bold p-3">{product.id} <span className="font-normal text-neutral-500">- {product.name}</span></p>
                </div>
            ))}
        </div>
    )
}