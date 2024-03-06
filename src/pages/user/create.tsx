import FormUser from '@/shared/components/business/user/FormCreateUser'
import { Button } from '@/shared/components/common/ui/button'
import { IUser, useCreateUser } from '@/shared/schemas/models/IUser.model'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'

type Props = {}


export default function CreateUser({ }: Props) {
    const router = useRouter()

    const handleCreate = useCreateUser(() => router.push('/user'))
    function onSubmit(values: Partial<IUser>) {
        handleCreate.mutate(values)
    }
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-6'>
                <div className='text-2xl font-bold'>Tạo người dùng mới</div>
                <Button onClick={() => router.push('/user')}><ListBulletIcon className='mr-2' /> Danh sách người dùng</Button>
            </div>
            <FormUser viewMode='create' onSubmit={onSubmit} isLoading={handleCreate.isLoading} onBack={() => router.push('/user')} />
        </section>
    )
}