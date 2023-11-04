"use client"

import {useState} from "react";
import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import {format} from 'sql-formatter';
import {Separator} from "@/components/ui/separator";
import {useTheme} from "next-themes";
import {GearIcon} from "@radix-ui/react-icons";
import {ConnectionSettingsModal} from "@/components/modal/connection-settings-modal";
import {ModeToggle} from "@/components/mode-toggle";

const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    {ssr: false}
);

interface SqlAreaProps {
    run: (query: string) => Promise<string>
}

export function SqlArea(props: SqlAreaProps) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);
    const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
    const {theme} = useTheme()

    return <>
        <ConnectionSettingsModal modalState={settingsModalOpen} modalStateChange={() => {
            setSettingsModalOpen(!settingsModalOpen)
        }}/>

        <div className={"flex-row-reverse flex w-full h-full"}>
            <CodeEditor
                className="w-full h-full w-tc-editor-var"
                data-color-mode={theme === "dark" ? "dark" : "light"}
                value={query}
                language="sql"
                onChange={(evn) => setQuery(evn.target.value)}
                style={{
                    fontSize: 15,
                    fontFamily: "Inter, Latin, sans-serif",
                    backgroundColor: theme === "dark" ? "hsl(240 10% 3.9%)" : "hsl(240 10% 98%)",
                }}
            />

            {
                history.length > 0 && <>
                    <Separator orientation={"vertical"}/>

                    <div
                        className={"min-h-full h-0 flex overflow-y-auto flex-col min-w-[170px] max-w-[350px] resize-x gap-2"}>
                        {
                            history.map((query, index) => {
                                return <Button
                                    key={`history-${index}`}
                                    variant={"ghost"}
                                    onClick={() => {
                                        setQuery(query)
                                    }}
                                    className={"h-[35px] rounded-none w-full"}>
                                    <span
                                        className={"truncate text-left w-full text-muted-foreground"}>{query}</span>
                                </Button>
                            })
                        }
                    </div>
                </>
            }
        </div>

        <Separator/>

        <div className={"flex justify-between w-full"}>
            <div className={"flex items-center gap-2 p-3 pb-4 justify-end"}>
                <span className={"truncate"}>{
                    result ? result : ""
                }</span>
            </div>

            <div className={"flex items-center gap-2 p-3 pb-4 justify-end"}>
                <Button onClick={() => {
                    setQuery(format(query))
                }} className={"w-[100px] h-[35px]"}><span>Beautify</span></Button>

                <Button
                    onClick={() => {
                        if (query.length <= 6) {
                            setResult("Query is too short")
                            return
                        }
                        props.run(query).then(res => setResult(res))
                        setHistory([...history, query])
                    }}
                    className={"w-[100px] h-[35px]"}><span>Run</span></Button>

                <Button variant={"outline"} size={"icon"} onClick={() => {
                    setSettingsModalOpen(!settingsModalOpen)
                }}>
                    <GearIcon className={"h-[1.2rem] w-[1.2rem]"}/>
                </Button>
                <ModeToggle/>

            </div>
        </div>
    </>

}
