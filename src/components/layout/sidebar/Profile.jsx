export function Profile({ name, role }) {

    const getFirstAndLastName = (fullName) => {
        if (!fullName) return "";

        const nameParts = fullName.trim().split(/\s+/);

        if (nameParts.length <= 1) {
            return fullName;
        }

        return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
    };
    const displayName = getFirstAndLastName(name);

    return (
        <div className="flex items-center gap-3 px-2">
            <div className="rounded-full w-12 h-12 bg-gray-200 border-2 border-white/20 flex-shrink-0" />
            <div className="overflow-hidden">
                <p className="text-xs text-white/70 font-light">{role}</p>
                <p className="font-semibold break-normal">{displayName}</p>
            </div>
        </div>
    )
}