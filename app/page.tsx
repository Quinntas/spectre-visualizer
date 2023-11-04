import {Separator} from "@/components/ui/separator";
import {SqlArea} from "@/components/query-area";
import {ResultTableArea} from "@/components/result-table-area";
import {revalidatePath} from "next/cache";
import {conn} from "@/lib/connection";


let data: any[] = []

export default async function Home() {
    return <>
        <div className={"w-screen h-screen"}>
            <div className={"flex flex-col w-full h-full"}>
                <SqlArea run={async (query) => {
                    "use server"
                    if (!conn)
                        return "No connection"
                    const result = await conn.strategy.rawQuery(query)
                    if (!result.isSuccessful) {
                        if (result.isError)
                            return `Error check query`
                        return `${result.returnValue}`
                    }
                    data = JSON.parse(JSON.stringify(result.returnValue))
                    revalidatePath('/')
                    return `Successfully fetched ${data.length} rows`
                }}
                />

                <div className={"flex flex-col max-h-[400px]"}>
                    <Separator/>
                    {data.length > 0 && <ResultTableArea data={data}/>}
                </div>
            </div>
        </div>
    </>
}
