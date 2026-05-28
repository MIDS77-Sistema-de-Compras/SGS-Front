// TODO: make the button smaller
export default function SubmitButton({children, textSize}){
    return (
        <button type="submit" className={`bg-[#103D85] text-white text-[3rem] align-end rounded-xl`}>
            {children}
        </button>
    )
}