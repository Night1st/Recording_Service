import InputText from '@/shared/components/common/form/InputText'
import InputTextArea from '@/shared/components/common/form/InputTextArea'
import { Form } from '@/shared/components/common/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../common/ui/button'
import InputPassword from '../common/form/InputPassword'
import { IChangePass, useChangePass } from '@/shared/schemas/models/IUser.model'


type Props = {
    userId: React.Key
}
const formSchema = z.object({
    oldPassword: z.string({ required_error: 'Vui lòng điền mật khẩu cũ' }).min(1, { message: 'Vui lòng điền mật khẩu cũ' }),
    confirmPassword: z.string({ required_error: 'Vui lòng xác nhận mật khẩu mới' }).min(1, { message: 'Vui lòng xác nhận mật khẩu mới' }),
    newPassword: z.string({ required_error: 'Vui lòng điền mật khẩu mới' }).min(1, { message: 'Vui lòng điền mật khẩu mới' }),
})
export default function FormChangePassword({ userId }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const hanldeChangePass = useChangePass()
    function onSubmit(value: IChangePass) {
        hanldeChangePass.mutate({ id: userId, body: value })
    }
    const confirmPass = form.watch().confirmPassword
    const newPass = form.watch().newPassword
    useEffect(() => {
        if (confirmPass !== newPass && confirmPass) {
            form.setError('confirmPassword', { message: 'Xác nhận mật khẩu không trùng khớp', type: 'onChange' })
        } else {
            form.clearErrors('confirmPassword')
        }
    }, [confirmPass, newPass])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputPassword form={form} fieldName="oldPassword" label='Nhập mật khẩu cũ' />
                <InputPassword form={form} fieldName="newPassword" label='Nhập mật khẩu mới' />
                <InputPassword form={form} fieldName="confirmPassword" label='Xác nhận lại mật khẩu mới' />
                <div className='flex justify-start gap-4'>
                    <Button type="submit" > {hanldeChangePass.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
            </form>
        </Form>
    )
}