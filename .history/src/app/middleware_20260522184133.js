import { NextResponse } from "next/server";

export function middleware(request){
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    if(!token && pathname )
}