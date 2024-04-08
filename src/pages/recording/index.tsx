import { DATETIME_FORMAT } from '@/Settings';
import DataTable from '@/shared/components/common/table/DataTable';
import DataTableColumnHeader from '@/shared/components/common/table/DataTableColumnHeader';
import { Button } from '@/shared/components/common/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/common/ui/dropdown-menu';
import { IRecording, RecordingData } from '@/shared/schemas/models/IRecording';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Edit, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';

type Props = {}


export default function RecordingTable({ }: Props) {
    const TABLE_NAME = 'All Recording'
    const columns: ColumnDef<IRecording>[] = [
        {
            id: "channel",
            accessorKey: "channel",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Channel" />,

        },
        {
            id: "division",
            accessorKey: "division",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Division" />,

        },
        {
            id: "queue",
            accessorKey: "queue",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Queue" />,

        },
        {
            id: "originatingDirection",
            accessorKey: "originatingDirection",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Originating Direction" />,
        },
        {
            id: "conversationId",
            accessorKey: "conversationId",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Conversation Id" />,
        },
        {
            id: "agent",
            accessorKey: "agent",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Agent" />,
        },
        {
            id: "remote",
            accessorKey: "remote",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Remote" />,
        },
        {
            id: "wrapUpCode",
            accessorKey: "wrapUpCode",
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Wrap-up" />,
        },
        {
            id: "conversationStart",
            accessorKey: "conversationStart",
            cell: ({row}) => {
                const record = row.original
                return <div>{dayjs(record.conversationStart).format(DATETIME_FORMAT)}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Conversation Start" />,
            // meta: {
            //     searchFn: (value: string) => { console.log(value) }
            // }
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
                            <DropdownMenuItem className="cursor-pointer pl-4 font-medium" onClick={() => router.push(`/recording/detail/${record.conversationId}`)}>
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
                data={RecordingData}
                columns={columns}
                tableName={TABLE_NAME} 
                isLoading={false}
                pageSize={4} 
                pageIndex={0} 
                pageCount={10} 
                handChangePagination={function (value: number, type: 'Page_change' | 'Size_change'): void {
                    throw new Error('Function not implemented.');
                } }

            />
        </section>
    )
}