import FormPhase from '@/shared/components/business/phase/FormPhase'
import { Button } from '@/shared/components/common/ui/button'
import { IPhase, useGetDetailPhase, useUpdatePhase } from '@/shared/schemas/models/IPhase.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    id: number
}

export default function PhaseUpdate({ id }: Props) {
    const data = useGetDetailPhase({ id })
    const router = useRouter()
    const handleUpdate = useUpdatePhase(() => {
        router.push('/phase')
    })

    function onSubmit(values: Partial<IPhase>) {
        // beforeCreate(values)
        handleUpdate.mutate({ id: id, phase: values })
    }
    return (
        <section className='w-full '>
            <div className='flex justify-between mb-4'>
                <div className='text-2xl font-bold'>Cập nhật phase</div>
                <Button onClick={() => router.push('/phase')}><ListBulletIcon className='mr-2' /> Danh sách phase</Button>
            </div>
            <FormPhase onBack={() => router.push('/phase')} onSubmit={onSubmit} isLoading={handleUpdate.isLoading} defaultValue={data.data} />
        </section>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
    return { props: { id: ctx.query.id } }

}
