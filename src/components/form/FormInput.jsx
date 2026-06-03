export default function FormInput({label, type, placeholder, isRequired }){
    
    return (
        <>
            <p className={`flex text-[#002B69B3] ${isRequired ? "after:content-['*'] after:text-red-700 after:ml-1" : ""} text-sm font-bold mb-2`}>{label}</p>
            <input type={type} placeholder={placeholder} required={isRequired} className="p-3 rounded-xl outline-none border border-[#00000015] shadow-md/20 appearence-none w-full" />
        </>
    )
}