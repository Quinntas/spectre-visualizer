"use client"

import {useState} from "react";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    {ssr: false}
);

export function SqlArea() {
    const [query, setQuery] = useState("SELECT * FROM users");

    return <>
        <CodeEditor
            value={query}
            language="sql"
            onChange={(evn) => setQuery(evn.target.value)}
            padding={15}
            style={{
                fontSize: 12,
                fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
            }}
        />
    </>

}
