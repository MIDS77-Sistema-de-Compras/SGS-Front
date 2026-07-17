const LEVEL_COLORS = {
    DOCENTE: "bg-[#4CAF501A] text-[#007805] dark:bg-[#16A34A]/20 dark:text-[#5FD68A]",
    COORDENADOR: "bg-[#022E7C1A] text-[#0040B0] dark:bg-[#1A4A9E]/25 dark:text-[#7FA9F5]",
    SUPERVISOR: "bg-[#FFC1071A] text-[#FFC107] dark:bg-[#D97706]/20 dark:text-[#F0B95B]",
    ADMIN: "bg-[#FDE7E81A] text-[#E30613] dark:bg-[#C62834]/25 dark:text-[#F08B92]",
    COMPRADOR: "bg-[#022E7C1A] text-[#0040B0] dark:bg-[#1A4A9E]/25 dark:text-[#7FA9F5]",
};

function formatLevel(level) {
    if (!level) return level;
    return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

export default function LevelBadge({ level, className = "px-3 py-1 text-xs min-w-[110px]" }) {
    const key = level?.toUpperCase();

    return (
        <span
            className={`inline-flex items-center justify-center text-center whitespace-nowrap rounded-full font-semibold align-middle ${className} ${
                LEVEL_COLORS[key] || "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-[#C3C6D3]"
            }`}
        >
            {formatLevel(level)}
        </span>
    );
}