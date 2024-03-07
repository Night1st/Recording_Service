import { DATETIME_FORMAT } from '@/Settings';
import DataTable from '@/shared/components/common/table/DataTable';
import DataTableColumnHeader from '@/shared/components/common/table/DataTableColumnHeader';
import { IRestAPI, RestAPIData } from '@/shared/schemas/models/IRestAPI';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

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

    ];
    return (
        <section className='w-full'>
            <div className='flex justify-between' >
                <div className='text-2xl font-bold'>{TABLE_NAME}</div>
            </div >
            <DataTable
                data={RestAPIData}
                columns={columns}
                tableName={TABLE_NAME}
                isClientPagination
                isLoading={false}
                pageCount={4}
                pageIndex={1}
                pageSize={10}
                handChangePagination={() => { console.log() }}
            />
        </section>
    )
}