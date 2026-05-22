export function Button({
    type="button", children, onClick, className=""
}){
    return(
        <button 
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}