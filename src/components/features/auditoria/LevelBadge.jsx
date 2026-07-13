const LEVEL_COLORS = {
    Docente: "bg-[#4CAF501A] text-[#007805]",
    Coordenador: "bg-[#022E7C1A] text-[#0040B0]",
    Supervisor: "bg-[#FFC1071A] text-[#FFC107]",
    Administrador: "bg-[#FDE7E81A] text-[#E30613]",
    ADM: "bg-[#FDE7E81A] text-[#E30613]",
};

export default function LevelBadge({ level }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                LEVEL_COLORS[level] || "bg-gray-100 text-gray-700"
            }`}
        >
            {level}
        </span>
    );
}