"use client";

import { useLoggedUser } from "@/hooks/useLoggedUser";

export function Profile({ name, role }) {

    const { user } = useLoggedUser();

    const getFirstAndLastName = (fullName) => {
        if (!fullName) return "";

        const nameParts = fullName.trim().split(/\s+/);

        if (nameParts.length <= 1) {
            return fullName;
        }

        return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
    };
    const displayName = getFirstAndLastName(user?.name || name);
    const displayRole = user?.roleName || role;
    const profilePicture = user?.userProfile;

    return (
        <div className="flex items-center gap-3 px-2">
            <div className="rounded-full w-12 h-12 bg-gray-200 border-2 border-white/20 flex-shrink-0 overflow-hidden flex items-center justify-center text-[#103D85] font-bold">
                {profilePicture ? (
                    <img
                        src={profilePicture}
                        alt={`Foto de perfil de ${displayName}`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span aria-hidden="true">{displayName?.charAt(0)?.toUpperCase() || "U"}</span>
                )}
            </div>
            <div className="overflow-hidden">
                <p className="text-xs text-white/70 font-light">{displayRole}</p>
                <p className="font-semibold break-normal">{displayName}</p>
            </div>
        </div>
    )
}
