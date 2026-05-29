// TODO: make the button smaller
export default function SubmitButton({children, className}){
    return (
        <button type="submit" className={`bg-[#103D85] text-white align-end rounded-xl cursor-pointer hover:bg-[#3366cc] duration-300 ease-in-out ${className}`}>
            {children}
        </button>
    )
}