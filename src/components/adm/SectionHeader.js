export default function SectionHeader({ label }) {
    return (
        <div className="flex items-center gap-2 ">
            <div className="w-[4px] h-4 bg-[#103D85] rounded-xl" />
            <h2 className="text-sm font-bold text-[#103D85] tracking-widest">
                {label}
            </h2>
        </div>
    )
}