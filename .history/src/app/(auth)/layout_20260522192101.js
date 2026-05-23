"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/router"

export default function AuthLayout({ children }) {
    return (<>
        {children}
    </>)
}