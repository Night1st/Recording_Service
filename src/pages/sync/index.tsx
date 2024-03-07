import { TIME_FORMAT_READ } from '@/Settings';
import DataTable from '@/shared/components/common/table/DataTable';
import DataTableColumnHeader from '@/shared/components/common/table/DataTableColumnHeader';
import { ISyncManagement, SyncData } from '@/shared/schemas/models/ISyncManagement';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

type Props = {}


export default function SyncTable({ }: Props) {
    const TABLE_NAME = 'Sync Management'

    const columns: ColumnDef<ISyncManagement>[] = [
        {
            id: "date",
            accessorKey: "date",
            cell: ({row}) => {
                const record = row.original
                return <div>{dayjs(record.date).format(TIME_FORMAT_READ)}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        },
        {
            id: "total",
            accessorKey: "total",
            cell({row}) {
                return <div>{row.original.totalConversation.toFixed(0)} records</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Total Conversation ID" />,
        },
        {
            id: "noRecord",
            accessorKey: "noRecord",
            cell({row}) {
                return <div>{row.original.noRecording.toFixed(0)} records</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="No Recording" />,
        },
        {
            id: "downloadRecord",
            accessorKey: "downloadRecord",
            cell({row}) {
                return <div>{row.original.downloadedRecording.toFixed(0)} records</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Downloaded Recording" />,
        }


    ];
    const router = useRouter()
    return (
        <section className='w-full'>
            <div className='flex justify-between' >
                <div className='text-2xl font-bold'>{TABLE_NAME}</div>
            </div >
            <DataTable
                data={SyncData}
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