import FormDepartment from '@/shared/components/business/department/FormDepartment'
import { Button } from '@/shared/components/common/ui/button'
import { IDepartment, useCreateDepartment } from '@/shared/schemas/models/IDepartment.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'

type Props = {}

export default function CreateDepartment({ }: Props) {
    const router = useRouter()

    const createDepartment = useCreateDepartment(() =>
        router.push('/department')
    )
    function onSubmit(values: Partial<IDepartment>) {
        // beforeCreate(values)
        createDepartment.mutate(values)
    }
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-6'>
                <div className='text-2xl font-bold'>Tạo phòng ban mới</div>
                <Button onClick={() => router.push('/department')}><ListBulletIcon className='mr-2' />Danh sách phòng ban</Button>
            </div>
            <FormDepartment onSubmit={onSubmit} isLoading={createDepartment.isLoading} onBack={() => router.push('/department')} />

        </section>
    )
}