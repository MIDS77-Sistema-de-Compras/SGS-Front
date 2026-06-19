export default function CoordinatorRequestFilters() {
    return (
        <div className="flex items-center gap-4 border border-gray-300 rounded-[14px] px-5 py-3 bg-white shadow-sm">
            <button type="button" className="flex items-center gap-2 text-[#103D85] font-semibold text-[15px] hover:opacity-80 transition-opacity mr-2 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#103D85" /></svg>
                Filtrar
            </button>
            <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-full pl-5 pr-10 py-1.5 text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[120px] text-[14px]"><option>CR</option></select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10L12 15L17 10" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <input type="text" placeholder="Supervisor" className="border border-gray-300 rounded-full px-5 py-1.5 text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[150px] text-[14px]" />
            <label className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#888" /></svg>
                <input type="search" placeholder="Buscar..." className="w-full border border-gray-300 rounded-full pl-11 pr-6 py-1.5 text-gray-500 bg-white outline-none focus:border-[#103D85] text-[14px]" />
            </label>
        </div>
    );
}