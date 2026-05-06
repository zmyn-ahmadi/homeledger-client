import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: NextRequest){
    const cookieStore = await cookies();
    cookieStore.delete("access_token")

    const res =  NextResponse.json({ success: true})
    res.headers.set(
        "set-cookie",
        "refresh_token; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/",
    );
    return res;
}