export function Button({
    type="button", children, onClick, className=""
}){
    return(
        <button 
            type={type}
            onClick={onClick}
            className={`
                h-14 rounded-xl bg-[]
            `}
        >
            {children}
        </button>
    )
}