"use client"

import {useState} from "react";
import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import {format} from 'sql-formatter';
import {Separator} from "@/components/ui/separator";
import {useTheme} from "next-themes";
import {ModeToggle} from "@/components/mode-toggle";

const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    {ssr: false}
);

export function SqlArea() {
    const [query, setQuery] = useState("SELECT * FROM users");
    const {theme} = useTheme()

    return <>
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

        <Separator/>

        <div className={"flex justify-between w-full"}>
            <div className={"flex items-center gap-2 p-3 pb-4 justify-end"}>
                <h1>Success!</h1>
            </div>

            <div className={"flex items-center gap-2 p-3 pb-4 justify-end"}>
                <Button onClick={() => {
                    setQuery(format(query))
                }} className={"w-[100px] h-[35px]"}><span>Beautify</span></Button>
                <Button className={"w-[100px] h-[35px]"}><span>Run</span></Button>

                <ModeToggle/>
            </div>
        </div>
    </>

}
