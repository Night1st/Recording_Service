import InputText from '@/shared/components/common/form/InputText'
import InputTextArea from '@/shared/components/common/form/InputTextArea'
import { Form } from '@/shared/components/common/ui/form'
import { IJobPosition } from '@/shared/schemas/models/IJobPosition'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../common/ui/button'
import InputSelectDepartment from '../InputSelectDepartment'

type Props = {
    onSubmit: (value: Partial<IJobPosition>) => void
    isLoading?: boolean,
    defaultValue?: IJobPosition,
    onBack?: () => void
}
const formSchema = z.object({
    name: z.string({ required_error: "Vui lòng điền vị trí" }).min(1, { message: "Vui lòng điền vị trí" }),
    description: z.any(),
})
export default function FormJobPosition({ onSubmit, isLoading, defaultValue, onBack }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue
    })
    useEffect(() => {
        if (defaultValue) {
            for (const [key, value] of Object.entries(defaultValue)) {
                form.setValue(key as any, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
        }
    }, [defaultValue])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputText form={form} fieldName="name" label='Tên vị trí' />
                <InputTextArea form={form} fieldName="description" label='Mô tả' />
                <div className='flex justify-start gap-4'>
                    <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}> <MoveLeft className="mr-2 h-4 w-4 " /> Hủy</Button>
                    <Button type="submit" > {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
            </form>
        </Form>
    )
}