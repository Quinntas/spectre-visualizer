import {Separator} from "@/components/ui/separator";
import {SqlArea} from "@/components/query-area";
import {ResultTableArea} from "@/components/result-table-area";
import {Spectre} from "spectre-orm/dist/spectre";
import {revalidatePath} from "next/cache";

const conn = new Spectre("mysql://root:rootpwd@localhost:3306/meuadv")

let data: any[] = []

export default async function Home() {
    return <>
        <div className={"w-screen h-screen"}>
            <div className={"flex flex-col w-full h-full"}>
                <SqlArea run={async (query) => {
                    "use server"
                    const result = await conn.strategy.rawQuery(query)
                    if (!result.isSuccessful)
                        return "Error in query"
                    data = JSON.parse(JSON.stringify(result.returnValue))
                    revalidatePath('/')
                    return `Successfully fetched ${data.length} rows`
                }}
                />

                <div className={"flex flex-col max-h-[300px]"}>
                    <Separator/>
                    {data.length > 0 && <ResultTableArea data={data}/>}
                </div>
            </div>
        </div>
    </>
}
