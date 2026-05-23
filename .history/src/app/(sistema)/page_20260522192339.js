"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Home(){
    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
    }

    return(
        <div></div>
    )
}