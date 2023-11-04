import {NextResponse} from "next/server";
import {setConnection} from "@/lib/connection";

export const POST = async (req: Request) => {
    const {connectionString} = await req.json()

    const result = await setConnection(connectionString)

    if (!result)
        return NextResponse.json({message: 'failed to connect'}, {status: 400})

    return NextResponse.json({message: 'ok'}, {status: 200})
};
