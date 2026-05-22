export function Button({
    type="button", children, onClick, className=""
}){
    return(
        <button 
            type={type}
            onClick={onClick}
            className={`
                h-14 rounded-xl bg-[#5D8EF7] text-white font-semibold
                hover:bg-blue-400 transition-all shadow-md 
            `}
        >
            {children}
        </button>
    )
}