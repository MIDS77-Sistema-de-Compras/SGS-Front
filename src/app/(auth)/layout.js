import AuthBackground from "@/components/login/AuthBackground";

export default function AuthLayout({ children }) {
    return (
        <AuthBackground>
            {children}
        </AuthBackground>
    )
}