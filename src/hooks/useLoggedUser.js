import { useLoggedUserContext } from "@/contexts/LoggedUserContext";

export function useLoggedUser() {
    return useLoggedUserContext();
}
