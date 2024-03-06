import InputText from '@/shared/components/common/form/InputText'
import InputTextArea from '@/shared/components/common/form/InputTextArea'
import { Form } from '@/shared/components/common/ui/form'
import { IPhase } from '@/shared/schemas/models/IPhase.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../common/ui/button'
import InputSelectProject from '../InputSelectProject'

type Props = {
    onSubmit: (value: Partial<IPhase>) => void
    isLoading?: boolean,
    defaultValue?: IPhase,
    onBack: () => void
}
const formSchema = z.object({
    name: z.string().min(3, { message: 'Vui lòng điền tên phase' }),
    description: z.string().optional(),
    projectCode: z.any(),
})
export default function FormPhase({ onSubmit, isLoading, defaultValue, onBack }: Props) {
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
            form.setValue('projectCode', defaultValue.projects.projectCode)
        }
    }, [defaultValue])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputText form={form} fieldName="name" label='Tên Phase' />
                <InputTextArea form={form} fieldName="description" label='Mô tả' />
                <InputSelectProject form={form} fieldName="projectCode" label='Chọn dự án' />
                <div className='flex justify-start gap-4'>
                    <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}>  <MoveLeft className="mr-2 h-4 w-4 " /> Hủy</Button>
                    <Button type="submit" > {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
            </form>
        </Form>
    )
}