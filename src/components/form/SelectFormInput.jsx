export default function SelectFormInput({title, label, name, options, isRequired}){
    return (
        <>
            <p className={`flex text-[#002B69B3] text-sm font-bold ${isRequired ? "after:content-['*'] after:text-red-700 after:ml-1" : ""} mb-2`}>{title}</p>
            <select name="{name}" id="{id}" className="px-3 py-3.5 rounded-xl outline-none border border-[#00000015] shadow-md/20 appearence-none w-full" required={isRequired}>
                <option value="">{label}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt}>{opt}</option>
                ))}
            </select>
        </>
    )
}