import {Modal} from "@/components/modal/modal";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface SettingsModalProps {
    modalState: boolean
    modalStateChange: () => void
}

const formSchema = z.object({
    host: z.string().min(9, {message: "Host must be at least 9 characters long"}),
    port: z.string(),
    user: z.string().min(2, {message: "User must be at least 3 characters long"}),
    password: z.string().min(2, {message: "Password must be at least 8 characters long"}),
    database: z.string().min(2, {message: "Database must be at least 2 characters long"})
})

export function ConnectionSettingsModal(props: SettingsModalProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            host: "localhost",
            port: "3306"
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const result = await fetch("/api/connect", {
            method: "POST",
            body: JSON.stringify({
                connectionString: `mysql://${data.user}:${data.password}@${data.host}:${data.port}/${data.database}`
            })
        })

        if (!result.ok) {
            alert("Error connecting to database")
            console.log('Error connecting to database')
            return
        }

        props.modalStateChange()
    }

    return <>
        <Modal
            modalstate={props.modalState}
            modalstatechange={props.modalStateChange}
            variant={"center"}
            className={"w-[30%] rounded-lg"}
        >
            <div className={"flex flex-col h-full w-full p-5 gap-6"}>
                <h1 className={"flex items-center justify-center text-lg font-semibold"}>Connection Settings</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-5 w-full"}>
                        <div className={"flex gap-2 w-full"}>
                            <FormField
                                control={form.control}
                                name={"host"}
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Host</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"Host"} {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                            <FormField
                                control={form.control}
                                name={"port"}
                                render={({field}) => (
                                    <FormItem className={"w-[100px]"}>
                                        <FormLabel>Port</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"Port"} {...field}/>
                                        </FormControl>
                                        <FormMessage className={"truncate"}/>
                                    </FormItem>
                                )}/>
                        </div>

                        <div className={"flex gap-2"}>
                            <FormField
                                control={form.control}
                                name={"user"}
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>User</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"User"} {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                            <FormField
                                control={form.control}
                                name={"password"}
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"Password"} type={"password"} {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>

                        <FormField
                            control={form.control}
                            name={"database"}
                            render={({field}) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Database</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Database"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        <div className={"flex items-center justify-end"}>
                            <Button type={"submit"}>Connect</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    </>
}