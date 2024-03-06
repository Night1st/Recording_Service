import InputText from '@/shared/components/common/form/InputText'
import InputTextArea from '@/shared/components/common/form/InputTextArea'
import { Form } from '@/shared/components/common/ui/form'
import { IDepartment } from '@/shared/schemas/models/IDepartment.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft, PlusIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../common/ui/button'
import { InputMultiSelect } from '../../common/form/InputMultiSelect'
import { useGetAllJobposition } from '@/shared/schemas/models/IJobPosition'

type Props = {
    onSubmit: (value: Partial<IDepartment>) => void
    isLoading?: boolean,
    defaultValue?: any,
    onBack?: () => void

}


const formSchema = z.object({
    name: z.string({ required_error: "Vui lòng điền tên phòng ban" }).min(1, { message: "Vui lòng điền tên phòng ban" }),
    description: z.string().optional(),
    jobPositions: z.any().optional()
})
export default function FormDepartment({ onSubmit, isLoading, defaultValue, onBack }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { data: jobPositions } = useGetAllJobposition()


    useEffect(() => {
        if (defaultValue) {
            for (const [key, value] of Object.entries(defaultValue)) {
                form.setValue(key as any, value, {
                    // shouldValidate: true,
                    shouldDirty: true
                })
            }
        }
    }, [defaultValue, form])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputText form={form} fieldName="name" label='Tên phòng ban' />
                <InputTextArea form={form} fieldName="description" label='Mô tả' />
                {
                    <InputMultiSelect form={form} fieldName="jobPositions" label='Các vị trí công việc' placeHolder='Các vị trí công việc'
                        options={jobPositions?.filter(item => !!item.id && !!item.name).map(item => ({ value: item.id, label: item.name })) || []}/>}
               
                <div className='flex justify-start gap-4'>
                    <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}>  <MoveLeft className="mr-2 h-4 w-4 " /> Hủy</Button>
                    <Button type="submit" > {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
            </form>
        </Form>
    )
}
