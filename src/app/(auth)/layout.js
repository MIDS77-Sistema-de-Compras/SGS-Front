import AuthBackground from "@/components/features/auth/AuthBackground";

export default function AuthLayout({ children }) {
    return (
        <AuthBackground>
            {children}
        </AuthBackground>
    )
}