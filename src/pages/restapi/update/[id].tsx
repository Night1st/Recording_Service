import FormDepartment from '@/shared/components/business/department/FormDepartment'
import { Button } from '@/shared/components/common/ui/button'
import { IDepartment, useGetDetailDepartment, useUpdateDepartment } from '@/shared/schemas/models/IDepartment.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    id: number
}

export default function DepartmentUpdate({ id }: Props) {
    const data = useGetDetailDepartment({ id })
    const handleUpdateDepartment = useUpdateDepartment(() => {
        router.push('/department')
    })
    function onSubmit(values: Partial<IDepartment>) {
        handleUpdateDepartment.mutate({ id: id, Department: values })
    }
    const router = useRouter()
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-6'>
                <div className='text-2xl font-bold'>Cập nhật phòng ban</div>
                <Button onClick={() => router.push('/department')}><ListBulletIcon className='mr-2' /> Danh sách phòng ban</Button>
            </div>
            <FormDepartment onSubmit={onSubmit} isLoading={handleUpdateDepartment.isLoading} defaultValue={data.data} 
            onBack={() => router.push('/department')} />
        </section>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
    return { props: { id: ctx.query.id } }

}
