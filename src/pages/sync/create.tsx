import FormPhase from '@/shared/components/business/phase/FormPhase'
import InputText from '@/shared/components/common/form/InputText'
import InputTextArea from '@/shared/components/common/form/InputTextArea'
import { Button } from '@/shared/components/common/ui/button'
import { Form } from '@/shared/components/common/ui/form'
import { IPhase, useCreatePhase } from '@/shared/schemas/models/IPhase.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

export default function CreateUser({ }: Props) {
    const router = useRouter()

    const handleCreate = useCreatePhase(() => {
        router.push('/phase')
    })

    function onSubmit(values: Partial<IPhase>) {
        // beforeCreate(values)
        handleCreate.mutate(values)
    }
    return (
        <section className='w-full'>
            <div className='flex justify-between mb-6'>
                <div className='text-2xl font-bold'>Tạo phase mới</div>
                <Button onClick={() => router.push('/phase')}><ListBulletIcon className='mr-2' /> Danh sách phase</Button>
            </div>
            <FormPhase onBack={() => router.push('/phase')} onSubmit={onSubmit} isLoading={handleCreate.isLoading} />
        </section>
    )
}