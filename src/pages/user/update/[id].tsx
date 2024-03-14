import FormUser from '@/shared/components/business/user/FormCreateUser'
import { Button } from '@/shared/components/common/ui/button'
import { IUser, useGetDetailUser, useUpdateUser } from '@/shared/schemas/models/IUser.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    id: number
}

export default function UserUpdate({ id }: Props) {
    const router = useRouter()
    const { data } = useGetDetailUser({ id })
    const handleUpdate = useUpdateUser(() => {
        router.push('/user')
    })
    function onSubmit(values: Partial<IUser>) {
        // console.log(values)
        handleUpdate.mutate({ id: id, User: values })
    }
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-4'>
                <div className='text-2xl font-bold'>Cập nhật người dùng</div>
                <Button onClick={() => router.push('/user')}><ListBulletIcon className='mr-2' />Danh sách người dùng</Button>
            </div>
        </section>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
    return { props: { id: ctx.query.id } }

}
