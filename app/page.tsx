import {Separator} from "@/components/ui/separator";
import {SqlArea} from "@/components/query-area";
import {ResultTableArea} from "@/components/result-table-area";


export default function Home() {


    return <>
        <div className={"w-screen h-screen"}>
            <div className={"flex flex-col w-full h-full"}>
                <SqlArea/>

                <div className={"flex flex-col max-h-[250px]"}>
                    <Separator/>
                    
                    <ResultTableArea/>
                </div>
            </div>
        </div>
    </>
}
