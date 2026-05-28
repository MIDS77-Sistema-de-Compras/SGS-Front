export default function SelectFormInput({title, label, name, options, isRequired}){
    return (
        <>
            <p className={`flex text-[#002B69B3] text-sm font-bold ${isRequired ? "after:content-['*'] after:text-red-700 after:ml-1" : ""} mb-2`}>{title}</p>
            <select name="{name}" id="{id}" className="p-3 rounded-xl border border-[#00000015] outline-none shadow-md/20 appearence-none w-full" required={isRequired}>
                <option value="">{label}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt}>{opt}</option>
                ))}
            </select>
        </>
    )
}