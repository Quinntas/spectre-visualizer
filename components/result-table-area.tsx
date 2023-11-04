"use client"

import * as React from "react"
import {useEffect} from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

function createColumns<T>(data: any): ColumnDef<T>[] {
    let columns: ColumnDef<T>[] = []
    const keys = Object.keys(data)
    for (const key of keys) {
        const valueType = typeof data[key]
        columns.push(
            {
                accessorKey: key,
                header: ({column}) => {
                    return <>
                        {
                            valueType !== "object" ? <Button
                                className={"flex items-center justify-center w-full"}
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            >
                                <span>{key}</span>
                                <ArrowUpDown className="ml-2 h-4 w-4"/>
                            </Button> : <span className={"flex items-center justify-center w-full"}>{key}</span>
                        }
                    </>
                },
                cell: ({row}) => {
                    // @ts-ignore
                    return row.getValue(key)?.length && row.getValue(key)?.length > 100 ? <span
                            className={"flex items-center justify-start truncate max-w-[200px]"}>{row.getValue(key)}</span> :
                        <span
                            className={"flex items-center justify-center truncate"}>{row.getValue(key)}</span>
                }
            },
        )
    }
    columns.push({
        id: "actions",
        enableHiding: false,
        header: ({column}) => {
            return <span className={"flex items-center justify-center w-full"}>Actions</span>
        },
        cell: ({row}) => {
            return <div className={"flex items-center justify-center"}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText("Copy to clipboard")}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu></div>
        },
    })
    return columns
}

interface ResultTableAreaProps<T> {
    data: T[]
}

export function ResultTableArea<T>(props: ResultTableAreaProps<T>) {
    const [columns, setColumns] = React.useState<ColumnDef<any>[]>(
        createColumns<T>(props.data[0])
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    useEffect(() => {
        setColumns(createColumns<T>(props.data[0]))
    }, [props.data]);

    const table = useReactTable({
        data: props.data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return <>
        <Table>
            <TableHeader className={"sticky top-0 bg-primary-foreground"}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody className={"w-full"}>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </>
}
