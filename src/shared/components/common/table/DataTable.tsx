
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/common/ui/table"
import React, { useEffect } from "react"
import { useLocalStorage } from 'usehooks-ts'
import { Skeleton } from "../ui/skeleton"
import DataTableHeader from "./DataTableHeader"
import DataTablePagination from "./DataTablePagination"
import classNames from "classnames"
import { Input } from "../ui/input"


export const COLUMNDATA_TYPE = {
    STRING: 'string',
    DATE: 'date',
    BOOLEAN: 'boolean'
}


export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    tableName: string,
    // pagi config
    isLoading: boolean,
    isClientPagination?: boolean,
    pageSize: number,
    pageIndex: number,
    pageCount: number,
    handChangePagination: (value: number, type: 'Page_change' | 'Size_change') => void
}

function DataTable<TData, TValue>({
    columns,
    data,
    tableName,
    isClientPagination = false,
    pageCount,
    pageSize,
    pageIndex,
    isLoading,
    handChangePagination
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = useLocalStorage(`${process.env.NEXT_PUBLIC_APP_NAME}::${tableName}::columnVisibility`, {})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState('')

    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: !isClientPagination,
        pageCount: !isClientPagination ? pageCount : undefined,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnVisibility,
            columnFilters,
            globalFilter,
        }
    })
    useEffect(() => {
        if (!isClientPagination) {
            table.setPageSize(pageSize)
            table.setPageIndex(pageIndex)
        }
    }, [pageIndex, pageSize, isClientPagination, table])
    const getLeftStickyPos = (index: number) => {
        if (!index) return 0;
        const prevColumnsTotalWidth = columns
            .slice(0, index)
            .reduce((curr, column) => {
                return curr + (column.size || 0);
            }, 0);
        return prevColumnsTotalWidth;
    };
    return <>
        <div className="flex items-center py-4">
            <Input value={globalFilter ?? ''} onChange={value => console.log(String(value))}/>
            <DataTableHeader table={table} />
        </div>

        <div className="rounded-md border w-full mt-4">
            <Table >
                {/* Header render */}
                <TableHeader >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
                            {headerGroup.headers.map((header) => {
                                const isFixed = (header.column.columnDef.meta as { fixed: boolean })?.fixed
                                return (
                                    <TableHead key={header.id}
                                        style={{
                                            left: getLeftStickyPos(header.index),
                                            width: header.getSize()
                                        }}
                                        className={classNames({ "sticky z-10 shadow bg-primary-foreground w-full": isFixed })}
                                    >
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



                {
                    isLoading ? <TableBody>
                        {Array.from(Array(table.getState().pagination.pageSize).keys()).map(index => <TableRow key={index}>
                            <TableCell colSpan={columns.length} className="px-4">
                                <Skeleton className="w-full h-10 mx-2 rounded-xl" />
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                        :

                        /* data render */
                        <TableBody >
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell, index) => {
                                            const isFixed = (cell.column.columnDef.meta as { fixed: boolean })?.fixed
                                            return (
                                                <TableCell key={cell.id}
                                                    style={{
                                                        left: getLeftStickyPos(index),
                                                        width: cell.column.columnDef.size
                                                    }}
                                                    className={classNames({ "sticky bg-primary-foreground shadow-lg": isFixed })}

                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })

                                        }
                                    </TableRow>
                                ))
                            ) :



                                (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                }
            </Table>
        </div>

        <div className="w-full flex flex-wrap items-center justify-end space-x-2 py-4">
            <DataTablePagination table={table} onChangeFunc={handChangePagination} isClientPagination={isClientPagination} />
        </div>
    </>



}
export default DataTable