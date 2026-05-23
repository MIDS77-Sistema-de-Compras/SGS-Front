export function Profile({ 
    name="Elis Jasper", role="Docente"
}){
    return(
        <div className="flex items-center gap-3 px-2">
                    <div className="rounded-full w-12 h-12 bg-gray-200 border-2 border-white/20 flex-shrink-0" />
                    <div className="overflow-hidden">
                        <p className="text-xs text-white/70 font-light">Docente</p>
                        <p className="font-semibold text-base truncate">Elis Jasper</p>
                    </div>
                </div>
    )
}