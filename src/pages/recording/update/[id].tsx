import FormProject from '@/shared/components/business/project/FormProject'
import { Button } from '@/shared/components/common/ui/button'
import { IProject, useGetDetailProject, useUpdateProject } from '@/shared/schemas/models/IProject.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    id: number
}

export default function ProjectUpdate({ id }: Props) {
    const data = useGetDetailProject({ id })
    const handleUpdateProject = useUpdateProject(() => {
        router.push('/project')
    })
    function onSubmit(values: Partial<IProject>) {
        handleUpdateProject.mutate({ id: id, Project: values })
    }
    const router = useRouter()
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-6'>
                <div className='text-2xl font-bold'>Cập nhật dự án</div>
                <Button onClick={() => router.push('/project')}><ListBulletIcon className='mr-2' /> Danh sách dự án</Button>
            </div>
            <FormProject onSubmit={onSubmit} defaultValue={data.data} isLoading={handleUpdateProject.isLoading} onBack={() => router.push('/project')} />
        </section>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const shouldRedirect = await checkPermission({ permissionCode: PERMISSION_CODES.ROLE_MANAGE, type: 'view' }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
    return { props: { id: ctx.query.id } }

}
