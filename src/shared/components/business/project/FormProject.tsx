import InputText from '@/shared/components/common/form/InputText'
import InputTextArea from '@/shared/components/common/form/InputTextArea'
import { Form, FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/shared/components/common/ui/form'
import { IProject } from '@/shared/schemas/models/IProject.model'
import { useGetAllUser } from '@/shared/schemas/models/IUser.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft, PlusIcon } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../common/ui/button'
import InputSelectCommonCode from '../InputCommonCode'
import InputSelectJobPositionWithProject from '../InputJobposition-project'
import InputSelectUser from '../InputSelectUser'
import { useEffect } from 'react'

type Props = {
    onSubmit: (value: Partial<IProject>) => void
    isLoading?: boolean,
    defaultValue?: IProject
    onBack?: () => void
}

const projectUserSchema = z.object({
    userId: z.number({ required_error: 'Vui lòng chọn tên' }).nullable().refine(value => value !== null, { message: 'Vui lòng chọn tên' }),
    jobPositionId: z.number({ required_error: 'Vui lòng chọn vị trí' }).nullable().refine(value => value !== null, { message: 'Vui lòng chọn vị trí' }),
    commonCodeId: z.number({ required_error: 'Vui lòng chọn level' }).nullable().refine(value => value !== null, { message: 'Vui lòng chọn level' }),
})

const formSchema = z.object({
    projectCode: z.string({ required_error: 'Vui lòng điền mã dự án' }).min(1, { message: 'Vui lòng điền mã dự án' }),
    projectName: z.string({ required_error: 'Vui lòng điền tên dự án' }).min(1, { message: 'Vui lòng điền tên dự án' }),
    description: z.string().optional(),
    projectUsers: z.array(projectUserSchema)
})
export default function FormProject({ onSubmit, isLoading, onBack, defaultValue }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const { fields, append, remove } = useFieldArray({
        name: 'projectUsers',
        control: form.control
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
    }, [defaultValue, form])


    return (
        <Form {...form}>
            {/* @ts-ignore */}
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputText form={form} fieldName="projectCode" label='Mã dự án' />
                <InputText form={form} fieldName="projectName" label='Tên dự án' />
                <InputTextArea form={form} fieldName="description" label='Mô tả' />
                <div >
                    <div className='flex  items-center gap-8 mb-4'>
                        <div className='capitalize text-base mb-2'>Nhân sự dự án:</div>
                        <Button
                            type="button"
                            variant={'outline'}
                            className="mt-2"
                            onClick={() => append({ userId: null, jobPositionId: null, commonCodeId: null })}
                        >
                            <PlusIcon /> Thêm
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-1  lg:grid-cols-10 gap-4 mb-4'>
                            <div className='col-span-3'>
                                <InputSelectUser form={form} fieldName={`projectUsers.${index}.userId`} placeHolder='Chọn người dùng' />
                            </div>
                            <div className='col-span-3'>

                                <InputSelectJobPositionWithProject form={form} fieldName={`projectUsers.${index}.jobPositionId`} placeHolder='Chọn vị trí' />
                            </div>
                            <div className='col-span-3'>
                                <InputSelectCommonCode form={form} fieldName={`projectUsers.${index}.commonCodeId`} placeHolder='Chọn trình độ' />
                            </div>
                            <Button
                                type="button"
                                size="icon"
                                className=" col-span-1"
                                onClick={() => remove(index)}
                            >
                                Xóa
                            </Button>
                        </div>
                    ))}


                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                    <div className='flex justify-start gap-4'>
                        <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}><MoveLeft className="mr-2 h-4 w-4" /> Hủy</Button>
                        <Button type="submit" > {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}