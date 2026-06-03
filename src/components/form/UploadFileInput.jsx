import Image from "next/image";
import file from "../../../public/images/icons/file.svg";

// TODO: logic for file upload
export default function UploadFileInput(){
    return (
        <div className="flex flex-col items-center border border-3 border-[#00000020] border-dashed rounded-xl pt-1 pb-5 px-2">
            <div className="flex flex-col items-center pt-5">
                <div className="bg-gray-100 p-5 mb-4 rounded-full">
                    <Image src={file} alt="File Icon" />
                </div>
                <p className="font-bold text-[#103D85]">Arraste seus documentos aqui</p>
                <p className="text-sm text-[#747782]">Formatos aceitos: PDF, JPG, PNG e DOCX (máx 20MB)</p>
            </div>
        </div>
    )
}