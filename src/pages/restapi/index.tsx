import { DATETIME_FORMAT } from '@/Settings';
import DataTable from '@/shared/components/common/table/DataTable';
import DataTableColumnHeader from '@/shared/components/common/table/DataTableColumnHeader';
import { Button } from '@/shared/components/common/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/common/ui/dropdown-menu';
import { IRestAPI, RestAPIData } from '@/shared/schemas/models/IRestAPI';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Edit, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';

type Props = {}


export default function APITable({ }: Props) {
    const TABLE_NAME = 'REST API'

    const columns: ColumnDef<IRestAPI>[] = [
        {
            id: "api",
            accessorKey: "api",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="API Name" />,

        },
        {
            id: "collection",
            accessorKey: "collection",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Collection" />,

        },
        {
            id: "createdBy",
            accessorKey: "createdBy",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created by" />,

        },
        {
            id: "createdOn",
            accessorKey: "createdOn",
            cell: ({row}) => {
                const record = row.original
                return <div>{dayjs(record.createdOn).format(DATETIME_FORMAT)}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created on" />,

        },
        {
            id: "requestMethod",
            accessorKey: "requestMethod",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Request Method" />,

        },
        {
            id: "requestURL",
            accessorKey: "requestURL",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Request URL" />,

        },
        {
            id: "status",
            accessorKey: "status",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,

        },
        {
            id: 'actions',
            header: "Action",
            cell: ({ row }) => {
                const record = row.original;
                return (
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer pl-4 font-medium" onClick={() => router.push(`/recording`)}>
                                <Edit className="mr-2 h-4 w-4" /> Detail
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        }
    ];
    const router = useRouter()
    return (
        <section className='w-full'>
            <div className='flex justify-between' >
                <div className='text-2xl font-bold'>{TABLE_NAME}</div>
            </div >
            <DataTable
                data={RestAPIData}
                columns={columns}
                tableName={TABLE_NAME}
                isLoading={false}
                pageCount={4}
                pageIndex={0}
                pageSize={10}
                handChangePagination={() => { console.log() }}
            />
        </section>
    )
}