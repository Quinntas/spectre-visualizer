import {Separator} from "@/components/ui/separator";
import {SqlArea} from "@/components/query-area";
import {ResultTableArea} from "@/components/result-table-area";

const data = [
    {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 2,
        pid: "oaijaaaaaaaaaaaaaaaaaaaasdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    }, {
        id: 1,
        pid: "oaijsdoaisjdoasjd",
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "123456789",
        updated_at: "22/12/22",
        created_at: "22/12/22",
    },
]

export default async function Home() {
    return <>
        <div className={"w-screen h-screen"}>
            <div className={"flex flex-col w-full h-full"}>
                <SqlArea/>

                <div className={"flex flex-col max-h-[300px]"}>
                    <Separator/>

                    <ResultTableArea data={data}/>
                </div>
            </div>
        </div>
    </>
}
