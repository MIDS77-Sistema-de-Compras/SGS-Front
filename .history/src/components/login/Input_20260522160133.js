export function Input(
    type="text", placeholder, value, onChange, className=""
){
    return(
        <input 
            type={type}
            placeholder={placeholder}
            value={value}        
        />
    )
}