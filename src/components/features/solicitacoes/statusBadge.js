import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export default function StatusBadge({ status, className = "w-[240px]" }) {
    return (
        <button className={`${className} py-1 text-white font-medium text-[13px] rounded-full ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
        </button>
    );
}
