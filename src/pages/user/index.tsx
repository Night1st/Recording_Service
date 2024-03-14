import { ConfirmDialog } from '@/shared/components/common/dialog/ConfirmDialog';
import DataTable from '@/shared/components/common/table/DataTable';
import DataTableColumnHeader from '@/shared/components/common/table/DataTableColumnHeader';
import { Button } from '@/shared/components/common/ui/button';
import { Checkbox } from '@/shared/components/common/ui/checkbox';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/common/ui/dropdown-menu';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { ColumnDef } from '@tanstack/react-table';
import { Edit, KeyIcon, ListPlus, MoreHorizontal, PlusCircle, Trash2, User } from 'lucide-react';
import React, { useEffect } from 'react'
import { IUser, useChangePass, useDeleteUser, useGetAllUser, useGetListUser, useUpdateUser } from '@/shared/schemas/models/IUser.model';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import { TIME_FORMAT_READ } from '@/Settings';
import { ChangePassDialog } from '@/shared/components/common/dialog/ChangePassDialog';

type Props = {}


export default function UserTable({ }: Props) {
    const TABLE_NAME = 'Người dùng'
    const { data, onChangeSearchParams, tableConfig, getFieldValueOnSearchParam2 } = useGetListUser()
    const handleDeleteUser = useDeleteUser()
    const handleChangePass = useChangePass()

    const columns: ColumnDef<IUser>[] = [
        {
            id: 'actions',
            header: "Thao tác",
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
                            <DropdownMenuItem className="cursor-pointer pl-4 font-medium" onClick={() => router.push(`/user/update/${record.id}`)}>
                                <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                            </DropdownMenuItem>

                            <ConfirmDialog
                                triggerCpn={<Button variant={'ghost'} className='justify-start w-full' >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Xóa
                                </Button>}
                                title="Xóa "

                                content="Chắc chắn Xóa"
                                onOk={() => handleDeleteUser.mutate({ id: record.id })}
                            />
                            <ChangePassDialog
                                triggerCpn={<Button variant={'ghost'} className='justify-start w-full' >
                                    <KeyIcon className="mr-2 h-4 w-4" />
                                    Đổi mật khẩu
                                </Button>}
                                onOk={(value) => handleChangePass.mutate({
                                    id: record.id, body: {
                                        //@ts-ignore
                                        oldPassword: "",
                                        ...value
                                    }


                                })}
                            />

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            id: "userName",
            accessorKey: "userName",

            header: ({ column }) => <DataTableColumnHeader column={column} title="Tên tài khoản" defaultFilter={getFieldValueOnSearchParam2('userName')} />,
            meta: {
                searchFn: (value: string) => {
                    onChangeSearchParams({
                        field: 'userName',
                        fieldType: 'STRING',
                        op: 'LIKE',
                        value: value
                    })
                }
            }
        },
        {
            id: "fullName",
            accessorKey: "fullName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Họ tên" defaultFilter={getFieldValueOnSearchParam2('fullName')} />,
            meta: {
                searchFn: (value: string) => {
                    onChangeSearchParams({
                        field: 'fullName',
                        fieldType: 'STRING',
                        op: 'LIKE',
                        value: value
                    })
                }
            }
        },

        {
            id: "createdDate",
            accessorKey: "createdDate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian tạo" />,
            cell: ({ row }) => {
                const record = row.original;
                return <div>{dayjs(record.updatedDate).format(TIME_FORMAT_READ)}</div>
            },

        },
        {
            id: "updatedDate",
            accessorKey: "updatedDate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian cập nhật" />,
            cell: ({ row }) => {
                const record = row.original;
                return <div>{dayjs(record.updatedDate).format(TIME_FORMAT_READ)}</div>
            },

        },


    ];
    const router = useRouter()
    return (
        <section className='w-full'>
            <div className='flex justify-between' >
                <div className='text-2xl font-bold'>{TABLE_NAME}</div>
                <Button onClick={() => router.push('/user/create')}><PlusCircle className='mr-2' /> Thêm người dùng</Button>
            </div >

            <DataTable
                data={data?.data.content || []}
                columns={columns}
                tableName={TABLE_NAME}
                {...tableConfig}
            // isClientPagination
            // isLoading={data.isLoading}
            // pageCount={4}
            // pageIndex={1}
            // pageSize={10}
            // handChangePagination={() => { console.log() }}
            />
        </section>
    )
}