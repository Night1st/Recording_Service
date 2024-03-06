import DataTable from '@/shared/components/common/table/DataTable';
import DataTableColumnHeader from '@/shared/components/common/table/DataTableColumnHeader';
import { IRecording, RecordingData } from '@/shared/schemas/models/IRecording';
import { ColumnDef } from '@tanstack/react-table';

type Props = {}


export default function RecordingTable({ }: Props) {
    const TABLE_NAME = 'All Recording'
    //const {tableConfig} = useGetListProject()
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
            cell(props) {
                return <div>{props.getValue() as string}</div>
            },
            header: ({ column }) => <DataTableColumnHeader column={column} title="Conversation Start" />,
            // meta: {
            //     searchFn: (value: string) => { console.log(value) }
            // }
        }
    ];
    // const router = useRouter()

    return (
        <section className='w-full'>
            <div className='flex justify-between' >
                <div className='text-2xl font-bold'>{TABLE_NAME}</div>
            </div >
            <DataTable
                data={RecordingData}
                columns={columns}
                tableName={TABLE_NAME} isLoading={false} pageSize={0} pageIndex={0} pageCount={0} handChangePagination={function (value: number, type: 'Page_change' | 'Size_change'): void {
                    throw new Error('Function not implemented.');
                } }                
            />
        </section>
    )
}