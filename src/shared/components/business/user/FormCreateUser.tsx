import InputText from '@/shared/components/common/form/InputText'
import { Form } from '@/shared/components/common/ui/form'
import { ICreateUser } from '@/shared/schemas/models/IUser.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import InputPassword from '../../common/form/InputPassword'
import InputSelect from '../../common/form/InputSelect'
import { Button } from '../../common/ui/button'
import InputSelectJobPosition from '../InputJobposition'
import InputSelectDepartment from '../InputSelectDepartment'
import InputSelectJobPositionByDepartmentId from '../InputJobPositionByDepartmentId'

type Props = {
    onSubmit: (value: Partial<ICreateUser>) => void
    isLoading?: boolean,
    defaultValue?: Partial<ICreateUser>,
    onBack?: () => void
    viewMode: 'create' | 'update'
}
const formSchema = z.object({
    userName: z.string({ required_error: 'Vui lòng điền tên hệ thống của người dùng' }).min(1, { message: 'Vui lòng điền tên hệ thống của người dùng' }),
    fullName: z.string({ required_error: 'Vui lòng điền tên người dùng' }).min(1, { message: 'Vui lòng điền tên đầy đủ người dùng' }),
    password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
    departmentId: z.number({ required_error: 'Vui lòng chọn phòng làm việc' }),
    jobPositionId: z.number({ required_error: 'Vui lòng chọn vị trí làm việc' }),
    userType: z.string({ required_error: 'Vui lòng chọn loại tài khoản' }),
})
export default function FormUser({ onSubmit, isLoading, defaultValue, onBack, viewMode }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        //@ts-ignore
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
    const departId = form.watch().departmentId

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputText form={form} fieldName="userName" label='Tên hệ thống' description='Tên tài khoản phải theo format ho.ten@ngs.com.vn' />
                <InputText form={form} fieldName="fullName" label='Tên đầy đủ' />
                {viewMode === 'create' &&
                    <InputPassword form={form} fieldName="password" label='Mật khẩu tài khoản' />}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <InputSelectDepartment form={form} fieldName="departmentId" label='Chọn phòng ban' handleOnchange={() => form.resetField('jobPositionId')} />
                    <InputSelectJobPositionByDepartmentId form={form} fieldName="jobPositionId" label='Chọn vị trí' departmentId={departId} />
                    <InputSelect form={form} fieldName="userType" label='Chọn loại tài khoản' options={[
                        {
                            value: "SYSTEM_ADMIN", label: "SYSTEM_ADMIN",
                        },
                        {
                            value: "PMO", label: "PMO",
                        },
                        {
                            value: "USER", label: "USER",
                        },
                    ]} />
                </div>
                <div className='flex justify-start gap-4'>
                    <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}> <MoveLeft className="mr-2 h-4 w-4 " /> Hủy</Button>
                    <Button type="submit" > {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
            </form>
        </Form>
    )
}