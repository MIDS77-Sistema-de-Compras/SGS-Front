export default function FormField({ label, required, children, className = "" }) {
    return (
        <div className={className}>
            <label className="block text-[12px] font-bold text-[#103D85]/70 mb-2 pt-4 pb-px">
                {label} {required && <span className="text-[#BA1A1A]">*</span>}
            </label>
            {children}
        </div>
    )
}