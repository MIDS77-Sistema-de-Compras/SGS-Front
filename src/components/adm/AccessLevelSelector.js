import Image from 'next/image';

export default function AccessLevelSelector({ value, onChange }) {
    const niveis = ['COORDENADOR', 'SUPERVISOR', 'DOCENTE', 'COMPRADOR REG.'];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7 mb-2">
            {niveis.map((nivel) => (
                <button
                    key={nivel}
                    type="button"
                    onClick={() => onChange(nivel)}
                    className={`py-2 px-4 rounded-xl border text-xs flex items-center justify-center gap-2 shadow-sm
            ${value === nivel
                            ? 'bg-[#103D85] text-white border-[#103D85]'
                            : 'bg-white text-[#103D85] border-gray-200 hover:bg-gray-100'
                        }`}
                >
                    <Image
                        src="/images/adm/usuario.png"
                        alt=""
                        width={10}
                        height={10}
                        className={`w-auto h-auto duration-200 ${value === nivel ? 'brightness-0 invert' : ''}`}
                    />
                    {nivel}
                </button>
            ))}
        </div>
    );
}