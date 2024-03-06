import { Button } from '@/shared/components/common/ui/button'
import { IProject, useCreateProject } from '@/shared/schemas/models/IProject.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import FormProject from '../../shared/components/business/project/FormProject'

type Props = {}

export default function CreateProject({ }: Props) {
    const router = useRouter()

    const handleCreateProject = useCreateProject(() => router.push('/project'))
    function onSubmit(values: Partial<IProject>) {
        handleCreateProject.mutate(values)
    }
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-6'>
                <div className='text-2xl font-bold'>Tạo dự án mới</div>
                <Button onClick={() => router.push('/project')}><ListBulletIcon className='mr-2' />Danh sách dự án</Button>
            </div>
            <FormProject onSubmit={onSubmit} onBack={() => router.push('/project')} />
        </section>
    )
}